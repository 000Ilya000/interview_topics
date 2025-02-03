//! Замыкание -  достигается за счет сохранения контекста, в котором была создана внутренняя функция.

//! Пример 1
function outerFunction() {
  let outerVariable = "Я снаружи!";

  function innerFunction() {
    console.log(outerVariable); // Доступ к переменной внешней функции
  }

  return innerFunction;
}

const inner = outerFunction();
inner(); // Выведет: Я снаружи!

//! Пример 2
function createFunctions() {
  let functions = [];

  for (let i = 0; i < 3; i++) {
    functions[i] = function () {
      console.log(i);
    };
  }

  return functions;
}

const funcs = createFunctions();
funcs[0](); // Выведет: 0
funcs[1](); // Выведет: 1
funcs[2](); // Выведет: 2

//! Задачки
function createCounter() {
  let count = 0; // Приватная переменная для хранения значения счетчика
  return {
    increment: function () {
      count++; // Увеличиваем счетчик на 1
      return count; // Возвращаем текущее значение
    },
    decrement: function () {
      count--; // Уменьшаем счетчик на 1
      return count; // Возвращаем текущее значение
    },
    getCount: function () {
      return count; // Возвращаем текущее значение счетчика
    },
  };
}
const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2
console.log(counter.decrement()); // 1

const delayLog = (message, delay) => {
  return () => {
    setTimeout(() => {
      console.log(message);
    }, delay);
  };
};

const logHello = delayLog("Привет!", 2000);
logHello(); // Выведет "Привет!" через 2 секунды
