# День 21 — Review недели 2 (TypeScript + React)

> Неделя 5 из 6 | ~**2.5–3 ч** | без новой теории — проверка DAY 11–20

## Цель дня

**Marathon TS + React** перед Next.js. Задачи `testScreen_1` — формат «как на live interview». Mock — вопросы по DAY 11–20.

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week2/SIMPLE_GUIDE.md`** — пробеги заголовки TS + React, отметь «?» |

---

## Шаг 1 — READ (20 мин)

Новых файлов нет. Max **2 файла** только по слабым темам:

| День | Тема | Файл |
|------|------|------|
| 11 | any/guards | `theory/week2/typeGuards.ts` |
| 12 | Generics | `theory/week2/generics.tsx` |
| 15 | Reconciliation | `theory/week2/reconciliation.jsx` |
| 17 | Effects | `theory/week2/useEffectUseLayoutEffect.jsx` |
| 18 | Rerenders | `theory/week2/extraRenders.jsx` |

---

## Шаг 2 — EXPLAIN (40 мин) ★ главный блок

Закрой всё. **~8 мин на блок**, вслух:

### Блок A — TypeScript (DAY 11–14)
- any vs unknown vs never
- Pick / Omit / Partial + generic `ApiResponse<T>`
- infer + ReturnType
- mapped types + .d.ts зачем

### Блок B — React core (DAY 15–17)
- Reconciliation + key=index problem
- Render vs Commit vs useEffect timing
- useLayoutEffect — 1 use case
- useMemo vs useCallback — когда не нужны

### Блок C — React advanced (DAY 18–20)
- 3 причины лишнего rerender
- Context split fix
- Error Boundary limits
- Server state → Query, UI state → useState/Zustand

Запиши **3 слабые темы** в заметку.

---

## Шаг 3 — CODE (50 мин) ✍️

| # | Задача | Файл |
|---|--------|------|
| 1 | Interview questions (ответь письменно/вслух) | `practice/tasks-react/testScreen_1.js` |
| 2 | useDebounce из памяти (5 мин) | — |
| 3 | miniStateManager subscribe/notify (5 мин) | — |

---

## Шаг 4 — MOCK (15 мин)

```bash
node mockInterview/questions.js 21
```

Опционально:

```bash
node mockInterview/questions.js 11-21
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] 3 блока marathon (TS, React core, React adv) — вслух
- [ ] testScreen_1 прошёл
- [ ] mock DAY 21 вслух
- [ ] «Слабые темы» обновлены

**Завтра → [DAY_22.md](DAY_22.md)** — Next.js 1/2
