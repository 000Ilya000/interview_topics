# День 28 — A11y + Web Vitals + Architecture + ФИНАЛ 🎯

> Неделя 6 из 6 | ~**3–3.5 ч** | финальный день курса

## Цель дня

Закрыть **Senior-темы:** accessibility, Core Web Vitals, обзор **FSD**. Финальный mock + **6 hand coding** из памяти. Курс завершён.

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week4/SIMPLE_GUIDE.md`** — A11y + Vitals + Architecture (skim) |

---

## Шаг 1 — READ (40 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week2/accessibleComponents.md` | Focus, ARIA, trap, inert, keyboard |
| 2 | `theory/week3/webVitals.js` | LCP, INP, CLS — пороги и fix |
| 3 | `theory/week4/featureSlicedDesign.js` | FSD слои: app, pages, features, shared |

Optional skim (5 мин каждый, не обязательно): `solid.js`, `monorepo.js`

```bash
node theory/week3/webVitals.js
```

---

## Шаг 2 — EXPLAIN (20 мин)

Закрой файлы. Объясни **как коллеге**:

1. Focus trap в модалке — как реализовать?
2. `inert` — зачем?
3. LCP / INP / CLS — порог «хорошо» и 1 способ улучшить каждый
4. FSD: app → pages → features → entities → shared
5. **Middle vs Senior** — 5 отличий своими словами

---

## Шаг 3 — CODE (60 мин) ✍️ **без AI**

### A11y (15 мин)
- Открой любую модалку (свою или demo)
- Tab через элементы — focus виден?
- Esc закрывает? Focus возвращается на trigger?

### Hand coding marathon (30 мин) — **все 6 из памяти:**

| # | Файл | Неделя |
|---|------|--------|
| 1 | debounce | `practice/handCoding/debounce.js` |
| 2 | throttle | `practice/handCoding/throttle.js` |
| 3 | eventEmitter | `practice/handCoding/eventEmitter.js` |
| 4 | useDebounce | `practice/handCoding/useDebounce.jsx` |
| 5 | miniStateManager | `practice/handCoding/miniStateManager.js` |
| 6 | miniReactQuery | `practice/handCoding/miniReactQuery.js` |

Правило: 5 мин на каждый → сверка с `solutions/` → записать что забыл.

---

## Шаг 4 — MOCK FINAL (20 мин)

```bash
node mockInterview/questions.js 28
```

Это **MIX** — вопросы со всего курса. Ответы вслух, как на собесе.

---

## CHECK — финал

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] a11y: focus trap + Tab-тест
- [ ] LCP / INP / CLS — пороги вслух
- [ ] FSD слои — объяснил
- [ ] hand coding **6/6** (или список что повторить)
- [ ] mock final вслух
- [ ] **28 дней ✅**
- [ ] Готов: Senior Frontend Engineer (React/Next.js)

**🎉 Курс пройден** · [COURSE_MAP.md](COURSE_MAP.md)

---

## После курса

1. Повтори «Слабые темы» из заметки — 1 неделя
2. `node mockInterview/questions.js mix` — раз в 2–3 дня
3. Hand coding — раз в неделю 6/6 из памяти
