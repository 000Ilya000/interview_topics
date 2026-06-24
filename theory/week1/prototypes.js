//! Цепочка прототипов (Prototype Chain)
// Когда мы обращаемся к user.sayHi, движок:
// 	1.	Ищет sayHi в user
// 	2.	Не находит → идёт в user.__proto__
// 	3.	Находит в person → вызывает
// Если не найдёт нигде — будет undefined.

const person = {
    sayHi() {
        console.log("Привет");
    },
};

const user = {
    name: "Илья",
    __proto__: person,
};

user.sayHi(); // "Привет" — унаследовано от person

const proto = Object.getPrototypeOf(user);
console.log(proto === person); // true
_______________________________;

//! Object.create()
// Создание объекта с явным прототипом:

const admin = Object.create(person);
admin.name = "Админ";
admin.sayHi(); // "Привет" — из прототипа person
