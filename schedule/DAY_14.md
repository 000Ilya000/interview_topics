# День 14 — Надёжная загрузка данных ★ Senior

> Неделя 3, день 4 | ~3 ч

## READ (60 мин)

| # | Файл |
|---|------|
| 1 | **`theory/week3/reliableDataFetching.md`** ← главный файл дня |

## EXPLAIN (Middle vs Senior)

| Middle | Senior (ты) |
|--------|-------------|
| try/catch + loading/error | + race condition |
| async/await | + AbortController cleanup |
| react-query «из коробки» | + dedup через Map, backoff, stale-while-revalidate |
| AbortController «слышал» | + воспроизвести race condition |

## CODE (90 мин) ✍️

`practice/handCoding/miniReactQuery.js` → solutions

Потом объясни вслух: **зачем TanStack Query**, если можно fetch в useEffect?

## MOCK

`node mockInterview/questions.js 14`

**→ [DAY_15.md](DAY_15.md)**
