# День 22 — Next.js 1/2: rendering modes + hydration

> Неделя 5 из 6 | ~**2–2.5 ч** | 2 theory-файла

## Цель дня

**CSR / SSR / SSG / ISR** — когда что выбирать на проекте. **Hydration** — что ломается и mismatch.

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week3/SIMPLE_GUIDE.md`** — Rendering modes + Hydration |

---

## Шаг 1 — READ (35 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week3/renderingModes.jsx` | CSR, SSR, SSG, ISR, streaming |
| 2 | `theory/week3/hydration.jsx` | Hydration, mismatch, suppressHydrationWarning |

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. CSR vs SSR — SEO, TTFB, интерактивность
2. SSG vs ISR — блог vs e-commerce с ценами
3. Hydration mismatch — 3 типичные причины (Date, random, browser-only API)
4. Streaming SSR — зачем Next 13+?

---

## Шаг 3 — CODE (35 мин) ✍️

На бумаге — таблица «страница → режим»:

| Страница | Режим | Почему |
|----------|-------|--------|
| Landing marketing | ? | |
| Dashboard (auth) | ? | |
| Blog post | ? | |
| Product catalog (часто меняется) | ? | |

+ 1 пример fix hydration mismatch (client-only component).

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 22
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] renderingModes + hydration прочитал
- [ ] CSR/SSR/SSG/ISR — таблица с примерами
- [ ] mismatch — 3 причины вслух

**Завтра → [DAY_23.md](DAY_23.md)** — App Router + RSC
