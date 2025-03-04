// Определяем массив, который содержит числа и вложенные массивы
const array = [1, 1, [1, [1, 2], 1], [1]];

// Функция для вычисления суммы элементов массива
const sum = (arr) => {
    // Инициализируем переменную total для хранения суммы
    let total = 0;

    // Проходим по каждому элементу массива arr
    arr.forEach((item) => {
        // Проверяем, является ли элемент массивом
        if (Array.isArray(item)) {
            // Если элемент - массив, рекурсивно вызываем функцию sum для этого массива
            total += sum(item);
        } else {
            // Если элемент - не массив (число), добавляем его к total
            total += item;
        }
    });

    // Возвращаем общую сумму
    return total;
};

// Вызываем функцию sum с нашим массивом и выводим результат в консоль
// console.log(sum(array)); // Ожидаемый результат: 6

// console.log("Request data...");

// setTimeout(() => {
//   console.log("Preparing data...");
//   const backendData = {
//     server: "aws",
//     port: 2000,
//     status: "working",
//   };

//   setTimeout(() => {
//     backendData.modified = true;
//     console.log("Data received", backendData);
//   }, 2000);
// }, 2000);

const p = new Promise(function (resolve, reject) {
    setTimeout(() => {
        // console.log("Preparing data...");
        const backendData = {
            server: "aws",
            port: 2000,
            status: "working",
        };
        resolve(backendData);
    }, 2000);
});

p.then((data) => {
    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            data.modified = true;
            resolve(data);
            // console.log("Data received", backendData);
        }, 2000);
    });

    p2.then((clientData) => {
        // console.log("Data received", clientData);
    });
});

// Strat End Promise 1 Promise 2 Timeout 1 Timeout 2

// console.log("Start");

// setTimeout(() => {
//     console.log("Timeout 1");
// }, 0);

// Promise.resolve().then(() => {
//     console.log("Promise 1");
// });

// setTimeout(() => {
//     console.log("Timeout 2");
// }, 0);

// Promise.resolve().then(() => {
//     console.log("Promise 2");
// });

// console.log("End");

// console.log("A");

// setTimeout(() => {
//     console.log("B");
// }, 0);

// async function asyncFunction() {
//     console.log("C");
//     return "D";
// }

// asyncFunction().then((res) => console.log(res));

// console.log("E");

// //! A C E D B

// console.log("1");

// setTimeout(() => {
//     console.log("2");
// }, 0);

// Promise.resolve()
//     .then(() => {
//         console.log("3");
//     })
//     .then(() => {
//         console.log("4");
//     });

// setTimeout(() => {
//     console.log("5");
// }, 0);

// console.log("6");

// 1 6 3 4 2 5

const outerFunction = () => {
    const innerFunction = () => {
        const localVar = "Я локальная переменная";
        return localVar;
    };
    return innerFunction();
};

// console.log(outerFunction());

// console.log(undefined && 1);

const a = { a: "a" };
const b = { b: "b" };
const c = {};

c[a] = a;
c[b] = b;

// console.log(c[a].a, c[b].b);

function testScope(a, b) {
    var c = 10; // Область видимости var - функция
    let d = 20; // Область видимости let - блок
    const e = 30; // Область видимости const - блок

    function innerFunction() {
        // console.log(a, b, c, d, e); // Что будет выведено?
    }

    innerFunction();
}

testScope(1, 2);

const findFirstTrue = (arg1, arg2) => {
    if (!arg1 && !arg2) {
        return "default";
    }
    return arg1 || arg2;
};

function makeCounter() {
    let a = 0;
    return function () {
        return (a += 1);
    };
}

const count = makeCounter();

const input = [
    { value: "bnms", order: 8, expired: false },
    { value: "abcd", order: 4, expired: false },
    { value: "qwer", order: 2, expired: true },
    { value: "amvd", order: 3, expired: false },
];

//результат - это строка из соединенных value, расположенном в обратном порядке символов
//результат в порядке возрастания order и только expired false
//результат не содержит одинаковых символов

const convertedInput = (arr) => {
    let result = [];
    const firstArr = arr.filter((item) => !item.expired);
    for (let i = 0; i < firstArr.length; i++) {
        if (firstArr[i + 1] && firstArr[i].order > firstArr[i + 1].order) {
            result = firstArr[i].value.split("").reverse().join("") + result;
        }
    }
    console.log(result);

    return new Set(result).join("");
};

convertedInput(input);
