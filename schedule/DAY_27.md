# День 27 — Reflow ★ + Code splitting ★ (Senior perf)

> Неделя 6 из 6 | ~**2.5 ч** | 2 md + DevTools

## Цель дня

**Углублённый perf:** layout thrashing, compositor, стратегии **code splitting** (route / component / dynamic import). Практика в **Chrome DevTools**.

> На DAY 08 был reflow **база** — сегодня повтор + глубина + инструменты.

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week4/SIMPLE_GUIDE.md`** — Performance |

---

## Шаг 1 — READ (40 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week1/reflowRepaint.md` | **Повтор + deep:** batch reads/writes, layers |
| 2 | `theory/week3/codeSplitting.md` | Route split, dynamic import, preload/prefetch |

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. Layout thrashing — код «read offsetHeight → write width → read…»
2. 3 стратегии code splitting — route, component, vendor
3. `preload` vs `prefetch` — когда что?
4. Next.js `dynamic()` — связь с DAY 23

---

## Шаг 3 — CODE (50 мин) ✍️

### DevTools (обязательно):

1. Создай HTML или открой любую страницу с анимацией
2. Performance tab: запиши 5 сек
3. Сравни **`left` animation** vs **`transform` animation** — найди Layout events
4. Запиши вывод в заметку (1 абзац)

### На бумаге:

5. Split для app: Home, Dashboard, Admin — какие chunks?
6. Когда `React.lazy` vs Next `dynamic()`?

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 27
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] reflowRepaint + codeSplitting прочитал
- [ ] DevTools: left vs transform — сравнил
- [ ] 3 стратегии split — вслух

**Завтра → [DAY_28.md](DAY_28.md)** — ФИНАЛ 🎯
