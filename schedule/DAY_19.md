# День 19 — Context + Concurrent features

> Неделя 4 из 6 | ~**2–2.5 ч** | 2 theory-файла

## Цель дня

**Context** — когда ок и как не убить perf. **Concurrent React** — useTransition, useDeferredValue, Suspense (обзор для Senior).

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week2/SIMPLE_GUIDE.md`** — Context + Concurrent |

---

## Шаг 1 — READ (35 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week2/context.jsx` | Provider, split context, selector pattern |
| 2 | `theory/week2/concurrentFeatures.jsx` | useTransition, deferred value, Suspense |

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. Почему один fat Context → rerender всех consumers?
2. Fix: split ThemeContext + UserContext
3. useTransition — «urgent vs non-urgent» update
4. useDeferredValue vs debounce — в чём разница?

---

## Шаг 3 — CODE (35 мин) ✍️

На бумаге — архитектура:

1. App с Theme + Auth — нарисуй 2 context
2. Список 1000 items + filter input — где useDeferredValue?
3. Когда Context хуже Zustand/Redux? (связь с DAY 20)

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 19
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] context + concurrent прочитал
- [ ] context rerender fix объяснил
- [ ] useTransition / deferred — вслух

**Завтра → [DAY_20.md](DAY_20.md)** — patterns + miniStateManager
