//! JavaScript - однопоточный язык (в стеке выполняется только 1 задача)
function firstFunction() {
  console.log("1");
  console.log("2");
}

function secondFunction() {
  console.log("3");
  firstFunction();
}

secondFunction();
//* 3 2 1
_________________;

//! сначала выполняется весь синхронный код, потом идет выполнение микротасков, потом выполнение макротасков(как все микротаски выполнятся)
_________________;

//! Микротаски: Это задачи, которые выполняются сразу после завершения текущего стека вызовов и перед следующей макротаской.
//! Они включают обработчики промисов и функции, добавленные с помощью queueMicrotask.

//! Макротаски: Это задачи, которые выполняются по одной после всех микротасков.
//! Примеры включают таймеры (setTimeout, setInterval) и обработчики событий + браузерное API.

console.log("Начало"); //! синхронный код

setTimeout(() => {
  console.log("Макрозадача выполнена");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("Микрозадача выполнена");
  })
  .then(() => {
    console.log("Микрозадача выполнена 2");
  });

console.log("Конец"); //! синхронный код

//* Начало Конец Микрозадача выполнена Микрозадача выполнена 2 Макрозадача выполнена

//! async await - оборачивает внутреннюю функцию в некий промис (микротаска)

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchData() {
  console.log("Запрос данныйх...");

  // Ожидание ответа
  await delay(2000);

  console.log("Данные получены!");
  return { data: "ПРимер данных" };
}

fetchData()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

//! Пример задач
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");
//* A D C B
____________________________;

setTimeout(() => {
  console.log("1");
}, 0);

Promise.resolve().then(() => {
  console.log("2");
  setTimeout(() => {
    console.log("3");
  }, 0);
});

console.log("4");
//* 4 2 1 3
____________________________;

async function foo() {
  console.log("A");
  await bar();
  console.log("B");
}

async function bar() {
  console.log("C");
}

console.log("D");
foo();
console.log("E");

//* D A C E B
_________________;

async function alpha() {
  console.log("1");
  await beta();
  console.log("2");
}

async function beta() {
  console.log("3");
  setTimeout(() => {
    console.log("4");
  }, 0);
}

console.log("Start");
alpha();
console.log("End");
//* Start 1 3 End 2 4

console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("C");
  })
  .then(() => {
    console.log("D");
  });

setTimeout(() => {
  console.log("E");
}, 0);

console.log("F");

//* A F C D B E

console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("Promise 1");
    return Promise.resolve("Promise 2");
  })
  .then((result) => {
    console.log(result);
  })
  .then(() => {
    console.log("Promise 3");
  });

setTimeout(() => {
  console.log("Timeout 2");
}, 0);

console.log("End");

//* Start End Promise 1 Promise 2 Promise 3 Timeout 1 Timeout 2
