# День 15 — Reconciliation + Fiber

> Неделя 3 из 6 | ~**2–2.5 ч** | 2 theory-файла

## Цель дня

**Как React обновляет DOM:** Virtual DOM, reconciliation, роль **key**, архитектура **Fiber**. Без hooks — только «движок».

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week2/SIMPLE_GUIDE.md`** — Reconciliation + Fiber |

---

## Шаг 1 — READ (35 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week2/reconciliation.jsx` | Diff, keys, list reorder |
| 2 | `theory/week2/fiber.jsx` | Fiber node, work loop, concurrent |

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. Virtual DOM — зачем, если всё равно real DOM?
2. Почему `key={index}` в списке — плохо?
3. Reconciliation — что сравнивается (type, props)?
4. Fiber — зачем React разбил render на части?

---

## Шаг 3 — CODE (35 мин) ✍️

На бумаге:

1. Список `[A, B, C]` → вставили X в начало — diff с `key=index` vs `key=id`
2. Нарисуй дерево: App → Header + List(3 items) — что reconcile при смене одного item?
3. Optional: `practice/tasks-react/testScreen_2.js` — если есть вопросы по keys

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 15
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] reconciliation + fiber прочитал
- [ ] key + index problem объяснил
- [ ] diff нарисовал

**Завтра → [DAY_16.md](DAY_16.md)** — render cycle + hooks overview
