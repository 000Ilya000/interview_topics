//! Type Guard — это логическая проверка, которая уточняет тип переменной внутри блока кода
// 📦 Пример без Type Guard:
function logLength(value: string | string[]) {
    // Ошибка! value может быть строкой или массивом
    console.log(value.length);
}
// ✅ С Type Guard:
function logLength2(value: string | string[]) {
    if (typeof value === "string") {
        console.log(value.length); // string
    } else {
        console.log(value.length); // string[]
    }
}

//! 1. typeof — для примитивов
function handle(value: string | number) {
    if (typeof value === "string") {
        console.log(value.toUpperCase()); // string
    }
}

//! 2. instanceof — для классов
class User {
    name = "Илья";
}

function print(obj: User | Date) {
    if (obj instanceof Date) {
        console.log(obj.getFullYear());
    } else {
        console.log(obj.name);
    }
}

//! 3. Проверка через "key" in
type Admin = { role: string };
type Guest = { expiresAt: Date };

function showUser(user: Admin | Guest) {
    if ("role" in user) {
        console.log("Админ:", user.role);
    } else {
        console.log("Гость до:", user.expiresAt);
    }
}

//! 4. Пользовательские type guards (is)
type Cat = { meow: () => void };
type Dog = { bark: () => void };

function isCat(animal: Cat | Dog): animal is Cat {
    return "meow" in animal;
}


function handle2(animal: Cat | Dog) {
    if (isCat(animal)) {
        animal.meow(); // теперь TS знает — это Cat
    } else {
        animal.bark();
    }
}

