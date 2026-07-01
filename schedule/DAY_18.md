# День 18 — Лишние рендеры + useDebounce (hand coding)

> Неделя 4 из 6 | ~**2.5 ч** | 1 theory + 1 hand coding

## Цель дня

Научиться **находить лишние рендеры** (Profiler) и написать **`useDebounce` hook** — связка theory + live coding.

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week2/SIMPLE_GUIDE.md`** — Extra renders |

---

## Шаг 1 — READ (35 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week2/extraRenders.jsx` | Причины rerender, React.memo, Profiler, context split |

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. 3 причины лишнего рендера (новый object/array, context, parent rerender)
2. React.memo — что сравнивает?
3. Profiler — что смотреть (commit duration, why did render)?
4. Как разбить context, чтобы не rerender всё дерево?

---

## Шаг 3 — CODE (55 мин) ✍️ **без AI**

| # | Задача | Файл |
|---|--------|------|
| 1 | useDebounce hook | `practice/handCoding/useDebounce.jsx` |
| 2 | Сверка | `practice/handCoding/solutions/useDebounce.jsx` |

После решения: опиши, как useDebounce использует closure + useEffect cleanup.

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 18
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] extraRenders прочитал
- [ ] 3 причины rerender — вслух
- [ ] useDebounce написал руками

**Завтра → [DAY_19.md](DAY_19.md)** — Context + Concurrent
