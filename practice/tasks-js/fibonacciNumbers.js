// каждое новое число - последовательность суммы двух предыдущих чисел

const fibonacci = (num) => {
    const result = [0, 1];

    for (let i = 2; i <= num; i++) {
        const prevNum1 = result[i - 1];
        const prevNum2 = result[i - 2];

        result.push(prevNum1 + prevNum2);
    }

    return result[num];
};

const fibonacciShort = (num) => {
    let a = 1,
        b = 1;
    for (let i = 3; i <= num; i++) {
        let c = a + b;
        a = b;
        b = c;
    }
    return b;
};

//решение с рекурсией (медленное)
function fibonacci2(num) {
    if (num < 2) {
        return num;
    }
    return fibonacci(num - 1) + fibonacci(num - 2);
}

console.log(fibonacci2(7));
