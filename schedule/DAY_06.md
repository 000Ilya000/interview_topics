# День 6 — Memory leaks + immutability

> Неделя 2 из 6 | ~**2–2.5 ч** | 3 theory-файла

## Цель дня

Понять **откуда текут утечки памяти** в браузере и **почему React требует immutability**. Связь с DAY 02 (closures) и будущим React.

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week1/SIMPLE_GUIDE.md`** — «Memory» и «Immutability» |

---

## Шаг 1 — READ (40 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week1/memoryLeaks.js` | Listeners, timers, closures, detached DOM |
| 2 | `theory/week1/immutability.js` | Shallow vs deep, spread, почему не мутировать state |
| 3 | `theory/week1/structuredCloneSomeArrAt.js` | `structuredClone`, копия вложенных структур |

```bash
node theory/week1/memoryLeaks.js
node theory/week1/structuredCloneSomeArrAt.js
```

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. 3 типичные причины memory leak во frontend — пример на каждую
2. Почему `state.push(item)` в React — плохо?
3. Shallow copy через spread — когда **недостаточно**?
4. Когда использовать `structuredClone`?

---

## Шаг 3 — CODE (35 мин) ✍️

На бумаге или в черновике:

1. **Плохо:** компонент вешает `addEventListener` без cleanup — опиши fix
2. **Хорошо:** immutability update для `{ users: [...] }` — добавить user
3. Сравни: `{ ...obj, nested: obj.nested }` vs `structuredClone(obj)` — когда что?

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 6
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] 3 файла прочитал
- [ ] memory leaks + immutability объяснил с примерами
- [ ] shallow vs deep copy — вслух

**Завтра → [DAY_07.md](DAY_07.md)** — Map/Set + rendering pipeline
