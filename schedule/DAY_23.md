# День 23 — Next.js 2/2: App Router + Server Components

> Неделя 5 из 6 | ~**2–2.5 ч** | 2 theory-файла

## Цель дня

**App Router**, **Server vs Client Components**, `'use client'` — главная тема Next.js на Senior собесе.

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week3/SIMPLE_GUIDE.md`** — App Router + RSC |

---

## Шаг 1 — READ (35 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week3/appRouter.jsx` | app/, layout, page, loading, error |
| 2 | `theory/week3/serverComponents.jsx` | RSC, boundaries, fetch on server |

Optional skim (если останется время): `theory/week3/streaming.jsx`

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. Server Component — что **можно** и **нельзя**? (hooks, onClick)
2. Когда нужен `'use client'`?
3. layout.js vs page.js — nesting
4. loading.js / error.js — зачем?

---

## Шаг 3 — CODE (35 мин) ✍️

На бумаге — разметь компоненты:

```
App
├── Header (logo, nav links)
├── ProductList (fetch API)
├── AddToCartButton (onClick)
└── Footer
```

Для каждого: **Server** или **Client** + почему.

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 23
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] appRouter + serverComponents прочитал
- [ ] Server vs Client — с примерами
- [ ] дерево компонентов разметил

**Завтра → [DAY_24.md](DAY_24.md)** — HTTP + CORS + JWT
