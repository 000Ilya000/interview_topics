# Неделя 3 — Next.js + Сеть + Security (DAY 11–15)

> Одна неделя = Next.js глубоко + HTTP/CORS + XSS/CSRF + надёжная загрузка данных.  
> Расписание: `schedule/DAY_11` … `DAY_15`  
> Чекбоксы ниже: самопроверка. На GitHub не кликаются → [Issue «Прогресс»](../../issues/new?template=course_progress.md) или Obsidian.

---

# DAY 11 — Next.js: SSR, App Router, RSC

## CSR / SSR / SSG / ISR — «когда готовить HTML»

| Режим | Когда HTML готов | Жизнь |
|-------|------------------|-------|
| **CSR** | В браузере пользователя | Блюдо готовишь дома после заказа |
| **SSR** | На сервере при **каждом** запросе | Готовят когда ты пришёл в ресторан |
| **SSG** | При **сборке** проекта (`next build`) | Заготовки с утра, разогревают |
| **ISR** | SSG + обновление раз в N минут | Меню обновляют каждый час |

```jsx
// SSG — статика при сборке
export async function generateStaticParams() { ... }

// SSR — каждый запрос
export const dynamic = 'force-dynamic';

// ISR — статика + revalidate
export const revalidate = 3600; // секунды
```

### Когда SSR **вредит** perf?

- Много одновременных запросов → сервер не успевает
- Тяжёлые запросы к БД на **каждый** page view
- Персональные данные (ЛК) — лучше CSR + client fetch или edge
- TTFB растёт — пользователь ждёт сервер **до** первого байта

**Senior-ответ:** «SSR для SEO и first paint на публичных страницах. Личный кабинет — client fetch или RSC с streaming. Не SSR всё подряд.»

**Файл:** `renderingModes.jsx`

---

## Hydration — «оживить HTML»

1. Сервер отдал **готовый HTML** (быстро видно контент)
2. Браузер скачал JS
3. React **привязался** к HTML — добавил event listeners, hooks

**Hydration mismatch** — server нарисовал одно, client другое:
```jsx
// ❌ Баг — на сервере и клиенте разное время
<p>{new Date().toLocaleTimeString()}</p>

// ✅ Только на клиенте
'use client';
const [time, setTime] = useState(null);
useEffect(() => setTime(new Date().toLocaleTimeString()), []);
```

*Жизнь:* официант принёс блюдо (HTML). Ты (React) начинаешь есть — если на тарелке рыба, а в меню было мясо — confusion.

**Файл:** `hydration.jsx`

---

## App Router — файловая структура

```
app/
  layout.tsx      ← обёртка для всех страниц
  page.tsx        ← /
  about/page.tsx  ← /about
  blog/[slug]/page.tsx  ← /blog/hello
  api/users/route.ts    ← API endpoint
```

| Файл | Зачем |
|------|-------|
| `layout.tsx` | Общий header/footer, не перерисовывается при навигации |
| `page.tsx` | Контент страницы |
| `loading.tsx` | Skeleton пока грузится |
| `error.tsx` | Error boundary для роута |
| `not-found.tsx` | 404 |

**Файл:** `appRouter.jsx`

---

## Server vs Client Components

```jsx
// Server Component (по умолчанию) — НЕТ 'use client'
async function ProductList() {
  const products = await db.products.findMany(); // прямо на сервере
  return products.map(p => <Card key={p.id} {...p} />);
}

// Client Component — нужны hooks, onClick
'use client';
function AddToCart({ id }) {
  const [loading, setLoading] = useState(false);
  return <button onClick={() => add(id)}>Купить</button>;
}
```

| | Server | Client |
|---|--------|--------|
| `useState`, `useEffect` | ❌ | ✅ |
| `onClick`, события | ❌ | ✅ |
| Fetch к БД напрямую | ✅ | ❌ (через API) |
| JS на клиент | **0** для этого куска | Да |
| Секреты (API keys) | ✅ безопасно | ❌ утекут |

*Жизнь:* Server = официант на кухне (данные). Client = ты за столом (клики, формы).

**Правило:** Server по умолчанию. `'use client'` только где нужна интерактивность.

**Файл:** `serverComponents.jsx`

---

## Streaming + Suspense

```jsx
<Suspense fallback={<Skeleton />}>
  <SlowComponent />  {/* Server Component, грузится параллельно */}
</Suspense>
```

HTML **стримится** кусками — пользователь видит shell сразу, тяжёлые блоки догружаются.

**Файлы:** `streaming.jsx`, `routeHandlers.jsx`

---

## Чеклист DAY 11

- [ ] CSR vs SSR vs SSG vs ISR — одним предложением каждый
- [ ] Когда SSR вредит perf
- [ ] Что такое hydration mismatch
- [ ] Server vs Client — что где можно
- [ ] Зачем `'use client'`

---

# DAY 12 — HTTP + CORS + fetch + JWT

## HTTP — база

```
GET    — прочитать (идемпотентный, можно кэшировать)
POST   — создать / изменить
PUT    — заменить целиком
PATCH  — изменить часть
DELETE — удалить
```

**Статус-коды:**
| Код | Значение |
|-----|----------|
| 200 | OK |
| 201 | Created |
| 301/302 | Redirect |
| 400 | Твоя ошибка (bad request) |
| 401 | Не залогинен |
| 403 | Залогинен, но нет прав |
| 404 | Не найдено |
| 500 | Ошибка сервера |

**TLS (HTTPS)** — шифрует трафик. Без него cookie и пароли видны в сети.

**Файл:** `httpTls.js`

---

## fetch API

```js
const res = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Ilya' }),
  credentials: 'include', // отправить cookies
});

if (!res.ok) throw new Error(res.status);
const data = await res.json();
```

**Файл:** `fetchAPI.js`

---

## CORS — «охранник между доменами»

Браузер **блокирует** JS-запрос с `mysite.com` на `api.other.com`, если API не разрешил.

```
mysite.com (origin)  →  api.other.com
                         ↑
                    «Ты в списке гостей?»
```

**Simple request** (GET, простые headers) — браузер шлёт сразу, смотрит заголовок ответа:
```http
Access-Control-Allow-Origin: https://mysite.com
```

**Preflight** — для POST с JSON, кастомных headers:
1. Браузер шлёт **OPTIONS** — «можно POST с Content-Type: application/json?»
2. Сервер отвечает `Access-Control-Allow-Methods`, `Allow-Headers`
3. Только потом — настоящий POST

*Жизнь:* preflight = звонок в ресторан: «можно столик на 4 с детским стульчиком?» — потом едешь.

**На собесе:** CORS — это **браузерная** защита. curl/Postman CORS не проверяют.

**Файл:** `corsCookiesJwt.js`

---

## Cookies + JWT

**Cookie** — маленький файл, браузер **сам** прикрепляет к запросам на тот же домен.

| Флаг | Зачем |
|------|-------|
| `HttpOnly` | JS **не** читает → защита от XSS |
| `Secure` | Только HTTPS |
| `SameSite=Strict/Lax` | Защита от CSRF |
| `Path`, `Domain` | Куда отправлять |

**JWT** — строка `header.payload.signature`. Сервер проверяет подпись — «этот токен я выдал».

### JWT: localStorage vs httpOnly cookie

| | localStorage | httpOnly cookie |
|---|--------------|-----------------|
| JS читает | ✅ Да | ❌ Нет |
| XSS украдёт | ✅ Легко | ❌ Нет |
| CSRF | ❌ Не уходит сам | ⚠️ Уходит — нужен SameSite |
| SSR | ❌ Нет на сервере | ✅ Да |

**Senior-ответ:** «JWT в httpOnly cookie + SameSite=Lax. Не localStorage — при XSS украдут за секунду.»

**Файл:** `corsCookiesJwt.js`

---

## Чеклист DAY 12

- [ ] Когда срабатывает CORS preflight
- [ ] Разница 401 vs 403
- [ ] HttpOnly, Secure, SameSite — зачем каждый
- [ ] Почему JWT не в localStorage

---

# DAY 13 — XSS + CSRF ★ Senior

→ Полная версия: **`xssCsrf.md`**

## XSS — «чужой скрипт на твоём сайте»

Злоумышленник вставляет JS → браузер жертвы **выполняет** его как часть твоего сайта.

| Вид | Как | Пример |
|-----|-----|--------|
| **Reflected** | В URL, сервер отражает в HTML | `?q=<script>steal()</script>` |
| **Stored** | Сохраняется в БД | Вредный комментарий — все видят |
| **DOM-based** | Клиентский JS сам вставляет | `innerHTML = location.hash` |

**Что крадут:** cookie (без HttpOnly), localStorage, данные со страницы, действия от имени юзера.

### Защита XSS

1. **React экранирует** `{userInput}` — безопасно по умолчанию
2. **Не использовать:** `dangerouslySetInnerHTML`, `innerHTML`, `eval()`
3. **CSP** — «скрипты только с моего домена»
4. **HttpOnly cookie** — JS не прочитает даже при XSS
5. **DOMPurify** — если нужен HTML от пользователя (rich text)

*Жизнь:* кто-то вклеил листовку «переведи деньги» в твою газету. Читатель думает — от редакции.

**Файл:** `security.js`

---

## CSRF — «сайт-обманщик от твоего имени»

Ты залогинен в `bank.com`. Открыл `evil.com` — там скрытая форма:
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
| Защита | Escape, CSP, HttpOnly | SameSite, CSRF token |

### Защита CSRF

1. **SameSite cookie** — `Lax`/`Strict` — cookie не уходит с чужого сайта
2. **CSRF token** — секрет в форме/заголовке, чужой сайт не знает
3. **Проверка Origin/Referer** на сервере
4. **Не GET для изменений** — `<img src="bank.com/transfer?to=hacker">` сработает без JS

*Жизнь:* подпись уже на столе, мошенник подсовывает договор.

---

## Что сказать на собесе (3 мин)

> «XSS — вредный JS на странице. Защита: escape, CSP, HttpOnly, sanitize если HTML. CSRF — чужой сайт шлёт запрос с cookie. Защита: SameSite, CSRF token, Origin check. JWT — httpOnly cookie, не localStorage.»

**Файлы:** `xssCsrf.md`, `security.js`

---

# DAY 14 — Надёжная загрузка данных ★ Senior

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

Три состояния: loading → data или error. Это правильная база.

---

## Race condition — «кто последний — тот на экране»

Быстро: Москва → Питер. Питер ответил быстрее. Потом Москва **перезаписала** Питер.

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api?q=${query}`, { signal: controller.signal })
    .then(r => r.json())
    .then(setData)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err);
    });

  return () => controller.abort(); // cleanup!
}, [query]);
```

*Жизнь:* заказал пиццу, передумал, заказал суши. Пицца приехала позже и «перекрыла» суши на столе.

**Hand coding:** `practice/handCoding/miniReactQuery.js`

---

## Дедупликация — один запрос на ключ

Три компонента запрашивают `/api/user/1` → три запроса?

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

## Retry — exponential backoff

Сеть моргнула → ждём 1с → 2с → 4с (не бомбим сервер).  
**Jitter** — случайные ±мс, чтобы 1000 клиентов не ретраили одновременно.

---

## Stale-while-revalidate

Показываешь **старые** данные из кэша сразу → в фоне проверяешь «ещё актуально?» → обновляешь если нет.

*Жизнь:* на полке стоит коробка пиццы от 5 минут назад — показываешь её, параллельно звонишь «ещё горячая?»

---

## TanStack Query vs fetch в useEffect

| useEffect + fetch | TanStack Query |
|-------------------|----------------|
| Сам пишешь loading/error | Из коробки |
| Сам AbortController | Авто cancel |
| Сам кэш | Кэш + dedup |
| Сам retry | Backoff + retry |
| Сам stale/refetch | staleTime, refetchOnFocus |

**Senior-ответ:** «Query — не магия. Это dedup + cache + cancel + retry + stale-while-revalidate. Могу написать miniReactQuery из памяти.»

**Файл:** `reliableDataFetching.md`

---

# DAY 15 — Повторение недели 3

## Чеклист — объясни вслух (без файлов)

- [ ] SSR vs SSG — когда что
- [ ] Когда SSR вредит perf
- [ ] Server vs Client Components
- [ ] Hydration mismatch — пример
- [ ] CORS preflight — когда
- [ ] JWT: httpOnly vs localStorage
- [ ] XSS — 3 вида + 3 защиты
- [ ] CSRF — механизм + SameSite + token
- [ ] Race condition — воспроизвести и fix
- [ ] AbortController + cleanup
- [ ] Dedup через Map
- [ ] Stale-while-revalidate — одним предложением
- [ ] Зачем TanStack Query

## CODE

`miniReactQuery.js` — перепиши из памяти (30 мин)

## MOCK

`node mockInterview/questions.js 11` … `15`

---

## Все файлы недели 3

| DAY | Темы | Файлы |
|-----|------|-------|
| 11 | Next.js, RSC | `renderingModes.jsx`, `hydration.jsx`, `appRouter.jsx`, `serverComponents.jsx`, `streaming.jsx`, `routeHandlers.jsx` |
| 12 | HTTP, CORS | `httpTls.js`, `fetchAPI.js`, `corsCookiesJwt.js` |
| 13 | XSS, CSRF | **`xssCsrf.md`**, `security.js` |
| 14 | Data fetching | **`reliableDataFetching.md`**, `miniReactQuery.js` |
| 15 | Review | mock 11–15 |

**Senior `.md` для повторения:** `xssCsrf.md`, `reliableDataFetching.md`  
**Code splitting (DAY 17):** `codeSplitting.md`  
**Web Vitals (DAY 19):** `webVitals.js`, `protokols.js`, `websocketReact.jsx`
