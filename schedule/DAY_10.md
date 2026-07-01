# День 10 — Review недели 1 (JS + Browser)

> Неделя 2 из 6 | ~**2–2.5 ч** | без новой теории — проверка DAY 01–09

## Цель дня

**Marathon:** пройти все темы недели 1 вслух без файлов. Найти дыры до TypeScript. Mock — как мини-собес по пройденному материалу.

---

## Шаг 0 — SIMPLE (10 мин) ★

Пробеги **`theory/week1/SIMPLE_GUIDE.md`** целиком — только заголовки и то, где ставишь «?».

---

## Шаг 1 — READ (15 мин)

Новых файлов нет. Если в Шаге 0 нашёл дыру — **один** файл из таблицы:

| День | Тема | Файл для повтора |
|------|------|------------------|
| 01 | Event loop | `theory/week1/eventLoop.js` |
| 02 | Promises | `theory/week1/promiseObject.js` |
| 03 | this + prototype | `theory/week1/this.js` |
| 04 | Arrays | `theory/week1/arrayMethods.js` |
| 06 | Memory | `theory/week1/memoryLeaks.js` |
| 07 | Pipeline | `theory/week1/renderingPipeline.js` |
| 08 | Reflow | `theory/week1/reflowRepaint.md` |

---

## Шаг 2 — EXPLAIN (45 мин) ★ главный блок

Закрой всё. **15 мин на блок**, объясняй вслух как на собесе:

### Блок A — Async + runtime (DAY 01–02)
- Event loop: sync → microtask → mactask
- `Promise.all` vs `race` vs `allSettled`
- Closure + debounce vs throttle

### Блок B — JS core (DAY 03–05)
- `this`: arrow vs regular, `bind`
- Prototype chain
- `==` vs `===`, `??` vs `||`
- map / filter / reduce, destructuring

### Блок C — Browser (DAY 06–08)
- 2 причины memory leak + fix
- Map vs Object, Set dedupe
- Layout → Paint → Composite
- Reflow vs `transform`

Запиши **3 темы**, где запнулся — вернёшься к ним перед DAY 21.

---

## Шаг 3 — CODE (30 мин) ✍️

Hand coding из памяти (5 мин каждый, без AI):

1. debounce
2. throttle  
3. EventEmitter — только `on` + `emit`

Не получилось → отметь в «Слабые темы», перечитай DAY 02 или DAY 09.

---

## Шаг 4 — MOCK (20 мин)

```bash
node mockInterview/questions.js 10
```

Опционально полный прогон:

```bash
node mockInterview/questions.js 1-10
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] 3 блока marathon (A, B, C) — вслух
- [ ] 3 hand coding из памяти
- [ ] mock DAY 10 вслух
- [ ] «Слабые темы» обновлены

**Завтра → [DAY_11.md](DAY_11.md)** — TypeScript 1/4
