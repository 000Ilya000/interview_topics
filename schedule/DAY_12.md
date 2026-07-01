# День 12 — TypeScript 2/4: utility types + generics

> Неделя 3 из 6 | ~**2–2.5 ч** | 2 theory-файла

## Цель дня

**Utility types** (Pick, Omit, Partial…) и **generics** — стандартные вопросы на Senior: «сделай тип для API response».

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week2/SIMPLE_GUIDE.md`** — Utility types + Generics |

---

## Шаг 1 — READ (35 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week2/utilityTypes.ts` | Pick, Omit, Partial, Required, Record |
| 2 | `theory/week2/generics.tsx` | `<T>`, constraints, default type params |

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. Pick vs Omit — пример: форма редактирования user
2. Partial — patch/update DTO
3. Generic `ApiResponse<T>` — зачем?
4. Constraint `<T extends { id: string }>` — когда нужен?

---

## Шаг 3 — CODE (40 мин) ✍️

На бумаге:

1. Тип `User` → `UserPreview = Pick<User, 'id' | 'name'>`
2. `UpdateUser = Partial<Omit<User, 'id'>>`
3. **`DeepPartial<T>`** — рекурсивно optional все поля (как в `inferTypes` / utilityTypes)
4. `function first<T>(arr: T[]): T | undefined`

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 12
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] utilityTypes + generics прочитал
- [ ] Pick/Omit/Partial с примерами
- [ ] DeepPartial попробовал

**Завтра → [DAY_13.md](DAY_13.md)** — infer + conditional types
