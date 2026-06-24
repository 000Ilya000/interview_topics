//! BROWSER INTERNALS — Event Loop, Call Stack, Queues
//! Типичный вопрос: Почему Promise выполняется раньше setTimeout?

//! ─── Call Stack ─────────────────────────────────────────────────────────────
// LIFO-стек вызовов. Одна задача выполняется до конца.
// Переполнение → RangeError: Maximum call stack size exceeded

function a() { b(); }
function b() { c(); }
function c() { console.log("call stack: a → b → c"); }
a();

//! ─── Event Loop ─────────────────────────────────────────────────────────────
// JS однопоточен. Алгоритм:
// 1. Выполнить весь синхронный код (call stack пуст)
// 2. Выполнить ВСЕ microtasks (до опустошения очереди)
// 3. Выполнить ОДИН macrotask
// 4. (опционально) render, если нужно
// 5. Повторить с шага 2

//! Microtask Queue: Promise.then/catch/finally, queueMicrotask, MutationObserver
//! Macrotask Queue: setTimeout, setInterval, setImmediate (Node), I/O, UI events

console.log("1");

setTimeout(() => console.log("2 — macrotask"), 0);

Promise.resolve().then(() => console.log("3 — microtask"));

console.log("4");
// 1 → 4 → 3 → 2

//! async/await = Promise под капотом → microtask после каждого await
async function foo() {
  console.log("A");
  await Promise.resolve();
  console.log("B"); // microtask
}
console.log("C");
foo();
console.log("D");
// C → A → D → B

//! ─── Node.js vs Browser ─────────────────────────────────────────────────────
// Node: microtasks между каждым macrotask (как браузер)
// Браузер: между macrotasks может произойти rendering (requestAnimationFrame — перед paint)

//! ─── Задача для собеса ──────────────────────────────────────────────────────
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve()
  .then(() => {
    console.log("Promise 1");
    return Promise.resolve("Promise 2");
  })
  .then(console.log)
  .then(() => console.log("Promise 3"));
console.log("End");
// Start → End → Promise 1 → Promise 2 → Promise 3 → Timeout
