// function isPalindrome(str) {
//     const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
//     return cleaned === cleaned.split("").reverse().join("");
// }

// function isPalindrome(str) {
//     const cleanedString = str.toLowerCase().replace(/\s/g, "");
//     const reversedStr = cleanedString.split("").reverse().join("");
//     return cleanedString === reversedStr;
// }

function isPalindrome(str) {
    const len = Math.floor(str.length / 2);
    for (let i = 0; i < len; i++) {
        if (str[i] !== str[str.length - i - 1]) {
            return false;
        }
        return true;
    }
}

// const isPalindrome2 = (s) => {
//     resultStr = s.trim().toLowerCase().replaceAll(" ", "");
//     let left = 0;
//     let right = resultStr.length - 1;
//     while (left < right) {
//         if (resultStr[left] !== resultStr[right]) return false;
//         left++;
//         right--;
//     }
//     return true;
// };

console.log(isPalindrome2("А роза упала на лапу Азора")); //Вывод true
console.log(isPalindrome2("racecar")); // true
console.log(isPalindrome2("table")); // false
console.log(isPalindrome2("hello")); //Вывод false
