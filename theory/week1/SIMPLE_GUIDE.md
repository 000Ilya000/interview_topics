# Неделя 1 — простым языком (DAY 01–05)

> Читай **до** `.js` файлов. Одна неделя = HTML/CSS + весь базовый JS + браузер.  
> Расписание: `schedule/DAY_01` … `DAY_05`  
> Чекбоксы ниже: самопроверка. На GitHub не кликаются → [Issue «Прогресс»](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md) или Obsidian.

---

# DAY 01 — HTML/CSS + Event Loop

## HTML — «скелет страницы»

Сайт = **структура** (HTML) + **вид** (CSS) + **поведение** (JS).

### Семантические теги — зачем не только `<div>`

| Тег | Простыми словами | Жизнь |
|-----|------------------|-------|
| `<header>` | Шапка | Логотип, верхнее меню |
| `<nav>` | Навигация | Меню ссылок |
| `<main>` | **Главный** контент. **Один** на страницу | Сама статья, не sidebar |
| `<article>` | Самодостаточный блок | Пост, карточка товара, комментарий |
| `<section>` | Тематический раздел | «Отзывы», «Цены», «О нас» |
| `<aside>` | Боковой контент | Реклама, похожие статьи |
| `<footer>` | Подвал | Копирайт, ссылки |

**На собесе:** `article` можно «вырезать» и он имеет смысл сам. `section` — часть большой страницы.

### Flex vs Grid

**Flex** — одна линия (ряд **или** колонка):
```css
.navbar {
  display: flex;
  justify-content: space-between; /* по горизонтали */
  align-items: center;            /* по вертикали */
  gap: 16px;
}
```
*Жизнь:* кнопки в navbar, центрировать иконку, выровнять label + input.

**Grid** — таблица (строки **и** колонки):
```css
.catalog {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
```
*Жизнь:* сетка карточек товаров, layout всей страницы.

**Правило:** navbar → flex. Страница целиком → grid.

### z-index «не работает»

`z-index: 9999` не помог — скорее всего элемент в **другом stacking context** (другом «здании»).

Создаёт новое здание: `transform`, `opacity < 1`, `filter`, `position + z-index`.

### a11y — база (спросят в начале)

- **Semantic HTML** лучше, чем `div` + `role` наугад
- **Tab** — можно пройти всю форму с клавиатуры
- **Контраст** текста — минимум 4.5:1 (тёмный текст на светлом фоне)
- **alt** у картинок — что на изображении

📖 [MDN: Accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility)

### Мета-теги — `metaTags.html`

| Тег | Зачем |
|-----|-------|
| `viewport` | Сайт нормально на телефоне |
| `description` | Описание в Google |
| `og:title`, `og:image` | Превью в Telegram/VK |

---

## Event Loop — «один кассир в банке»

JS **однопоточный** = один кассир. Две задачи одновременно не выполняет.

```
1. Синхронный код (всё подряд в файле)
2. ВСЕ microtasks (Promise, await)
3. ОДИН macrotask (setTimeout, click)
4. Снова microtasks → macrotask → …
```

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// 1 → 4 → 3 → 2
```

**Почему?** `setTimeout(0)` = «талончик на следующий заход». Promise = VIP-очередь.

**async/await** — синтаксический сахар над Promise. Каждый `await` = microtask.

📖 [Loupe — визуализация event loop](https://latentflip.com/loupe/)

**Файлы:** `browserInternals.js`, `eventLoop.js`

---

# DAY 02 — Promises + Closures + Debounce

## Promises — «обещание результата»

```js
fetch('/api/user')
  .then(res => {
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  })
  .then(user => console.log(user))
  .catch(err => console.error(err))
  .finally(() => console.log('готово'));
```

**Важно:** `fetch` **не** кидает ошибку на 404 — проверяй `res.ok`.

| Метод | Простыми словами | Жизнь |
|-------|------------------|-------|
| `Promise.all` | Все или никто | 3 курьера — один опоздал, заказ отменён |
| `Promise.allSettled` | Все результаты, кто как | Опрос 5 друзей — кто-то не ответил, ок |
| `Promise.race` | Кто первый | Первый ответивший API |
| `Promise.any` | Первый **успешный** | Зеркало CDN — первое живое |

**async/await** — читается как sync, но не блокирует UI:
```js
async function loadUser() {
  try {
    const res = await fetch('/api/user');
    const user = await res.json();
    return user;
  } catch (e) {
    showError(e);
  }
}
```

**Файлы:** `promiseChain.js`, `promiseObject.js`

---

## Closures — «функция с памятью»

```js
function createCounter() {
  let count = 0;
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

*Жизнь:* банкомат помнит сессию. Снаружи не видно внутренний счётчик.

**Где используется:** debounce, throttle, модули, React hooks (state «запоминается» между рендерами).

**Ловушка на собесе:** `var` в цикле — одна переменная. `let` — своя на каждую итерацию.

**Файл:** `circuitFunction.js`

---

## Debounce vs Throttle

**Debounce** — вызов **после паузы**:
```js
// Поиск: запрос когда перестал печатать 300ms
const onSearch = debounce((q) => fetch(`/api?q=${q}`), 300);
```
*Жизнь:* лифт едет, когда перестали жать кнопку.

**Throttle** — не чаще N раз:
```js
// Scroll: обработчик max раз в 100ms
const onScroll = throttle(updatePosition, 100);
```
*Жизнь:* лифт — не чаще 1 раза в 2 сек, сколько ни жми.

**Hand coding:** `practice/handCoding/debounce.js`, `throttle.js`

**Файл:** `debounceThrottle.js`

---

# DAY 03 — this + Prototypes + JS basics

## this — «кто вызвал»

```js
const user = {
  name: 'Илья',
  greet() { console.log(this.name); }
};
user.greet(); // 'Иlya'

const fn = user.greet;
fn(); // undefined — потеряли контекст
```

**call / apply / bind:**
```js
function sayHi() { console.log('Привет, ' + this.name); }
sayHi.call({ name: 'Аня' });        // call — аргументы списком
sayHi.apply({ name: 'Аня' });       // apply — аргументы массивом
const bound = sayHi.bind({ name: 'Аня' }); // bind — новая функция
bound();
```

**Стрелочная функция** — `this` откуда **написана**, не откуда вызвана. Не подходит для методов объекта, которые передаёшь как callback.

**Файл:** `this.js`

---

## Prototypes — «цепочка наследования»

```js
const animal = { eats: true };
const rabbit = { jumps: true };
rabbit.__proto__ = animal; // или Object.setPrototypeOf
console.log(rabbit.eats); // true — нашли в animal
```

`class` в JS — **сugar** над прототипами. Под капотом то же самое.

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
// user = {}           // ❌ const
```

**Файл:** `variables.js`

---

## Типы данных

**Примитивы** (копия): `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`  
**Объекты** (ссылка): `{}`, `[]`, функции

```js
const a = [1, 2];
const b = a;
b.push(3);
console.log(a); // [1,2,3] — одна «коробка»
```

**Ловушки:**
- `typeof null === 'object'` — баг языка
- `NaN !== NaN` → `Number.isNaN(x)`
- `??` vs `||` — `0` и `''` falsy для `||`, но валидны для `??`

**Файлы:** `dataTypes.js`, `operatorsTypes.js`

---

## Функции

| Вид | Особенность |
|-----|-------------|
| Declaration | Hoisting целиком |
| Expression | `const fn = function() {}` |
| Arrow | Нет своего `this`, нельзя `new` |
| IIFE | `(function(){})()` — изоляция scope |

**Файл:** `functionsTypes.js`

---

## Массивы

**Мутирующие** (меняют исходный): `push`, `pop`, `splice`, `sort`, `reverse`  
**Немутирующие:** `map`, `filter`, `reduce`, `slice`, `concat`

```js
const doubled = [1, 2, 3].map(x => x * 2); // [2,4,6]
const sum = [1, 2, 3].reduce((acc, x) => acc + x, 0); // 6
```

**some** — хотя бы один прошёл тест. **every** — все прошли.

**Файлы:** `arrayMethods.js`

---

## Деструктуризация

```js
const { name, age = 18, ...rest } = user;
const [first, , third] = arr;
```

**Файл:** `distructure.js`

---

# DAY 04 — Memory + Reflow + Collections

## Memory leaks — «забыл выключить»

| Причина | Жизнь | Fix |
|---------|-------|-----|
| Listener без remove | Радио включено | `removeEventListener` / AbortController |
| setInterval без clear | Кран капает | `clearInterval` в cleanup |
| WebSocket без close | Звонок не положил | `return () => ws.close()` |
| Detached DOM | Держишь ссылку на удалённый элемент | `ref = null` |

**React:** всегда cleanup в `useEffect`:
```jsx
useEffect(() => {
  window.addEventListener('scroll', handler);
  return () => window.removeEventListener('scroll', handler);
}, []);
```

**Файл:** `memoryLeaks.js`

---

## Reflow / Paint / Composite — база

1. **Layout (Reflow)** — переставить мебель (width, height)
2. **Paint** — перекрасить стены (color)
3. **Composite** — сдвинуть наклейку на GPU (transform, opacity)

`left/top` для анимации = дорого. `transform` = дёшево.

*Senior углубление:* DAY 16, `reflowRepaint.md`

**Файл:** `renderingPipeline.js`

---

## Map / Set / WeakMap / WeakSet

**Map** — словарь, любые ключи, `.size`  
*Жизнь:* телефонная книга с быстрым поиском.

**Set** — уникальные значения  
*Жизнь:* список гостей без дубликатов.

```js
const unique = [...new Set([1, 1, 2, 3])]; // [1, 2, 3]
```

**WeakMap/WeakSet** — слабые ссылки, GC может собрать. Для кэша DOM без утечек.

**Файл:** `arrayMapSetWeakMapWeakSet.js`

---

## Иммутабельность

```js
const next = { ...user, name: 'Петя' };        // shallow copy
const copy = structuredClone(deepObject);       // deep copy
Object.freeze(obj);                             // shallow readonly
```

React: не мутируй state — `{ ...state, items: [...state.items, newItem] }`

**Файлы:** `immutability.js`, `structuredCloneSomeArrAt.js`

---

# DAY 05 — Повторение + EventEmitter

## EventEmitter — паттерн pub/sub

```js
// Упрощённо:
emitter.on('click', handler);
emitter.emit('click', data);
emitter.off('click', handler);
```

*Жизнь:* подписка на рассылку — отписался, когда ушёл.

**Hand coding:** `practice/handCoding/eventEmitter.js`

---

## Чеклист недели 1 — объясни вслух

- [ ] article vs section, flex vs grid
- [ ] Event loop: sync → micro → macro
- [ ] Promise.all vs allSettled
- [ ] Closure + debounce vs throttle
- [ ] this + call/bind
- [ ] Примитив vs ссылка, ?? vs ||
- [ ] Mutating vs non-mutating arrays
- [ ] Memory leak + useEffect cleanup
- [ ] Reflow vs repaint одним предложением

**Mock:** `node mockInterview/questions.js 1` … `5`

---

## Все файлы недели 1

| DAY | Темы | Файлы |
|-----|------|-------|
| 01 | HTML, event loop | `htmlCssA11y.js`, `metaTags.html`, `browserInternals.js`, `eventLoop.js` |
| 02 | Promises, closures, debounce | `promiseChain.js`, `promiseObject.js`, `circuitFunction.js`, `debounceThrottle.js` |
| 03 | this, prototypes, basics | `this.js`, `prototypes.js`, `variables.js`, `functionsTypes.js`, `dataTypes.js`, `operatorsTypes.js`, `arrayMethods.js`, `distructure.js` |
| 04 | Memory, reflow, Map/Set | `memoryLeaks.js`, `renderingPipeline.js`, `arrayMapSetWeakMapWeakSet.js`, `immutability.js` |
| 05 | Review, EventEmitter | `handCoding/eventEmitter.js`, переписать debounce/throttle |
