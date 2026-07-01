# День 9 — Hand coding: EventEmitter + повтор debounce/throttle

> Неделя 2 из 6 | ~**2.5 ч** | без новой теории — закрепление DAY 01–08

## Цель дня

Закрепить **самое важное руками**: EventEmitter (паттерн pub/sub) и debounce/throttle **из памяти**. Если что-то забыл — точечно перечитай файл из таблицы, не всю неделю.

---

## Шаг 0 — SIMPLE (10 мин) ★

Открой **`theory/week1/SIMPLE_GUIDE.md`** и пройди только **слабые места** из списка:

| Если забыл | Перечитай |
|------------|-----------|
| Event loop | DAY 01 — eventLoop |
| Promises | DAY 02 — promiseObject |
| this / prototype | DAY 03 |
| map/filter/reduce | DAY 04 — arrayMethods |
| Memory / immutability | DAY 06 |

---

## Шаг 1 — READ (20 мин)

**Новых файлов нет.** Если всё помнишь — сразу к Шагу 3.

Если нужно освежить — max **1–2 файла** из таблицы выше, не больше.

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой всё. Объясни **как коллеге**:

1. EventEmitter: `on`, `off`, `emit` — зачем в UI и в Node?
2. Debounce — алгоритм словами (timer, reset)
3. Throttle — чем отличается от debounce?
4. Одна тема из DAY 06–08, где был слаб (memory / Map / reflow)

---

## Шаг 3 — CODE (60 мин) ✍️ **без AI, без подглядывания в solutions**

| # | Задача | Файл |
|---|--------|------|
| 1 | EventEmitter с нуля | `practice/handCoding/eventEmitter.js` |
| 2 | Debounce из памяти | чистый файл / бумага |
| 3 | Throttle из памяти | чистый файл / бумага |
| 4 | Сверка | `practice/handCoding/solutions/` |

Порядок: сначала **без solutions**, потом сверка. Запиши, что пришлось подсмотреть.

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 9
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] EventEmitter написал руками
- [ ] debounce из памяти (или 1 повтор с solutions)
- [ ] throttle из памяти
- [ ] mock вслух

**Завтра → [DAY_10.md](DAY_10.md)** — Review недели 1
