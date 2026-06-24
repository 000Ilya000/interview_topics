// написать функцию, которая будет проверять две строки - являются ли они анаграммами - true/false
//анаграмма - friend / finder - те же самые буквы в том же самом колличестве, но в другом порядке

const anagram = (firstString, secondString) => {
    const sortedFunc = (string) => {
        return string.toLowerCase().split("").sort().join("");
    };
    return sortedFunc(firstString) === sortedFunc(secondString);
};

function anagram2(strA, strB) {
    const buildCharObject = (str) => {
        const charObj = {};
        str = str.toLowerCase().replace(/[^\w]/g);
        for (let char of str) {
            charObj[char] = charObj[char] + 1 || 1;
        }

        return charObj;
    };

    const aCharObj = buildCharObject(strA);
    const bCharObj = buildCharObject(strB);

    if (Object.keys(aCharObj).length !== Object.keys(bCharObj).length) {
        return false;
    }

    for (let char in aCharObj) {
        if (aCharObj[char] !== bCharObj[char]) {
            return false;
        }
    }
    return true;
}

console.log(anagram("frienddd", "Finddder")); // true
console.log(anagram("hello", "bye")); // false
