# День 13 — TypeScript 3/4: infer + conditional types

> Неделя 3 из 6 | ~**2–2.5 ч** | 2 theory-файла

## Цель дня

**infer** и **conditional types** — продвинутый TS для собесов: `ReturnType`, «если T — массив, верни element type».

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week2/SIMPLE_GUIDE.md`** — Infer + Conditional |

---

## Шаг 1 — READ (35 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week2/inferTypes.ts` | infer в conditional, ReturnType, Parameters |
| 2 | `theory/week2/conditionalTypes.ts` | `T extends U ? X : Y`, distributive |

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. Как работает `ReturnType<typeof fn>` под капотом?
2. `infer R` — что «выводит» компилятор?
3. Conditional: `T extends Array<infer U> ? U : never`
4. Distributive conditional — простым примером

---

## Шаг 3 — CODE (40 мин) ✍️

На бумаге:

1. `type ElementType<T> = T extends (infer U)[] ? U : T`
2. `type PromiseValue<T> = T extends Promise<infer V> ? V : T`
3. Разбери пример из `inferTypes.ts` — перепиши своими словами

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 13
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] inferTypes + conditionalTypes прочитал
- [ ] ReturnType / infer объяснил
- [ ] 2 conditional type на бумаге

**Завтра → [DAY_14.md](DAY_14.md)** — mapped types + declarations (закрытие TS)
