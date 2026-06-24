// написать функцию, которая возвращает число - сколько гласных существует в строке

const findVowels = (startString) => {
    let vowelsCount = 0;
    for (let char of startString.toLowerCase()) {
        if (["a", "e", "i", "o", "u"].includes(char)) {
            vowelsCount++;
        }
    }
    return vowelsCount;
};

function findVowels2(str) {
    const matched = str.match(/[aeiou]/gi);
    return matched ? matched.length : 0;
}

console.log(findVowels("heLlo")); // 2
console.log(findVowels("why")); // 0
