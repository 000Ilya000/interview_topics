# День 7 — Map/Set + Rendering pipeline

> Неделя 2 из 6 | ~**2–2.5 ч** | 2 theory-файла

## Цель дня

**Map / Set / WeakMap** — когда Object/Array неудобны. **Rendering pipeline** — как браузер превращает HTML/CSS в пиксели (база перед reflow на DAY 08 и DAY 27).

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week1/SIMPLE_GUIDE.md`** — «Map/Set» и «Rendering pipeline» |

---

## Шаг 1 — READ (35 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week1/arrayMapSetWeakMapWeakSet.js` | Map vs Object, Set vs Array, WeakMap use case |
| 2 | `theory/week1/renderingPipeline.js` | Parse → Style → Layout → Paint → Composite |

```bash
node theory/week1/arrayMapSetWeakMapWeakSet.js
node theory/week1/renderingPipeline.js
```

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. Map vs Object — когда Map лучше? (частые add/delete, ключ не string)
2. Set — dedupe массива за O(n)
3. Цепочка Layout → Paint → Composite — что на каждом шаге?
4. Что такое compositor layer — интуиция

---

## Шаг 3 — CODE (35 мин) ✍️

На бумаге:

1. Dedupe `[1,2,2,3]` через `Set`
2. Частотный словарь слов через `Map`
3. Нарисуй pipeline для `<div>` с `background` + `transform` — какие этапы затронуты?

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 7
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] Map/Set + renderingPipeline прочитал
- [ ] pipeline объяснил по шагам
- [ ] 2 примера Map/Set на бумаге

**Завтра → [DAY_08.md](DAY_08.md)** — reflow база + задачи
