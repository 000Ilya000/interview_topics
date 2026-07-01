# День 5 — Destructuring + строки

> Неделя 1 из 6 | ~**2–2.5 ч** | 2 theory-файла

## Цель дня

**Spread / rest / destructuring** — каждый день в React-коде. Плюс базовые **методы строк** для задач на собесе.

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week1/SIMPLE_GUIDE.md`** — «Destructuring» и «Strings» |

---

## Шаг 1 — READ (35 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week1/distructure.js` | object/array destructuring, rest, defaults, swap |
| 2 | `theory/week1/stringsMethods.js` | slice, split, includes, replace, template literals |

```bash
node theory/week1/distructure.js
node theory/week1/stringsMethods.js
```

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. Деструктуризация `{ name, ...rest }` — зачем `rest`?
2. Spread в объекте vs массиве — shallow copy
3. Defaults: `{ age = 0 }` — когда срабатывает?
4. `slice` vs `substring`, `includes` vs `indexOf`

---

## Шаг 3 — CODE (40 мин) ✍️ **без AI**

1. **`practice/tasks-js/findVowels.js`** — решить и объяснить вслух алгоритм
2. На бумаге: swap двух переменных через destructuring
3. На бумаге: merge двух объектов user + patch через spread

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 5
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] distructure + stringsMethods прочитал
- [ ] findVowels решил
- [ ] spread/rest/destructuring объяснил вслух

**Завтра → [DAY_06.md](DAY_06.md)** — memory + immutability (неделя 2)
