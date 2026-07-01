# День 1 — HTML/CSS + Event Loop

> Неделя 1 из 6 | ~**3 ч** | 4 theory-файла (старт курса — чуть плотнее)

## Цель дня

Понять **семантику HTML**, **flex vs grid** и **event loop** — почему `Promise` выполняется раньше `setTimeout`. Это база для всего JS и React дальше.

---

## Шаг 0 — SIMPLE (20 мин) ★ начни здесь

| # | Файл |
|---|------|
| 0 | **`theory/week1/SIMPLE_GUIDE.md`** — разделы «HTML/CSS» и «Event Loop» |

Прочитай до блока Promises. Не открывай `.js`, пока не прочитал SIMPLE.

---

## Шаг 1 — READ (40 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week1/htmlCssA11y.js` | Семантика, flex/grid, базовая a11y |
| 2 | `theory/week1/metaTags.html` | SEO, Open Graph |
| 3 | `theory/week1/browserInternals.js` | Как браузер грузит страницу |
| 4 | `theory/week1/eventLoop.js` | Call stack, microtasks, macrotasks |

```bash
node theory/week1/browserInternals.js
node theory/week1/eventLoop.js
```

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**, без заученных терминов:

1. `article` vs `section` — пример из жизни (пост в блоге vs раздел «О нас»)
2. Flex vs grid — «ряд кнопок в шапке» vs «сетка карточек товаров»
3. Event loop — «очередь в банке: сначала sync, потом Promise, потом setTimeout»
4. Почему в примере вывод `1, 4, 3, 2`? Нарисуй порядок на бумаге.

---

## Шаг 3 — CODE (60 мин)

1. Открой `theory/week1/eventLoop.js` — поменяй порядок `setTimeout` / `Promise` / `console.log`
2. **Сначала предскажи** вывод, потом проверь через `node`
3. Сделай 3 варианта: sync-only, Promise-first, setTimeout-first

---

## Шаг 4 — MOCK (15 мин)

```bash
node mockInterview/questions.js 1
```

Ответь вслух. Запиши 1 тему, где запнулся.

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] SIMPLE_GUIDE (HTML + Event Loop) прочитан
- [ ] 4 theory-файла прочитал
- [ ] event loop объяснил и поиграл с примерами
- [ ] mock-вопрос вслух

**Завтра → [DAY_02.md](DAY_02.md)** — Promises, closures, debounce/throttle
