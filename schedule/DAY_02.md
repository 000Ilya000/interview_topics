# День 2 — Promises + Closures + Debounce/Throttle

> Неделя 1 из 6 | ~**3 ч** | 4 theory-файла + hand coding

## Цель дня

Разобрать **Promises** и **closures**, и **написать debounce/throttle руками** — это частый live coding на собесе.

---

## Шаг 0 — SIMPLE (15 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week1/SIMPLE_GUIDE.md`** — разделы Promises, Closures, Debounce/Throttle |

Не открывай `.js`, пока не прочитал SIMPLE.

---

## Шаг 1 — READ (40 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week1/promiseChain.js` | Цепочки `.then().catch().finally()` |
| 2 | `theory/week1/promiseObject.js` | `all` / `allSettled` / `race` / `any` |
| 3 | `theory/week1/circuitFunction.js` | Closures на практике |
| 4 | `theory/week1/debounceThrottle.js` | Паттерн + use cases |

```bash
node theory/week1/promiseChain.js
node theory/week1/promiseObject.js
```

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. `Promise.all` vs `allSettled` vs `race` — когда что на проекте?
2. Closure — счётчик и debounce: почему «помнит» значение?
3. Debounce vs throttle — поиск в input vs scroll handler
4. Что делает `.finally()` и зачем?

---

## Шаг 3 — CODE (90 мин) ✍️ **без AI**

| # | Задача | Файл |
|---|--------|------|
| 1 | Debounce | `practice/handCoding/debounce.js` |
| 2 | Throttle | `practice/handCoding/throttle.js` |
| 3 | Сверка | `practice/handCoding/solutions/` |
| 4 | Разминка (15 мин) | `practice/tasks-js/FizzBuzz.js` |

---

## Шаг 4 — MOCK (15 мин)

```bash
node mockInterview/questions.js 2
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] Promises + closures объяснил вслух
- [ ] debounce написан руками
- [ ] throttle написан руками
- [ ] сверил с solutions
- [ ] mock вслух

**Завтра → [DAY_03.md](DAY_03.md)** — this, prototypes, types/variables/operators
