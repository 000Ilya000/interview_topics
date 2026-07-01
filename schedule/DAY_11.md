# День 11 — TypeScript 1/4: any, unknown, type guards

> Неделя 3 из 6 | ~**2–2.5 ч** | 2 theory-файла

## Цель дня

Старт TS-блока (4 дня). Сегодня — **безопасная типизация**: `any` vs `unknown` vs `never` и **type guards** для сужения типов.

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week2/SIMPLE_GUIDE.md`** — начало блока TypeScript |

---

## Шаг 1 — READ (35 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week2/anyTypes.ts` | any, unknown, never, void |
| 2 | `theory/week2/typeGuards.ts` | `typeof`, `in`, custom `x is T` |

Открывай в IDE с подсветкой TS или через `tsc --noEmit` если настроен.

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. Почему `unknown` безопаснее `any`?
2. Когда нужен `never`? (exhaustive check в switch)
3. Custom guard `function isUser(x): x is User` — что даёт компилятору?
4. `typeof` vs `in` — пример на каждый

---

## Шаг 3 — CODE (35 мин) ✍️

На бумаге или в черновике рядом с `theory/week2/typeGuards.ts`:

1. Функция `parseInput(input: unknown): string` — с guard
2. `function isString(v: unknown): v is string`
3. Switch по union `'loading' | 'success' | 'error'` с `never` в default

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 11
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] anyTypes + typeGuards прочитал
- [ ] any vs unknown vs never — вслух
- [ ] 2 type guard написал

**Завтра → [DAY_12.md](DAY_12.md)** — utility types + generics
