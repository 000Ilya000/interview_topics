# Неделя 1–2 — JS + Browser (DAY 01–10)

> Читай **до** `.js` файлов — это «перевод» сложных тем на простой язык.  
> Расписание: `schedule/DAY_01` … `DAY_10` · Карта: `schedule/COURSE_MAP.md`  
> Чекбоксы — самопроверка «объясни вслух». На GitHub не кликаются → [Issue «Прогресс»](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

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

Представь дом: HTML — стены и комнаты, CSS — обои и мебель, JS — электрика и умный дом.

### Семантические теги — зачем не только `<div>`

| Тег | Простыми словами | Жизнь |
|-----|------------------|-------|
| `<header>` | Шапка сайта | Логотип, верхнее меню |
| `<nav>` | Блок навигации | Меню ссылок |
| `<main>` | **Главный** контент. **Один** на страницу | Сама статья, не sidebar |
| `<article>` | Самодостаточный блок | Пост в блоге, карточка товара, комментарий |
| `<section>` | Тематический раздел внутри страницы | «Отзывы», «Цены», «О нас» |
| `<aside>` | Боковой контент | Реклама, похожие статьи |
| `<footer>` | Подвал | Копирайт, ссылки |

**На собесе:** `article` можно «вырезать» и вставить на другой сайт — он имеет смысл сам. `section` — часть большой страницы, без контекста может быть пустым.

**Плохо:**
```html
<div class="header">...</div>
<div class="main">...</div>
```

**Хорошо:**
```html
<header>...</header>
<main>...</main>
```

Screen reader и Google понимают структуру. SEO и a11y выигрывают.

### Flex vs Grid

**Flex** — одна линия (ряд **или** колонка):
```css
.navbar {
  display: flex;
  justify-content: space-between; /* по главной оси */
  align-items: center;            /* по поперечной */
  gap: 16px;
}
```
*Жизнь:* кнопки в navbar в один ряд, центрировать иконку, label + input в строку.

**Grid** — таблица (строки **и** колонки):
```css
.catalog {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
```
*Жизнь:* сетка карточек товаров, layout всей страницы (header + sidebar + content).

**Правило:** navbar, кнопки в ряд → flex. Страница целиком, каталог → grid.

### z-index «не работает»

`z-index: 9999` не помог — элемент, скорее всего, в **другом stacking context** (другом «здании»).

Новый stacking context создают: `transform`, `opacity < 1`, `filter`, `position: fixed/sticky` + z-index, иногда `isolation: isolate`.

*Жизнь:* ты на 9-м этаже, сосед на 8-м поставил z-index: 99999 — ты всё равно выше, потому что в другом здании.

### a11y — база (спросят даже на junior+)

- **Semantic HTML** лучше, чем `div` + `role` наугад
- **Tab** — можно пройти всю форму с клавиатуры без мыши
- **Контраст** текста — минимум 4.5:1 (тёмный на светлом)
- **alt** у картинок — что на изображении (декоративная → `alt=""`)
- **label** связан с input через `for` / `htmlFor`

📖 [MDN: Accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility)

### Мета-теги — `metaTags.html`

| Тег | Зачем |
|-----|-------|
| `viewport` | Сайт нормально масштабируется на телефоне |
| `description` | Описание в Google |
| `og:title`, `og:image` | Превью в Telegram/VK/Slack |
| `charset=utf-8` | Кириллица не ломается |

### Как браузер грузит страницу — `browserInternals.js`

Упрощённо:
1. DNS → IP сервера
2. TCP + TLS (HTTPS)
3. HTTP запрос → HTML
4. Parse HTML → DOM
5. CSS → CSSOM → Render Tree
6. Layout → Paint → Composite
7. JS может блокировать parse (если без `defer`/`async`)

**На собесе:** `<script defer>` — не блокирует parse, выполнится после DOM. `<script async>` — скачал → сразу выполнил.

---

## Event Loop — «один кассир в банке»

JS **однопоточный** = один кассир. Две задачи одновременно в одном потоке не выполняет.

```
Call Stack     — текущая работа (sync код)
Microtask Queue — Promise.then, queueMicrotask, await
Macrotask Queue — setTimeout, setInterval, I/O, click
```

**Порядок на каждой «итерации»:**
```
1. Выполнить весь sync код из call stack
2. Выполнить ВСЕ microtasks (пока очередь не опустеет)
3. Выполнить ОДИН macrotask
4. Снова все microtasks → один macrotask → …
```

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// 1 → 4 → 3 → 2
```

**Почему?** `setTimeout(0)` = «талончик на следующий заход к кассиру». Promise = VIP-очередь (microtask), её обслуживают **до** следующего macrotask.

**async/await** — синтаксический сахар над Promise. Каждый `await` = «остановись, результат придёт как microtask».

**На собесе:** «Почему бесконечный `while(true)` заморозит страницу?» — call stack никогда не освободится, microtasks/macrotasks не получат управление.

📖 [Loupe — визуализация event loop](https://latentflip.com/loupe/)

**Файлы:** `browserInternals.js`, `eventLoop.js`

### Чеклист DAY 01

- [ ] article vs section — пример из жизни
- [ ] flex vs grid — когда что
- [ ] Event loop: sync → micro → macro
- [ ] Пример 1,4,3,2 объяснил

---

# DAY 02 — Promises + Closures + Debounce/Throttle

## Promises — «обещание результата»

Три состояния: `pending` → `fulfilled` или `rejected`.

```js
fetch('/api/user')
  .then(res => {
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  })
  .then(user => console.log(user))
  .catch(err => console.error(err))
  .finally(() => console.log('готово — loading off'));
```

**Важно:** `fetch` **не** кидает ошибку на 404/500 — проверяй `res.ok` или `res.status`.

| Метод | Простыми словами | Жизнь |
|-------|------------------|-------|
| `Promise.all` | Все или никто — один reject → весь fail | 3 курьера — один опоздал, заказ отменён |
| `Promise.allSettled` | Все результаты, кто как | Опрос 5 друзей — кто-то не ответил, ок |
| `Promise.race` | Кто первый (успех или fail) | Первый ответивший API |
| `Promise.any` | Первый **успешный** | Зеркало CDN — первое живое |

```js
async function loadUser() {
  try {
    const res = await fetch('/api/user');
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (e) {
    showError(e);
  }
}
```

**Цепочка:** `.then()` возвращает новый Promise — можно строить pipeline.

**Файлы:** `promiseChain.js`, `promiseObject.js`

---

## Closures — «функция с памятью»

Функция «запоминает» переменные из внешней области, даже когда внешняя функция уже завершилась.

```js
function createCounter() {
  let count = 0; // «закрыта» внутри
  return {
    inc: () => ++count,
    get: () => count,
  };
}
const c = createCounter();
c.inc(); // 1
c.inc(); // 2
// count снаружи недоступен — приватный
```

*Жизнь:* банкомат помнит твою сессию. Снаружи не видно внутренний счётчик.

**Где используется:** debounce, throttle, модули (IIFE), React hooks (state «запоминается» между рендерами).

**Ловушка на собесе:**
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3, 3, 3
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0, 1, 2
}
```
`var` — одна переменная на все итерации. `let` — своя на каждую.

**Файл:** `circuitFunction.js`

---

## Debounce vs Throttle

**Debounce** — вызов **после паузы** (reset timer на каждый вызов):
```js
// Поиск: запрос когда перестал печатать 300ms
const onSearch = debounce((q) => fetch(`/api?q=${q}`), 300);
```
*Жизнь:* лифт едет, когда перестали жать кнопку.

**Throttle** — не чаще N раз в интервал:
```js
// Scroll: обработчик max раз в 100ms
const onScroll = throttle(updatePosition, 100);
```
*Жизнь:* лифт — не чаще 1 раза в 2 сек, сколько ни жми.

| | Debounce | Throttle |
|---|----------|----------|
| Когда срабатывает | После паузы | Регулярно по таймеру |
| Use case | Search input, resize end | Scroll, mousemove |

**Hand coding:** `practice/handCoding/debounce.js`, `throttle.js`

**Файл:** `debounceThrottle.js`

### Чеклист DAY 02

- [ ] Promise.all vs allSettled vs race
- [ ] fetch + res.ok
- [ ] Closure — счётчик
- [ ] Debounce vs throttle — use case

---

# DAY 03 — this + Prototypes + JS basics

> Только этот блок. Массивы — DAY 04, memory — DAY 06.

## this — «кто вызвал функцию»

`this` определяется **как вызвали**, не где объявили (кроме arrow).

```js
const user = {
  name: 'Илья',
  greet() { console.log(this.name); }
};
user.greet(); // 'Илья' — user вызвал

const fn = user.greet;
fn(); // undefined (strict) — потеряли контекст
```

**call / apply / bind:**
```js
function sayHi(greeting) { console.log(greeting + ', ' + this.name); }

sayHi.call({ name: 'Аня' }, 'Привет');     // аргументы списком
sayHi.apply({ name: 'Аня' }, ['Привет']);  // аргументы массивом
const bound = sayHi.bind({ name: 'Аня' });
bound('Привет'); // новая функция с навсегда привязанным this
```

**Стрелочная функция** — `this` берётся из **внешней** области (lexical). Не подходит для методов объекта, которые передаёшь как callback без bind.

```js
const obj = {
  name: 'Test',
  regular: function() { console.log(this.name); },
  arrow: () => console.log(this.name), // this = window/undefined
};
```

**Файл:** `this.js`

---

## Prototypes — «цепочка поиска свойства»

```js
const animal = { eats: true };
const rabbit = { jumps: true };
Object.setPrototypeOf(rabbit, animal);

console.log(rabbit.jumps); // true — на rabbit
console.log(rabbit.eats);  // true — нашли на animal
console.log(rabbit.toString); // [Function] — на Object.prototype
```

`class` в JS — **syntactic sugar** над прототипами. `extends` = цепочка prototype.

**На собесе:** «Как JS ищет свойство?» — объект → `__proto__` → … → `null`.

**Файл:** `prototypes.js`

---

## var / let / const

| | var | let | const |
|---|-----|-----|-------|
| Область | функция | блок `{}` | блок |
| Переприсвоить | да | да | нет (ссылку) |
| Hoisting | да, `undefined` | TDZ до строки | TDZ |

```js
const user = { name: 'Илья' };
user.name = 'Петя'; // ✅ объект меняется
// user = {}           // ❌ const — нельзя новую ссылку
```

**TDZ (Temporal Dead Zone)** — нельзя использовать `let`/`const` до строки объявления.

**Файл:** `variables.js`

---

## Типы данных — `dataTypes.js`

**Примитивы** (копия по значению): `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`  
**Объекты** (копия по ссылке): `{}`, `[]`, `function`, `Date`, …

```js
const a = [1, 2];
const b = a;
b.push(3);
console.log(a); // [1, 2, 3] — одна «коробка»
```

**Ловушки на собесе:**
- `typeof null === 'object'` — исторический баг
- `NaN !== NaN` → используй `Number.isNaN(x)`
- `[] == false` → true (приведение типов)
- `??` vs `||` — `0` и `''` falsy для `||`, но валидны для `??`

```js
console.log(0 || 100);  // 100
console.log(0 ?? 100);  // 0
```

**Файлы:** `dataTypes.js`, `operatorsTypes.js`

### Чеклист DAY 03

- [ ] this: regular vs arrow
- [ ] call / bind
- [ ] Prototype chain
- [ ] ?? vs ||
- [ ] Примитив vs ссылка

---

# DAY 04 — Функции + методы массивов

## Виды функций — `functionsTypes.js`

| Вид | Особенность |
|-----|-------------|
| Declaration | Hoisting — можно вызвать до строки |
| Expression | `const fn = function() {}` — hoisting только имени |
| Arrow | Нет своего `this`, `arguments`, нельзя `new` |
| IIFE | `(function(){ ... })()` — изоляция scope |

```js
foo(); // работает
function foo() {}

// bar(); // ReferenceError
const bar = function() {};
```

**Generator / async** — отдельные темы, в курсе optional.

**Файл:** `functionsTypes.js`

---

## Массивы — `arrayMethods.js`

**Мутирующие** (меняют исходный массив): `push`, `pop`, `splice`, `sort`, `reverse`  
**Немутирующие:** `map`, `filter`, `reduce`, `slice`, `concat`, `flat`

```js
const nums = [1, 2, 3];
const doubled = nums.map(x => x * 2);           // [2, 4, 6]
const evens = nums.filter(x => x % 2 === 0);    // [2]
const sum = nums.reduce((acc, x) => acc + x, 0); // 6
```

| Метод | Что делает |
|-------|------------|
| `find` | Первый элемент по условию |
| `findIndex` | Индекс первого |
| `some` | Хотя бы один прошёл |
| `every` | Все прошли |
| `includes` | Есть значение (строгое ===) |

**В React:** не мутируй state — `[...items, newItem]`, не `items.push()`.

**На собесе:** реализуй `map` / `filter` / `reduce` на бумаге.

**Файл:** `arrayMethods.js`

### Чеклист DAY 04

- [ ] Declaration vs arrow — когда arrow нельзя
- [ ] map / filter / reduce с примерами
- [ ] Mutating vs non-mutating

---

# DAY 05 — Destructuring + строки

## Destructuring — `distructure.js`

```js
// Object
const { name, age = 18, ...rest } = user;
// rest = все поля кроме name, age

// Array
const [first, second, ...tail] = [1, 2, 3, 4];
const [, , third] = arr; // пропуск элементов

// Swap
let a = 1, b = 2;
[a, b] = [b, a];

// В параметрах
function printUser({ name, age }) { ... }

// Spread
const merged = { ...defaults, ...patch, id: 1 };
const copyArr = [...arr, newItem];
```

**Rest vs spread** — один синтаксис `...`, разный контекст: собрать vs развернуть.

**Файл:** `distructure.js`

---

## Строки — `stringsMethods.js`

```js
'hello'.slice(1, 3);      // 'el'
'a-b-c'.split('-');       // ['a','b','c']
'hello'.includes('ell');  // true
'  hi  '.trim();
`Hello, ${name}!`;        // template literal
```

**Практика:** `practice/tasks-js/findVowels.js` — перебор строки, filter гласных.

### Чеклист DAY 05

- [ ] destructuring object + array
- [ ] rest vs spread
- [ ] findVowels решил

---

# DAY 06 — Memory leaks + immutability

## Memory leaks — «забыл выключить» — `memoryLeaks.js`

| Причина | Жизнь | Fix |
|---------|-------|-----|
| Listener без remove | Радио включено | `removeEventListener` / AbortController |
| setInterval без clear | Кран капает | `clearInterval` в cleanup |
| WebSocket без close | Звонок не положил | `return () => ws.close()` |
| Closure держит большой объект | Старый снимок экрана в кармане | `ref = null` |
| Detached DOM | Держишь ссылку на удалённый элемент | убрать ссылку |

**React — всегда cleanup:**
```jsx
useEffect(() => {
  const handler = () => { ... };
  window.addEventListener('scroll', handler);
  return () => window.removeEventListener('scroll', handler);
}, []);
```

**Файл:** `memoryLeaks.js`

---

## Immutability — `immutability.js`

React сравнивает state по **ссылке**. Мутация → React может не увидеть изменение (или наоборот — лишние рендеры при новых ссылках везде).

```js
// ❌ мутируем
state.items.push(newItem);
setState(state);

// ✅ новый массив
setState({ ...state, items: [...state.items, newItem] });

// shallow copy
const next = { ...user, name: 'Петя' };

// deep copy
const copy = structuredClone(deepObject);
```

**Shallow copy** — вложенные объекты **общие**. `{ ...obj }` не клонирует `obj.nested` глубоко.

**Файлы:** `immutability.js`, `structuredCloneSomeArrAt.js`

### Чеклист DAY 06

- [ ] 3 причины leak + fix
- [ ] shallow vs deep copy
- [ ] Почему не push в React state

---

# DAY 07 — Map/Set + Rendering pipeline

## Map / Set — `arrayMapSetWeakMapWeakSet.js`

**Map vs Object:**
- Map — ключ **любого типа**, `.size`, частые add/delete
- Object — ключ только string/symbol, prototype pollution

```js
const map = new Map();
map.set(userObj, 'session-123'); // объект как ключ

const unique = [...new Set([1, 1, 2, 3])]; // [1, 2, 3]

// частотный словарь
const freq = new Map();
for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);
```

**WeakMap / WeakSet** — слабые ссылки, GC может собрать ключ. Для кэша DOM без утечек.

**Файл:** `arrayMapSetWeakMapWeakSet.js`

---

## Rendering pipeline — `renderingPipeline.js`

Как браузер превращает HTML/CSS в пиксели:

```
HTML → DOM
CSS  → CSSOM
DOM + CSSOM → Render Tree
→ Layout (Reflow) — размеры и позиции
→ Paint — цвета, тени, текст
→ Composite — слои на GPU (transform, opacity)
```

*Жизнь:* расставить мебель (layout) → покрасить стены (paint) → наклеить стикеры поверх (composite).

**На DAY 08** — что **дорого** и reflow vs transform. **На DAY 27** — DevTools.

**Файл:** `renderingPipeline.js`

### Чеклист DAY 07

- [ ] Map vs Object — когда Map
- [ ] Set dedupe
- [ ] Layout → Paint → Composite

---

# DAY 08 — Reflow / Repaint (база)

→ Подробная версия: **`reflowRepaint.md`**

| Шаг | Что пересчитывает | Триггеры |
|-----|-------------------|----------|
| **Layout (Reflow)** | Геометрия | width, height, font-size, insert DOM |
| **Paint** | Внешний вид | color, background, box-shadow |
| **Composite** | GPU-слои | transform, opacity |

```css
/* ❌ Layout + Paint каждый кадр анимации */
.box { left: 100px; transition: left 0.3s; }

/* ✅ Часто только Composite */
.box { transform: translateX(100px); transition: transform 0.3s; }
```

**Reflow vs Repaint:** изменил `width` → layout (+ возможно paint). Изменил только `color` → paint без layout. `transform` → часто только composite.

> `renderingPipeline.js` уже на DAY 07 — сегодня читаем **`reflowRepaint.md`**, не pipeline повторно.

**Практика:** `practice/tasks-js/myFilter.js`, `isPalindrome.js`

### Чеклист DAY 08

- [ ] reflowRepaint.md прочитал
- [ ] transform vs left — почему
- [ ] 2 tasks решил

---

# DAY 09 — Hand coding (закрепление)

Без новой теории.

## EventEmitter — pub/sub

```js
// Упрощённый API:
emitter.on('event', handler);    // подписка
emitter.emit('event', data);     // вызов всех handlers
emitter.off('event', handler);   // отписка
```

*Жизнь:* подписка на рассылку — отписался, когда ушёл.

**Задача:** `practice/handCoding/eventEmitter.js` — **без AI**  
**Повтор:** debounce + throttle **из памяти** → сверка `solutions/`

Если забыл теорию — **один** файл из таблицы в `schedule/DAY_09.md`.

---

# DAY 10 — Review недели 1 ★

## Marathon — объясни вслух **без файлов** (~45 мин)

### Блок A — Async (DAY 01–02) ~15 мин
- [ ] Event loop: sync → micro → macro — пример 1,4,3,2
- [ ] Promise.all vs allSettled vs race — когда на проекте
- [ ] Closure — счётчик, зачем в debounce
- [ ] Debounce vs throttle — search vs scroll

### Блок B — JS core (DAY 03–05) ~15 мин
- [ ] this: arrow vs regular, bind
- [ ] Prototype chain — как ищет свойство
- [ ] `??` vs `||`, typeof null
- [ ] map / filter / reduce — пример каждого
- [ ] destructuring + spread

### Блок C — Browser (DAY 06–08) ~15 мин
- [ ] 2 memory leak + fix в React
- [ ] Immutability — почему не push
- [ ] Map vs Object, Set dedupe
- [ ] Layout → Paint → Composite
- [ ] Reflow vs transform

## Hand coding из памяти (~15 мин)

debounce · throttle · EventEmitter (`on` + `emit`)

## Mock

```bash
node mockInterview/questions.js 10
node mockInterview/questions.js 1-10   # опционально
```

Запиши **3 слабые темы** — вернёшься перед DAY 21.

---

## Чеклист «неделя 1–2 закрыта»

- [ ] DAY 01–09 по schedule
- [ ] Marathon DAY 10 — 3 блока
- [ ] Hand coding W1

**Дальше → `theory/week2/SIMPLE_GUIDE.md` (DAY 11 — TypeScript)**
