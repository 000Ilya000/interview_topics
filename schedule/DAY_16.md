# День 16 — Reflow vs Repaint ★ Senior

> Неделя 4, день 1 | ~2.5 ч

## READ (60 мин)

| # | Файл |
|---|------|
| 1 | **`theory/week1/reflowRepaint.md`** ← главный файл дня |
| 2 | `theory/week1/renderingPipeline.js` | повтор базы |

## EXPLAIN (Middle vs Senior)

| Middle | Senior |
|--------|--------|
| reflow дороже repaint | layout → paint → composite цепочка |
| transform лучше left | layout thrashing + как fix |
| will-change | memory overhead compositor layers |
| | DevTools Performance + Paint flashing |
| | связь reflow с CLS |

## Практика (15 мин)

Открой DevTools → Performance → запиши короткую анимацию через `left` vs `transform` — сравни Layout blocks

## MOCK (15 мин)

```bash
node mockInterview/questions.js 16
```

**→ [DAY_17.md](DAY_17.md)** — Code Splitting
