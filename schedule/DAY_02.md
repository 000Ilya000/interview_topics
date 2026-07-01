# День 2 — Promises + Closures + Debounce/Throttle

> Неделя 1 из 5 | Вторник | ~3 ч

## Цель дня

Понять Promises, closures и **написать debounce/throttle руками** — это частый live coding на собесе.

---

## Шаг 0 — SIMPLE (15 мин) ★ начни здесь

| # | Файл |
|---|------|
| 0 | **`theory/week1/SIMPLE_GUIDE.md`** — разделы Promises, Closures, Debounce/Throttle |

Не открывай `.js` пока не прочитал SIMPLE.

---

## Шаг 1 — READ (40 мин)

| # | Файл |
|---|------|
| 1 | `theory/week1/promiseChain.js` |
| 2 | `theory/week1/promiseObject.js` |
| 3 | `theory/week1/circuitFunction.js` |
| 4 | `theory/week1/debounceThrottle.js` |

```bash
node theory/week1/promiseChain.js
node theory/week1/promiseObject.js
```

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. `Promise.all` vs `allSettled` vs `race` — когда что?
2. Что такое closure — пример (счётчик, debounce)
3. Debounce vs throttle — разница и use case (поиск vs scroll)
4. Как работает `.then().catch().finally()`?

---

## Шаг 3 — CODE (90 мин) ✍️

1. `practice/handCoding/debounce.js` — **без AI**
2. `practice/handCoding/throttle.js` — **без AI**
3. Сверка → `practice/handCoding/solutions/`
4. `practice/tasks-js/FizzBuzz.js` — разминка (15 мин)

---

## Шаг 4 — MOCK (15 мин)

```bash
node mockInterview/questions.js 2
```

---

## CHECK

> ✅ Кликабельные чекбоксы → [Issue «Прогресс»](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md) · в Obsidian — отмечай ниже

- [ ] SIMPLE_GUIDE (Promises + Closures) прочитан
- [ ] Promise.all / race объяснил вслух
- [ ] debounce написан руками
- [ ] throttle написан руками
- [ ] сверил с solutions
- [ ] mock-вопросы вслух

**Завтра → [DAY_03.md](DAY_03.md)**
