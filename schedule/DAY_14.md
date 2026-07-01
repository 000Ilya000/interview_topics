# День 14 — TypeScript 4/4: mapped types + declarations

> Неделя 3 из 6 | ~**2–2.5 ч** | 3 theory-файла

## Цель дня

**Закрыть TS-блок:** mapped types и **declaration files** (`.d.ts`) — зачем нужны, как типизировать CSS modules / сторонние lib.

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week2/SIMPLE_GUIDE.md`** — Mapped types + Declarations |

---

## Шаг 1 — READ (40 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week2/mappedTypes.ts` | `{ [K in keyof T]: ... }`, Readonly, optional |
| 2 | `theory/week2/declorations.d.ts` | declare module, ambient types |
| 3 | `theory/week2/declarationMerging.d.ts` | merging interface / namespace |

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. Mapped type — `Readonly<T>` своими словами
2. Зачем `declare module '*.css'`?
3. Что такое ambient declaration?
4. Declaration merging — когда встречается?

---

## Шаг 3 — CODE (35 мин) ✍️

На бумаге:

1. `type Mutable<T> = { -readonly [K in keyof T]: T[K] }` — объясни синтаксис
2. `declare module '*.svg' { ... }` — набросай заглушку
3. **TS блок закрыт:** 5 мин — перечисли вслух темы DAY 11–14 без подсказок

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 14
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] mapped + declarations прочитал
- [ ] .d.ts — зачем и как
- [ ] TS блок (4 дня) могу перечислить вслух

**Завтра → [DAY_15.md](DAY_15.md)** — React: reconciliation + Fiber
