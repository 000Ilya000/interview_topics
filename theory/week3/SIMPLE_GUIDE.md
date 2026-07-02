# Неделя 5–6 (часть) — Next.js + Network + Security + Data (DAY 22–26)

> Расписание: `schedule/DAY_22` … `DAY_26`  
> После React (week2) — Next, HTTP, Senior security, data fetching.

| День | Тема | Файлы |
|------|------|-------|
| 22 | Next 1/2: SSR + hydration | `renderingModes.jsx`, `hydration.jsx` |
| 23 | Next 2/2: App Router + RSC | `appRouter.jsx`, `serverComponents.jsx` |
| 24 | HTTP + CORS + JWT | `httpTls.js`, `fetchAPI.js`, `corsCookiesJwt.js` |
| 25 | XSS + CSRF ★ | `xssCsrf.md`, `security.js` |
| 26 | Data fetching ★ | `reliableDataFetching.md` → `miniReactQuery.js` ✍️ |

Optional skim: `streaming.jsx`, `routeHandlers.jsx`, `protokols.js`

---

# DAY 22 — Next.js 1/2: rendering modes + hydration

## CSR / SSR / SSG / ISR

| Режим | Когда HTML | Жизнь |
|-------|------------|-------|
| **CSR** | В браузере | Готовишь дома после заказа |
| **SSR** | На сервере каждый запрос | Готовят когда пришёл |
| **SSG** | При `next build` | Заготовки с утра |
| **ISR** | SSG + revalidate N сек | Меню обновляют каждый час |

### Когда SSR **вредит** perf?

- Тяжёлая БД на каждый page view
- Личный кабинет — client fetch или RSC
- TTFB растёт

**Senior:** SSR для SEO + first paint публичных страниц. Не SSR всё подряд.

## Hydration

1. Сервер отдал HTML  
2. Браузер скачал JS  
3. React «оживил» DOM

**Mismatch** — server ≠ client:

```jsx
// ❌
<p>{new Date().toLocaleTimeString()}</p>
// ✅ только на клиенте после mount
```

---

# DAY 23 — Next.js 2/2: App Router + RSC

```
app/
  layout.tsx    ← обёртка
  page.tsx      ← /
  blog/[slug]/page.tsx
```

| Файл | Зачем |
|------|-------|
| `layout.tsx` | Header/footer, не remount |
| `loading.tsx` | Skeleton |
| `error.tsx` | Error boundary роута |

## Server vs Client

| | Server | Client |
|---|--------|--------|
| hooks, onClick | ❌ | ✅ |
| Fetch к БД | ✅ | через API |
| JS на клиент | 0 для chunk | да |
| Секреты | ✅ | ❌ утекут |

**Правило:** Server по умолчанию. `'use client'` — только интерактив.

**Streaming:** `<Suspense>` + RSC — HTML кусками.

---

# DAY 24 — HTTP + fetch + CORS + JWT

## HTTP

```
GET — read   POST — create   PUT — replace   PATCH — partial   DELETE
```

| Код | Значение |
|-----|----------|
| 401 | Не залогинен |
| 403 | Нет прав |
| 404 | Не найдено |

## CORS

Браузер блокирует cross-origin без разрешения сервера.

**Preflight (OPTIONS)** — для POST+JSON, кастомных headers.

*На собесе:* CORS — **браузерная** защита. curl не проверяет.

## JWT: cookie vs localStorage

| | localStorage | httpOnly cookie |
|---|--------------|-----------------|
| XSS украдёт | ✅ легко | ❌ |
| CSRF | ❌ | ⚠️ нужен SameSite |

**Senior:** JWT в httpOnly + SameSite=Lax.

**Практика:** `practice/tasks-js/currenciesTask.js`

---

# DAY 25 — XSS + CSRF ★ Senior

→ Полная версия: **`xssCsrf.md`**

## XSS — чужой JS на твоём сайте

| Вид | Пример |
|-----|--------|
| Reflected | `?q=<script>…` |
| Stored | Комментарий в БД |
| DOM-based | `innerHTML = location.hash` |

**Защита:** escape (React default), CSP, HttpOnly, DOMPurify для HTML.

## CSRF — чужой сайт шлёт запрос с твоей cookie

**Защита:** SameSite, CSRF token, Origin check, не GET для изменений.

## XSS vs CSRF

| | XSS | CSRF |
|---|-----|------|
| Где | На **твоём** сайте | С **чужого** |
| Защита | Escape, CSP | SameSite, token |

### Pitch на 3 мин (без шпаргалки)

> XSS — вредный JS. CSRF — запрос с cookie. JWT — httpOnly, не localStorage.

---

# DAY 26 — Reliable data fetching ★

→ Полная версия: **`reliableDataFetching.md`**

## Race condition

Быстрый запрос «Питер» перезаписан медленным «Москва».

```jsx
useEffect(() => {
  const c = new AbortController();
  fetch(`/api?q=${q}`, { signal: c.signal }).then(...);
  return () => c.abort();
}, [q]);
```

## Dedup + cache

Один `Map` ключ → Promise — все consumers ждут один запрос.

## Stale-while-revalidate

Показал кэш → в фоне проверил свежесть → обновил.

## Query vs useEffect+fetch

Query = dedup + cache + cancel + retry + stale из коробки.

**Hand coding:** `practice/handCoding/miniReactQuery.js`

---

## Чеклист DAY 22–26

- [ ] CSR/SSR/SSG/ISR — когда что
- [ ] Hydration mismatch — пример
- [ ] Server vs Client — таблица
- [ ] CORS preflight — когда
- [ ] XSS 3 вида + CSRF — 3 мин вслух
- [ ] Race + AbortController
- [ ] miniReactQuery руками

**Дальше → `theory/week4/SIMPLE_GUIDE.md` (DAY 27–28 — Perf + ФИНАЛ)**

**Senior `.md` для повторения:** `xssCsrf.md`, `reliableDataFetching.md`, `reflowRepaint.md`, `codeSplitting.md`
