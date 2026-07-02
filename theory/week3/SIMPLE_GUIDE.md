# Неделя 5–6 (часть) — Next.js + Network + Security + Data (DAY 22–26)

> Расписание: `schedule/DAY_22` … `DAY_26`  
> После React — Next.js, HTTP, Senior security, надёжная загрузка данных.

| День | Тема | Файлы |
|------|------|-------|
| 22 | Next 1/2: SSR + hydration | `renderingModes.jsx`, `hydration.jsx` |
| 23 | Next 2/2: App Router + RSC | `appRouter.jsx`, `serverComponents.jsx` |
| 24 | HTTP + CORS + JWT | `httpTls.js`, `fetchAPI.js`, `corsCookiesJwt.js` |
| 25 | XSS + CSRF ★ | `xssCsrf.md`, `security.js` |
| 26 | Data fetching ★ | `reliableDataFetching.md` → `miniReactQuery.js` ✍️ |

Optional skim: `streaming.jsx`, `routeHandlers.jsx`

---

# DAY 22 — Next.js 1/2: rendering modes + hydration

## CSR / SSR / SSG / ISR — `renderingModes.jsx`

| Режим | Когда HTML готов | TTFB | SEO | Жизнь |
|-------|------------------|------|-----|-------|
| **CSR** | В браузере (пустой shell + JS) | Быстрый HTML | Плохо без prerender | Готовишь дома после заказа |
| **SSR** | На сервере **каждый** запрос | Ждёшь сервер | ✅ | Готовят когда пришёл |
| **SSG** | При **`next build`** | Быстро (CDN) | ✅ | Заготовки с утра |
| **ISR** | SSG + revalidate через N сек | Быстро + свежесть | ✅ | Меню обновляют каждый час |

```jsx
// SSG — статика при сборке
export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

// SSR — каждый запрос
export const dynamic = 'force-dynamic';

// ISR
export const revalidate = 3600; // секунды
```

### Когда SSR **вредит** perf?

- Тяжёлые запросы к БД на **каждый** page view
- Много одновременных пользователей → сервер не успевает (TTFB растёт)
- Персональный dashboard — лучше CSR + client fetch или RSC с streaming
- Данные не нужны для SEO/first paint

**Senior-ответ:** «SSR для публичных страниц с SEO и быстрым first contentful paint. Личный кабинет — client-side или RSC + Suspense. Не SSR всё подряд — смотрим TTFB и load на сервер.»

---

## Hydration — `hydration.jsx`

1. Сервер отдал **готовый HTML** (контент виден сразу)
2. Браузер скачал JS-бандл
3. React **привязался** к существующему DOM — добавил listeners, hooks, client state

**Hydration mismatch** — HTML с сервера ≠ то, что React построил на клиенте:

```jsx
// ❌ На сервере и клиенте разное время
<p>{new Date().toLocaleTimeString()}</p>

// ❌ window, localStorage на сервере нет
<p>{window.innerWidth}</p>

// ✅ Только после mount на клиенте
'use client';
const [time, setTime] = useState(null);
useEffect(() => setTime(new Date().toLocaleTimeString()), []);
return time ? <p>{time}</p> : null;
```

*Жизнь:* официант принёс блюдо (HTML). React — ты начинаешь есть. Если на тарелке рыба, а в меню было мясо — confusion (React пересоздаст DOM, perf hit).

**Файлы:** `renderingModes.jsx`, `hydration.jsx`

### Чеклист DAY 22

- [ ] CSR/SSR/SSG/ISR — одним предложением
- [ ] Когда SSR вредит
- [ ] 3 причины hydration mismatch

---

# DAY 23 — Next.js 2/2: App Router + Server Components

## App Router — `appRouter.jsx`

```
app/
  layout.tsx           ← обёртка для всех child routes
  page.tsx             ← /
  about/page.tsx       ← /about
  blog/[slug]/page.tsx ← /blog/hello
  api/users/route.ts   ← Route Handler (API)
  loading.tsx          ← Suspense fallback для сегмента
  error.tsx            ← Error boundary для сегмента
  not-found.tsx        ← 404
```

| Файл | Зачем |
|------|-------|
| `layout.tsx` | Shared UI, state сохраняется при navigation |
| `page.tsx` | Уникальный контент URL |
| `loading.tsx` | Skeleton пока page async |
| `error.tsx` | Catch errors в subtree |
| `template.tsx` | Как layout, но remount на navigation |

**Nested layouts:** `/dashboard/settings` — layout dashboard + layout settings.

---

## Server vs Client Components — `serverComponents.jsx`

```jsx
// Server Component (default) — НЕТ 'use client'
async function ProductList() {
  const products = await db.products.findMany(); // прямо на сервере
  return products.map(p => <Card key={p.id} {...p} />);
}

// Client Component
'use client';
function AddToCart({ productId }) {
  const [loading, setLoading] = useState(false);
  return <button onClick={() => add(productId)}>Купить</button>;
}
```

| | Server Component | Client Component |
|---|------------------|------------------|
| `useState`, `useEffect` | ❌ | ✅ |
| `onClick`, events | ❌ | ✅ |
| Fetch к БД / секреты | ✅ безопасно | ❌ утекут в бандл |
| JS на клиент | **0** для этого модуля | Да |
| async component | ✅ | ❌ |

**Правило:** Server по умолчанию. `'use client'` — граница: всё **ниже** в import tree становится client (если не server-only import).

**Composition pattern:** Server page рендерит Client button внутри Server layout.

---

## Streaming + Suspense

```jsx
<Suspense fallback={<ProductsSkeleton />}>
  <ProductList />  {/* async Server Component */}
</Suspense>
```

HTML **стримится** кусками — shell виден сразу, медленные блоки догружаются.

Optional: `streaming.jsx`, `routeHandlers.jsx`

**Файлы:** `appRouter.jsx`, `serverComponents.jsx`

### Чеклист DAY 23

- [ ] layout vs page
- [ ] Server vs Client — таблица
- [ ] Когда `'use client'`
- [ ] Suspense + streaming — зачем

---

# DAY 24 — HTTP + fetch + CORS + JWT

## HTTP — `httpTls.js`

```
GET    — прочитать (идемпотентный, кэшируется)
POST   — создать / action
PUT    — заменить ресурс целиком
PATCH  — изменить часть
DELETE — удалить
```

**Статус-коды:**
| Код | Значение |
|-----|----------|
| 200 | OK |
| 201 | Created |
| 301/302 | Redirect |
| 400 | Bad request (клиент ошибся) |
| 401 | Unauthorized — не залогинен |
| 403 | Forbidden — залогинен, нет прав |
| 404 | Not found |
| 429 | Rate limit |
| 500 | Server error |

**401 vs 403:** 401 — «кто ты?» (login). 403 — «знаю кто, но нельзя».

**HTTPS / TLS** — шифрует трафик. Без HTTPS cookie и JWT видны в сети.

**Файл:** `httpTls.js`

---

## fetch API — `fetchAPI.js`

```js
const res = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  },
  body: JSON.stringify({ name: 'Ilya' }),
  credentials: 'include', // отправить cookies cross-origin
});

if (!res.ok) throw new Error(`HTTP ${res.status}`);
const data = await res.json();
```

**Файл:** `fetchAPI.js`

---

## CORS — `corsCookiesJwt.js`

Браузер **блокирует** JS-запрос с `https://mysite.com` на `https://api.other.com`, если API не разрешил origin.

```
Browser (mysite.com)  →  api.other.com
                          «Ты в whitelist?»
```

**Simple request** (GET, простые headers) — браузер шлёт сразу, смотрит ответ:
```http
Access-Control-Allow-Origin: https://mysite.com
Access-Control-Allow-Credentials: true
```

**Preflight (OPTIONS)** — для POST+JSON, Authorization header, custom headers:
1. Browser → OPTIONS «можно POST с Content-Type: application/json?»
2. Server → Allow-Methods, Allow-Headers, Allow-Origin
3. Browser → настоящий POST

*Жизнь:* preflight = звонок: «можно столик на 4 с детским стульчиком?» — потом едешь.

**На собесе:** CORS — **браузерная** политика. curl/Postman/server-to-server CORS не проверяют.

---

## Cookies + JWT

**Cookie** — браузер **сам** прикрепляет к запросам на домен.

| Флаг | Зачем |
|------|-------|
| `HttpOnly` | JS **не** читает → защита от XSS кражи |
| `Secure` | Только HTTPS |
| `SameSite=Strict/Lax/None` | CSRF защита |
| `Path`, `Domain` | Scope |

**JWT** — `header.payload.signature`. Сервер проверяет подпись.

| | localStorage | httpOnly cookie |
|---|--------------|-----------------|
| JS читает | ✅ | ❌ |
| XSS украдёт | ✅ легко | ❌ |
| CSRF | ❌ не уходит сам | ⚠️ нужен SameSite + token |
| SSR / RSC | ❌ | ✅ |

**Senior:** JWT в **httpOnly cookie** + `SameSite=Lax`. Не localStorage.

**Практика:** `practice/tasks-js/currenciesTask.js`

**Файл:** `corsCookiesJwt.js`

### Чеклист DAY 24

- [ ] 401 vs 403
- [ ] CORS preflight — когда
- [ ] credentials: 'include'
- [ ] JWT cookie vs localStorage

---

# DAY 25 — XSS + CSRF ★ Senior

→ Полная версия: **`xssCsrf.md`** + **`security.js`**

## XSS — Cross-Site Scripting

Злоумышленник вставляет JS → браузер жертвы **выполняет** его как часть **твоего** сайта.

| Вид | Как работает | Пример |
|-----|--------------|--------|
| **Reflected** | Сервер отражает input в HTML | `?search=<script>steal()</script>` |
| **Stored** | Сохраняется в БД | Вредный комментарий — все видят |
| **DOM-based** | Клиентский JS сам вставляет | `div.innerHTML = location.hash` |

**Что крадут:** cookie (без HttpOnly), localStorage с JWT, данные со страницы, действия от имени юзера.

### Защита XSS

1. **React экранирует** `{userInput}` — безопасно по умолчанию
2. **Не использовать:** `dangerouslySetInnerHTML`, `innerHTML`, `eval()`
3. **CSP** (Content-Security-Policy) — «скрипты только с моего домена»
4. **HttpOnly cookie** — JS не прочитает даже при XSS
5. **DOMPurify** — если нужен HTML от пользователя (rich text editor)

```jsx
// ❌
<div dangerouslySetInnerHTML={{ __html: userComment }} />
// ✅ если HTML нужен
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userComment) }} />
```

---

## CSRF — Cross-Site Request Forgery

Ты залогинен в `bank.com`. Открыл `evil.com`:

```html
<form action="https://bank.com/transfer" method="POST">
  <input name="to" value="hacker">
  <input name="amount" value="100000">
</form>
<script>document.forms[0].submit()</script>
```

Браузер **сам** прикрепит cookie банка. Банк думает — это ты.

### XSS vs CSRF

| | XSS | CSRF |
|---|-----|------|
| Где выполняется | **На твоём** сайте | **С чужого** сайта |
| Что делает | Читает/крадёт через JS | Шлёт запрос с твоей cookie |
| Нужен JS жертве | Да (обычно) | Нет — форма/img достаточно |
| Защита | Escape, CSP, HttpOnly | SameSite, CSRF token, Origin |

### Защита CSRF

1. **SameSite cookie** — `Lax`/`Strict` — cookie не уходит с cross-site POST
2. **CSRF token** — секрет в форме/header, evil site не знает
3. **Проверка Origin/Referer** на сервере
4. **Не GET для изменений** — `<img src="bank.com/transfer?to=hacker">`

---

## Pitch на 3 мин (таймер, без шпаргалки)

> «XSS — вредный JS выполняется на моём домене. Защита: React escape по умолчанию, не innerHTML, CSP, HttpOnly cookies, sanitize если HTML нужен. CSRF — чужой сайт шлёт запрос с cookie пользователя. Защита: SameSite, CSRF token, проверка Origin. JWT храню в httpOnly cookie, не localStorage — при XSS localStorage украдут за секунду.»

**Файлы:** `xssCsrf.md`, `security.js`

### Чеклист DAY 25

- [ ] XSS 3 вида + пример
- [ ] CSRF сценарий
- [ ] XSS vs CSRF — чётко
- [ ] 3 мин pitch вслух

---

# DAY 26 — Reliable data fetching ★

→ Полная версия: **`reliableDataFetching.md`**

## Базовый паттерн (Middle — нормально)

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

Три состояния: loading → data или error. Правильная база.

---

## Race condition

Быстро набрал «Москва» → «Мо» → «Москва». Ответ на «Мо» пришёл **после** «Москва» и перезаписал экран.

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/search?q=${query}`, { signal: controller.signal })
    .then(r => r.json())
    .then(setResults)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err);
    });

  return () => controller.abort();
}, [query]);
```

*Жизнь:* заказал пиццу, передумал, заказал суши. Пицца приехала позже и «лежит поверх» суши.

---

## Dedup — один запрос на ключ

Три компонента запрашивают `/api/user/1`:

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

Все три получат **один Promise**. Так работает TanStack Query внутри.

---

## Retry + Stale-while-revalidate

**Retry:** exponential backoff 1s → 2s → 4s + jitter (чтобы 1000 клиентов не долбили одновременно).

**Stale-while-revalidate:** показал **кэш** сразу → в фоне проверил «ещё актуально?» → обновил если нет.

*Жизнь:* на полке коробка пиццы 5-минутной давности — показываешь её, параллельно звонишь «ещё горячая?»

---

## TanStack Query vs useEffect + fetch

| useEffect + fetch | TanStack Query |
|-------------------|----------------|
| Сам loading/error | Из коробки |
| Сам AbortController | auto cancel on key change |
| Сам кэш | cache + dedup |
| Сам retry | backoff + retry |
| Сам stale/refetch | staleTime, refetchOnFocus |

**Senior:** «Query — не магия. Dedup + cache + cancel + retry + stale-while-revalidate. Могу написать miniReactQuery из памяти.»

**Hand coding:** `practice/handCoding/miniReactQuery.js`

**Файл:** `reliableDataFetching.md`

### Чеклист DAY 26

- [ ] Race + AbortController
- [ ] Dedup через Map
- [ ] stale-while-revalidate — одним предложением
- [ ] miniReactQuery руками

---

## Чеклист DAY 22–26 закрыт

- [ ] Next rendering + hydration
- [ ] App Router + RSC
- [ ] HTTP + CORS + JWT
- [ ] XSS + CSRF pitch
- [ ] Data fetching patterns

**Дальше → `theory/week4/SIMPLE_GUIDE.md` (DAY 27–28 — Perf + ФИНАЛ)**

**Senior `.md` для повторения:** `xssCsrf.md`, `reliableDataFetching.md`, `reflowRepaint.md`, `codeSplitting.md`
