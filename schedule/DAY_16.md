# День 16 — Render cycle + hooks overview

> Неделя 4 из 6 | ~**2–2.5 ч** | 2 theory-файла

## Цель дня

**Порядок фаз:** render → commit → effects. Обзор **всех hooks** — карта перед углублением useEffect / memo на DAY 17–18.

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week2/SIMPLE_GUIDE.md`** — Render cycle + Hooks |

---

## Шаг 1 — READ (35 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week2/renderCycle.jsx` | Render phase, commit, paint, effect timing |
| 2 | `theory/week2/hooksOverview.jsx` | useState, useRef, useReducer, rules of hooks |

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. Render phase vs Commit phase — что где происходит?
2. Когда DOM уже обновлён, а useEffect ещё нет?
3. useLayoutEffect — зачем, 1 пример (measure DOM)
4. Назови 5 hooks и по одному use case

---

## Шаг 3 — CODE (35 мин) ✍️

На бумаге — timeline для компонента `<Search>`:

1. User click → setState
2. Re-render → commit → paint
3. useEffect fetch
4. setState from fetch → второй цикл

Отметь на timeline: где useLayoutEffect, если нужен measure.

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 16
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] renderCycle + hooksOverview прочитал
- [ ] render vs commit vs effect — вслух
- [ ] timeline нарисовал

**Завтра → [DAY_17.md](DAY_17.md)** — useEffect + useMemo/useCallback
