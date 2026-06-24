//принимает число в качестве параметра и выводит в консоль 1 2 fizz(если делится на 3) 4 buzz(если число делится на 5) 15 - fizzbuzz
//fizz - делится на 3
//buzz - делится на 5
//fizzbuzz - делится на 3 и на 5
//если 19 то 1 2 fizz 4 buzz и тд

const fizzBuzz = (num) => {
    for (let i = 1; i <= num; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("fizzbuzz");
        } else if (i % 5 === 0) {
            console.log("buzz");
        } else if (i % 3 === 0) {
            console.log("fizz");
        } else {
            console.log(i);
        }
    }
};

fizzBuzz(19);
