# День 26 — Reliable data fetching ★ + miniReactQuery

> Неделя 6 из 6 | ~**2.5 ч** | 1 md + hand coding

## Цель дня

**Race conditions**, AbortController, stale-while-revalidate, паттерны как в TanStack Query. Написать **miniReactQuery** руками.

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week3/SIMPLE_GUIDE.md`** — Data fetching |

---

## Шаг 1 — READ (40 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week3/reliableDataFetching.md` | Race, abort, cache, dedupe, optimistic UI |

Прочитай внимательно — связь с DAY 20 (Query) и DAY 24 (fetch).

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. Race condition в search — как AbortController fix?
2. stale-while-revalidate — UX vs freshness
3. Dedupe одинаковых запросов — зачем?
4. Optimistic update — rollback on error

---

## Шаг 3 — CODE (55 мин) ✍️ **без AI**

| # | Задача | Файл |
|---|--------|------|
| 1 | Mini React Query | `practice/handCoding/miniReactQuery.js` |
| 2 | Сверка | `practice/handCoding/solutions/miniReactQuery.js` |

На бумаге: state machine `idle → loading → success | error`.

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 26
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] reliableDataFetching.md прочитал
- [ ] race + abort объяснил
- [ ] miniReactQuery написал руками

**Завтра → [DAY_27.md](DAY_27.md)** — Reflow ★ + Code splitting ★
