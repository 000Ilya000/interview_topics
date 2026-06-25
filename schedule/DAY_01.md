# День 1 — HTML/CSS + Event Loop (начало)

> Неделя 1 из 5 | Понедельник | ~3 ч

## Цель дня

Объяснить простыми словами: семантику HTML, flex vs grid, и **почему Promise раньше setTimeout**.

---

## Шаг 0 — SIMPLE (20 мин) ★ начни здесь

| # | Файл |
|---|------|
| 0 | **`theory/week1/SIMPLE_GUIDE.md`** — HTML/CSS + Event Loop простым языком |

Прочитай разделы до Promises. Не лезь в `.js` пока не прочитал.

---

## Шаг 1 — READ (40 мин)

| # | Файл |
|---|------|
| 1 | `theory/week1/htmlCssA11y.js` |
| 2 | `theory/week1/metaTags.html` |
| 3 | `theory/week1/browserInternals.js` |
| 4 | `theory/week1/eventLoop.js` |

```bash
node theory/week1/browserInternals.js
node theory/week1/eventLoop.js
```

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**, без терминов:

1. article vs section — пример из жизни (пост vs раздел)
2. flex vs grid — «ряд кнопок» vs «сетка карточек»
3. Event loop — «очередь в банке: sync → Promise → setTimeout»
4. Почему вывод `1, 4, 3, 2`?

---

## Шаг 3 — CODE (60 мин)

Измени порядок `setTimeout`/`Promise` в `eventLoop.js` — предскажи вывод, проверь `node`.

---

## Шаг 4 — MOCK (15 мин)

```bash
node mockInterview/questions.js 1
```

---

## CHECK

- [ ] SIMPLE_GUIDE прочитан
- [ ] 4 темы объяснил простым языком
- [ ] event loop примеры прогнал
- [ ] mock-вопрос вслух

**Завтра → [DAY_02.md](DAY_02.md)**
