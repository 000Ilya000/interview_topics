//! Примитивные
// 1)Number
    let x = 42;
    let y = 3.14;
// 2)String  
    let greeting = "Привет, мир!";
    let name = 'Иван';
// 3)Boolean
    let isJavaScriptFun = true;
    let isOlderThan18 = false;
// 4)Undefined
    let xe;
    console.log(xe);  // undefined
// 5)Null
    let ye = null;
// 6)Symbol - es6 - Символы предназначены для создания уникальных идентификаторов
    let sym1 = Symbol('description');
    let sym2 = Symbol('description');
    console.log(sym1 === sym2);  // false, символы уникальны
// 7)BigInt
    let bigNumber = 1234567890123456789012345678901234567890n;
    console.log(bigNumber);  // 1234567890123456789012345678901234567890n
__
//! Объекты (ссылочные типы данных)
// 1)Object
    let person = {
        name: "Иван",
        age: 30,
        isEmployed: true
    };
// 2)Array
    let fruits = ["яблоко", "банан", "киви"];
// 3)Функции
    function greet(name) {
        return "Привет, " + name;
    }
// 4)Date
    let currentDate = new Date();
    console.log(currentDate);  // текущая дата и время
// 5)RegExp (Регулярные выражения)
    let pattern = /abc/;
    let result = pattern.test("abcdef");
    console.log(result);  // true