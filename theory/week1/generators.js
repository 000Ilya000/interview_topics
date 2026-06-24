//! GENERATORS — function* и yield
//! На senior спрашивают реже, но показывает глубину понимания async

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2

//! yield приостанавливает выполнение, возвращает { value, done }
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (const n of range(1, 3)) {
  console.log(n); // 1, 2, 3
}

//! Передача значения в generator через next(value)
function* accumulator() {
  let sum = 0;
  while (true) {
    const val = yield sum;
    if (val != null) sum += val;
  }
}

const acc = accumulator();
acc.next(); // { value: 0, done: false }
acc.next(5); // { value: 5, done: false }
acc.next(10); // { value: 15, done: false }

//! async generators — for await...of
async function* fetchPages(urls) {
  for (const url of urls) {
    const res = await fetch(url);
    yield res.json();
  }
}

//! Связь с Event Loop: yield отдаёт управление, но это НЕ microtask
//! Для lazy iteration больших данных без загрузки всего в память
