// принимает число и на выходе должно вернуть true или false в зависимости от того - является ли число простым или нет
// (простое число - больше 1 и оно делится всего лишь либо на себя либо на 1 (4 - не простое(делится на 2), 3 - простое))
const ispRIME = (num) => {
    const sqrt = Math.sqrt(num);
    for (let i = 2; i <= sqrt; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return num > 1;
};

// принимает 1 аргумент - число до которого нужно найти все простые числа которые есть (массив со всеми просытми числами)
const getPrime = (finalNum) => {
    let result = [];
    for (let i = 2; i <= finalNum; i++) {
        if (ispRIME(i)) {
            result.push(i);
        }
    }
    return result;
};

//вариант решито
const getPrime2 = (finalNum) => {
    const seive = [];
    const primes = [];

    for (i = 2; i <= finalNum; i++) {
        if (!seive[i]) {
            primes.push(i);
            for (let j = i * i; j <= num; j += i) {
                seive[j] = true;
            }
        }
    }

    return primes;
};

// ________________________________________________;

// простые
2;
3;
5;
7;
13;
17;
19;
23;
29;

// не простые
4;
6;
8;
9;
10;
12;
14;
15;

console.log(getPrime(10));
