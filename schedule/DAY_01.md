# День 1 — HTML/CSS + Event Loop (начало)

> Неделя 1 из 4 | Понедельник | ~2.5–3 часа

## Цель дня

После сегодня ты можешь объяснить: семантику HTML, flex vs grid, и **почему Promise выполняется раньше setTimeout**.

---

## Шаг 1 — READ (45–60 мин)

Открывай **в этом порядке**:

| # | Файл | На что обратить внимание |
|---|------|--------------------------|
| 1 | `theory/week1/htmlCssA11y.js` | article vs section, flex/grid, a11y |
| 2 | `theory/week1/metaTags.html` | viewport, OG-теги |
| 3 | `theory/week1/browserInternals.js` | call stack, micro vs macro |
| 4 | `theory/week1/eventLoop.js` | примеры с выводом в консоль — прогони их |

```bash
node theory/week1/browserInternals.js
node theory/week1/eventLoop.js
```

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни вслух:

1. Чем `<article>` отличается от `<section>`?
2. Когда flex, когда grid?
3. Порядок: sync → microtasks → macrotasks
4. Почему `Promise.then` раньше `setTimeout(0)`?

Если застрял — вернись к файлу 3 или 4, не иди дальше.

---

## Шаг 3 — CODE (60 мин) ✍️

Сегодня **без hand coding** — день 2 будет debounce.

Вместо этого: **возьми любой пример из `theory/week1/eventLoop.js`**, измени порядок `setTimeout`/`Promise`, предскажи вывод, проверь через `node`.

---

## Шаг 4 — MOCK (15 мин)

Открой `mockInterview/questions.js`, найди `getDailyQuestions(1)`:

- 1 вопрос **javascript** — ответь вслух
- 1 вопрос **system** — можно пропустить на неделе 1, вернёшься на неделе 4

```bash
node mockInterview/questions.js 1
```

---

## Шаг 5 — CHECK

- [ ] Прочитал 4 файла по порядку
- [ ] Объяснил 4 темы вслух
- [ ] Прогнал event loop примеры в node
- [ ] Ответил на 1–2 mock-вопроса

**Завтра → [DAY_02.md](DAY_02.md)** | Карта: `exploreTopics.js`

---

## Шпаргалка дня (1 абзац)

HTML/CSS спрашивают первым: семантика помогает SEO и screen readers, flex — одномерный layout, grid — двумерный. Event loop: JS однопоточен, сначала весь sync-код, потом все microtasks (Promise), потом один macrotask (setTimeout). Поэтому на собесах `Promise.then` всегда раньше `setTimeout(fn, 0)`.
