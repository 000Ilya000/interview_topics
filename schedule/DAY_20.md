# День 20 — Advanced patterns + state management + miniStateManager

> Неделя 4 из 6 | ~**2.5 ч** | 2 theory-файла + hand coding

## Цель дня

**Error Boundary, Portal, lazy/Suspense** — паттерны production-кода. **State management** — когда Query / Zustand / RTK. Плюс **miniStateManager** руками.

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week2/SIMPLE_GUIDE.md`** — Patterns + State |

---

## Шаг 1 — READ (40 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week2/advancedPatterns.jsx` | Error Boundary, Portal, lazy, compound components |
| 2 | `theory/week4/stateManagement.jsx` | Server vs client state, Query, Zustand, RTK |

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. Error Boundary — что ловит, что **не** ловит?
2. Portal — модалка, z-index, a11y
3. `React.lazy` + Suspense — code splitting на уровне компонента
4. Server state vs UI state — куда что класть?

---

## Шаг 3 — CODE (55 мин) ✍️ **без AI**

| # | Задача | Файл |
|---|--------|------|
| 1 | Mini state manager (pub/sub) | `practice/handCoding/miniStateManager.js` |
| 2 | Сверка | `practice/handCoding/solutions/miniStateManager.js` |

На бумаге: набросай API `createStore(subscribe, getState, setState)`.

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 20
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] advancedPatterns + stateManagement прочитал
- [ ] Error Boundary + Portal объяснил
- [ ] miniStateManager написал руками

**Завтра → [DAY_21.md](DAY_21.md)** — Review недели 2 (TS + React)
