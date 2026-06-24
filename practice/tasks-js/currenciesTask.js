const input = [
    ["usd", "buy", 10000],
    ["usd", "sell", 5000],
    ["gbp", "buy", 9000],
    ["eur", "sell", 7000],
    ["usd", "sell", 25000],
];

const output = {
    usd: [10000, 30000],
    gbp: [9000, 0],
    eur: [0, 7000],
};

const calcTransactions = (startArr) => {
    const resultOutput = {};

    for (let i = 0; i < startArr.length; i++) {
        const current = startArr[i];
        const currency = current[0]; // Вынесено в отдельную переменную для читаемости

        // Инициализация, если валюты ещё нет в объекте
        if (!resultOutput[currency]) {
            resultOutput[currency] = [0, 0];
        }

        if (current[1] === "buy") {
            resultOutput[currency][0] += current[2]; // Суммируем покупки
        } else {
            resultOutput[currency][1] += current[2]; // Суммируем продажи
        }
    }

    return resultOutput; // Функция должна возвращать объект, а не просто выводить его в консоль
};

console.log(calcTransactions(input)); // Убрано лишнее console.log внутри функции
