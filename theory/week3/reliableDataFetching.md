# Надёжная загрузка данных — Senior

> **Middle:** try/catch, loading/error/data, async/await, react-query «из коробки»  
> **Senior:** понимает race condition, отмену, дедупликацию, retry — и **зачем** TanStack Query

---

## Базовый паттерн (Middle — это нормально)

```jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch('/api/user')
    .then(r => r.json())
    .then(setData)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);
```

Три состояния: loading → data или error. Это правильная база.

---

## 1. Race condition — «кто последний, тот и прав»

**Проблема:** пользователь быстро переключает вкладки. Запрос A ушёл первым, запрос B — вторым. B вернулся быстрее. Потом приходит A и **перезаписывает** актуальные данные старыми.

**Как воспроизвести:** два быстрых клика по фильтру, медленный API — UI показывает не тот результат.

**Решение — AbortController + cleanup в useEffect:**

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api?q=${query}`, { signal: controller.signal })
    .then(r => r.json())
    .then(setData)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err);
    });

  return () => controller.abort(); // отмена при смене query или unmount
}, [query]);
```

📖 [MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

---

## 2. Дедупликация — один запрос на один ключ

**Проблема:** три компонента одновременно запрашивают `/api/user/1` — три одинаковых запроса.

**Решение — Map промисов:**

```js
const cache = new Map();

function fetchUser(id) {
  const key = `user-${id}`;
  if (cache.has(key)) return cache.get(key);

  const promise = fetch(`/api/users/${id}`).then(r => r.json());
  cache.set(key, promise);
  return promise;
}
```

Все три компонента получат **один и тот же** Promise. Именно так работает TanStack Query внутри.

---

## 3. Retry — exponential backoff + jitter

**Когда:** сеть моргнула, сервер вернул 503.

**Exponential backoff:** ждём 1с → 2с → 4с → 8с между попытками (не бомбим сервер).  
**Jitter:** добавляем случайные ±мс, чтобы 1000 клиентов не ретраили одновременно.

```js
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res.json();
      throw new Error(res.status);
    } catch (err) {
      if (i === retries - 1) throw err;
      const delay = Math.min(1000 * 2 ** i, 10000) + Math.random() * 200;
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
```

TanStack Query: `retry: 3`, `retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)`

---

## 4. Stale-while-revalidate

**Идея:** покажи пользователю **старые** данные сразу (быстро), а свежие подгрузи в фоне.

```
Пользователь открыл страницу → показали кэш (stale) → запрос ушёл → обновили UI
```

Это не «устаревшие данные навсегда», а UX-паттерн: не показывать пустой экран при каждом переходе.

**TanStack Query:**
- `staleTime: 60_000` — 1 мин данные «свежие», повторный запрос не нужен
- `gcTime` (бывший cacheTime) — сколько хранить в памяти после unmount

📖 [TanStack Query: Important Defaults](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults)

---

## 5. Зачем TanStack Query (Senior-ответ)

Не «потому что модно», а потому что из коробки:

| Проблема | TanStack Query |
|----------|----------------|
| Race condition | queryKey + автоматическая отмена |
| Дедупликация | один запрос на queryKey |
| Retry | настраиваемый retry + backoff |
| Cache + stale | staleTime, gcTime, invalidation |
| Optimistic updates | onMutate + rollback |

**Client state** (UI, форма) — useState/Zustand.  
**Server state** (API данные) — TanStack Query. Не смешивай.

---

## Практика

- `practice/handCoding/miniReactQuery.js` — напиши getQuery + cache + staleTime сам
- `theory/week4/stateManagement.jsx` — когда Redux vs Query

---

## Что сказать на собесе

> «Race condition решаю AbortController в cleanup useEffect. Дедупликация — один Promise на ключ. Retry — exponential backoff с jitter. Stale-while-revalidate — показываю кэш, обновляю в фоне. TanStack Query закрывает всё это, поэтому server state туда, а не в Redux.»
