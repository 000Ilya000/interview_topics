function replaceSubstring(str, search, replace) {
    return str.split(search).join(replace);
}

console.log(replaceSubstring("hello world", "world", "there")); // Вывод "hello there"
console.log(replaceSubstring("hello world", "hello", "goodbye")); // Вывод "goodbye world"
