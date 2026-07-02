# Неделя 1–2 — JS + Browser (DAY 01–10)

> Читай **до** `.js` файлов.  
> Расписание: `schedule/DAY_01` … `DAY_10` · Карта: `schedule/COURSE_MAP.md`  
> Чекбоксы — самопроверка. На GitHub не кликаются → [Issue «Прогресс»](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

| День | Тема | Файлы |
|------|------|-------|
| 01 | HTML/CSS + Event Loop | `htmlCssA11y.js`, `metaTags.html`, `browserInternals.js`, `eventLoop.js` |
| 02 | Promises + Closures + Debounce | `promiseChain.js`, `promiseObject.js`, `circuitFunction.js`, `debounceThrottle.js` |
| 03 | this + prototypes + basics | `this.js`, `prototypes.js`, `dataTypes.js`, `variables.js`, `operatorsTypes.js` |
| 04 | Функции + массивы | `functionsTypes.js`, `arrayMethods.js` |
| 05 | Destructuring + строки | `distructure.js`, `stringsMethods.js` |
| 06 | Memory + immutability | `memoryLeaks.js`, `immutability.js`, `structuredCloneSomeArrAt.js` |
| 07 | Map/Set + rendering pipeline | `arrayMapSetWeakMapWeakSet.js`, `renderingPipeline.js` |
| 08 | Reflow база + задачи | `reflowRepaint.md` |
| 09 | Hand coding W1 | `practice/handCoding/eventEmitter.js` |
| 10 | **Review W1** | marathon + mock 1–10 |

---

# DAY 01 — HTML/CSS + Event Loop

## HTML — «скелет страницы»

Сайт = **структура** (HTML) + **вид** (CSS) + **поведение** (JS).

### Семантические теги

| Тег | Простыми словами | Жизнь |
|-----|------------------|-------|
| `<header>` | Шапка | Логотип, меню |
| `<nav>` | Навигация | Ссылки |
| `<main>` | **Главный** контент, **один** на страницу | Статья, не sidebar |
| `<article>` | Самодостаточный блок | Пост, карточка товара |
| `<section>` | Тематический раздел | «Отзывы», «Цены» |
| `<aside>` | Боковой контент | Реклама |
| `<footer>` | Подвал | Копирайт |

**На собесе:** `article` можно «вырезать» — имеет смысл сам. `section` — часть большой страницы.

### Flex vs Grid

**Flex** — одна линия (ряд **или** колонка). *Жизнь:* кнопки в navbar.  
**Grid** — строки **и** колонки. *Жизнь:* сетка карточек.

**Правило:** navbar → flex. Layout страницы → grid.

### a11y — база

- Semantic HTML лучше `div` + `role`
- **Tab** — форма проходится с клавиатуры
- **alt** у картинок
- Контраст текста ~4.5:1

### Мета-теги — `metaTags.html`

| Тег | Зачем |
|-----|-------|
| `viewport` | Нормально на телефоне |
| `description` | SEO |
| `og:title`, `og:image` | Превью в мессенджерах |

---

## Event Loop — «один кассир в банке»

JS **однопоточный**. Порядок:

```
1. Синхронный код
2. ВСЕ microtasks (Promise, await)
3. ОДИН macrotask (setTimeout, click)
4. Снова microtasks → …
```

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// 1 → 4 → 3 → 2
```

📖 [Loupe — event loop](https://latentflip.com/loupe/)

---

# DAY 02 — Promises + Closures + Debounce

## Promises

| Метод | Жизнь |
|-------|-------|
| `Promise.all` | Все или никто |
| `Promise.allSettled` | Все результаты |
| `Promise.race` | Кто первый |
| `Promise.any` | Первый **успешный** |

**Важно:** `fetch` не кидает на 404 — проверяй `res.ok`.

## Closures — «функция с памятью»

```js
function createCounter() {
  let count = 0;
  return { inc: () => ++count, get: () => count };
}
```

*Жизнь:* debounce, throttle, React hooks.

## Debounce vs Throttle

**Debounce** — после паузы (поиск в input).  
**Throttle** — не чаще N раз (scroll).

**Hand coding:** `practice/handCoding/debounce.js`, `throttle.js`

---

# DAY 03 — this + Prototypes + JS basics

> Только этот блок — **без** массивов и memory (они с DAY 04).

## this — «кто вызвал»

```js
const user = { name: 'Илья', greet() { console.log(this.name); } };
user.greet(); // 'Илья'
const fn = user.greet;
fn(); // undefined — потеряли контекст
```

**call / apply / bind** — привязать `this`.  
**Arrow** — `this` откуда **написана**, не для методов- callbacks.

## Prototypes

```js
const animal = { eats: true };
const rabbit = { jumps: true };
Object.setPrototypeOf(rabbit, animal);
console.log(rabbit.eats); // true
```

`class` — sugar над прототипами.

## var / let / const

| | var | let | const |
|---|-----|-----|-------|
| Область | функция | блок | блок |
| Hoisting | да | TDZ | TDZ |

## Типы и операторы

**Примитивы** — копия. **Объекты** — ссылка.

- `typeof null === 'object'` — баг языка
- `??` vs `||` — `0` и `''` falsy для `||`

---

# DAY 04 — Функции + массивы

## Виды функций

| Вид | Особенность |
|-----|-------------|
| Declaration | Hoisting |
| Expression | `const fn = function() {}` |
| Arrow | Нет своего `this`, нельзя `new` |

## Массивы

**Мутирующие:** `push`, `splice`, `sort`  
**Немутирующие:** `map`, `filter`, `reduce`, `slice`

```js
[1, 2, 3].map(x => x * 2);
[1, 2, 3].reduce((acc, x) => acc + x, 0);
```

В React — prefer non-mutating.

---

# DAY 05 — Destructuring + строки

```js
const { name, age = 18, ...rest } = user;
const [first, , third] = arr;
const merged = { ...defaults, ...patch };
```

**Строки:** `slice`, `split`, `includes`, template literals — см. `stringsMethods.js`

**Практика:** `practice/tasks-js/findVowels.js`

---

# DAY 06 — Memory + immutability

## Memory leaks

| Причина | Fix |
|---------|-----|
| Listener без remove | cleanup / AbortController |
| setInterval без clear | `clearInterval` |
| Detached DOM | `ref = null` |

**React:** cleanup в `useEffect`.

## Immutability

```js
const next = { ...user, name: 'Петя' };           // shallow
const copy = structuredClone(deepObject);          // deep
```

Не мутируй state: `[...items, newItem]`, не `items.push()`.

---

# DAY 07 — Map/Set + Rendering pipeline

**Map** — словарь, любые ключи. **Set** — уникальные значения.

```js
const unique = [...new Set([1, 1, 2, 3])];
```

## Pipeline — как браузер рисует

```
Parse → Style → Layout → Paint → Composite
```

*База.* Углубление reflow — **DAY 08** (skim) и **DAY 27** (DevTools).

---

# DAY 08 — Reflow / Repaint (база)

→ Полная версия: **`reflowRepaint.md`**

| Шаг | Что | Триггеры |
|-----|-----|----------|
| **Layout (Reflow)** | Геометрия | width, height, DOM insert |
| **Paint** | Цвет, тень | background, color |
| **Composite** | GPU | transform, opacity |

`left` для анимации — дорого. `transform` — дешевле.

**Практика:** `practice/tasks-js/myFilter.js`, `isPalindrome.js`

> `renderingPipeline.js` уже на DAY 07 — **не путай** с reflow-md.

---

# DAY 09 — Hand coding (закрепление)

Без новой теории. Цель:

1. `practice/handCoding/eventEmitter.js` — **без AI**
2. debounce + throttle **из памяти**
3. Сверка → `practice/handCoding/solutions/`

Если забыл теорию — один файл из DAY 01–08, не всю неделю.

---

# DAY 10 — Review недели 1 ★

## Marathon — объясни вслух без файлов

### Блок A — Async (DAY 01–02)
- [ ] Event loop: sync → micro → macro
- [ ] Promise.all vs allSettled vs race
- [ ] Closure + debounce vs throttle

### Блок B — JS core (DAY 03–05)
- [ ] this + bind, prototype chain
- [ ] `??` vs `||`, примитив vs ссылка
- [ ] map / filter / reduce, destructuring

### Блок C — Browser (DAY 06–08)
- [ ] 2 причины memory leak + fix
- [ ] Map vs Object, Set dedupe
- [ ] Layout → Paint → Composite
- [ ] Reflow vs transform

## Hand coding из памяти

debounce · throttle · EventEmitter (on + emit)

## Mock

```bash
node mockInterview/questions.js 10
node mockInterview/questions.js 1-10   # опционально
```

---

## Чеклист «неделя 1–2 закрыта»

- [ ] DAY 01–09 пройдены по `schedule/DAY_XX.md`
- [ ] Marathon DAY 10 — 3 блока вслух
- [ ] Hand coding W1 из памяти или с 1 повтором

**Дальше → `theory/week2/SIMPLE_GUIDE.md` (DAY 11 — TypeScript)**
