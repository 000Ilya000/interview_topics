# День 8 — Reflow / Repaint (база) + задачи

> Неделя 2 из 6 | ~**2.5 ч** | 1 theory-md + 2 tasks

## Цель дня

**Углубление perf-темы:** reflow vs repaint, `transform` vs `left`. На DAY 07 был общий pipeline — сегодня **что дорого** и почему. Плюс 2 классические JS-задачи.

> ⚠️ `renderingPipeline.js` уже был на DAY 07 — сегодня **не перечитываем**, только `reflowRepaint.md`.

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week1/SIMPLE_GUIDE.md`** — «Reflow / Repaint» (skim) |

---

## Шаг 1 — READ (35 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week1/reflowRepaint.md` | Reflow vs repaint, layout thrashing, transform, will-change |

Прочитай внимательно — на DAY 27 вернёмся к этому же файлу с DevTools.

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. Reflow vs repaint — что триггерит каждый?
2. Почему `element.style.left = x` в loop — плохо?
3. Почему `transform: translateX()` часто лучше?
4. Что такое layout thrashing (read-write-read-write)?

---

## Шаг 3 — CODE (50 мин) ✍️ **без AI**

| # | Задача | Файл |
|---|--------|------|
| 1 | Свой `filter` | `practice/tasks-js/myFilter.js` |
| 2 | Palindrome | `practice/tasks-js/isPalindrome.js` |

После решения — объясни алгоритм вслух для каждой.

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 8
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] reflowRepaint.md прочитал
- [ ] reflow vs transform объяснил вслух
- [ ] myFilter + isPalindrome решил

**Завтра → [DAY_09.md](DAY_09.md)** — hand coding недели 1
