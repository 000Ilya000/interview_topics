# День 17 — useEffect / useLayoutEffect + useMemo / useCallback

> Неделя 4 из 6 | ~**2–2.5 ч** | 2 theory-файла

## Цель дня

Два самых частых hook-вопроса на собесе: **effects** (deps, cleanup) и **memoization** (когда помогает, когда вредит).

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week2/SIMPLE_GUIDE.md`** — useEffect + useMemo |

---

## Шаг 1 — READ (35 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week2/useEffectUseLayoutEffect.jsx` | deps, cleanup, stale closure, layout |
| 2 | `theory/week2/useMemoUseCallback.jsx` | memo, callback, referential equality |

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. useEffect vs useLayoutEffect — таблица «когда что»
2. Cleanup в useEffect — зачем return function?
3. Пустой deps `[]` vs без deps — разница
4. useMemo vs useCallback — не одно и то же
5. Когда memo **не нужен**?

---

## Шаг 3 — CODE (35 мин) ✍️

На бумаге:

1. useEffect: fetch + AbortController cleanup
2. useEffect: subscribe window resize + cleanup
3. Child с `React.memo` — когда `useCallback` для handler реально нужен?

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 17
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] 2 hook-файла прочитал
- [ ] effect vs layout — с примерами
- [ ] memo/callback — когда да / когда нет

**Завтра → [DAY_18.md](DAY_18.md)** — лишние рендеры + useDebounce
