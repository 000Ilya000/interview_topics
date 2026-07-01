# День 4 — Функции + методы массивов

> Неделя 1 из 6 | ~**2–2.5 ч** | 2 theory-файла

## Цель дня

Отдельно от prototypes (DAY 03): **виды функций** и **map / filter / reduce**. Это основа для задач на собесе и для React (lists, transforms).

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week1/SIMPLE_GUIDE.md`** — разделы «Functions» и «Array methods» |

---

## Шаг 1 — READ (35 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week1/functionsTypes.js` | declaration / expression / arrow, IIFE, hoisting |
| 2 | `theory/week1/arrayMethods.js` | map, filter, reduce, find, some, mutating vs copy |

```bash
node theory/week1/functionsTypes.js
node theory/week1/arrayMethods.js
```

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. Function declaration vs expression vs arrow — когда arrow **нельзя**?
2. `map` vs `filter` vs `reduce` — по одному примеру из жизни (корзина, фильтр, сумма)
3. Mutating (`push`, `sort`) vs non-mutating (`map`, `filter`) — почему в React важно?

---

## Шаг 3 — CODE (35 мин) ✍️

На бумаге или в отдельном файле — **без AI**:

1. Массив `[3, 1, 4, 1, 5]` → только чётные, умножить на 2, посчитать сумму (три отдельных шага)
2. Реализуй `unique(arr)` через `filter` + `indexOf`
3. Optional: прогони `practice/tasks-js/removeDublicateFromArray.js` если осталось время

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 4
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] functionsTypes + arrayMethods прочитал
- [ ] map / filter / reduce объяснил с примерами
- [ ] 2–3 задачи на бумаге решил

**Завтра → [DAY_05.md](DAY_05.md)** — destructuring + строки
