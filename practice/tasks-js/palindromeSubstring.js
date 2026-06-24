const input = "babad"; // Output: 'bab' | 'aba'
const input2 = "cbbd"; // Output: 'bb'
const input3 = "mississippi"; // Output: 'ississi'
const input4 = "ac"; // Output: 'a' | 'c'

const longestPalindrome = (s) => {
    if (s.length < 2) return s;

    let start = 0;
    let maxLength = 1;

    const expandAroundCenter = (left, right) => {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const currentLength = right - left + 1;
            if (currentLength > maxLength) {
                maxLength = currentLength;
                start = left;
            }
            left--;
            right++;
        }
    };

    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i); // Нечётный палиндром
        expandAroundCenter(i, i + 1); // Чётный палиндром
    }

    return s.slice(start, start + maxLength);
};

console.log(longestPalindrome(input));
console.log(longestPalindrome(input2));
console.log(longestPalindrome(input3));
console.log(longestPalindrome(input4));
