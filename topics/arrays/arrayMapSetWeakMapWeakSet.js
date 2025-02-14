//! 1. Map – словарь (ключ-значение)

// Основные методы:
// ✔ set(key, value) – добавляет значение по ключу
// ✔ get(key) – получает значение по ключу
// ✔ has(key) – проверяет наличие ключа
// ✔ delete(key) – удаляет элемент
// ✔ size – количество элементов

let users = new Map();

users.set("Alice", 25);
users.set("Bob", 30);
users.set({ name: "Charlie" }, 40);

console.log(users.get("Alice")); // 25
console.log(users.has("Bob")); // true
console.log(users.size); // 3

//! 2. Set – коллекция уникальных значений

// 📌 Хранит только уникальные элементы, без дубликатов.

// Основные методы:
// ✔ add(value) – добавляет значение
// ✔ has(value) – проверяет наличие
// ✔ delete(value) – удаляет
// ✔ size – количество элементов

let uniqueNumbers = new Set([1, 2, 2, 3, 4, 4]);

console.log(uniqueNumbers); // Set(4) {1, 2, 3, 4}

uniqueNumbers.add(5);
console.log(uniqueNumbers.has(3)); // true

uniqueNumbers.delete(2);
console.log(uniqueNumbers); // Set(4) {1, 3, 4, 5}

//! 3. WeakMap – слабая коллекция ключ-значение

// 📌 Работает как Map, но:
// ✔ Ключи – только объекты
// ✔ Если объект больше не используется, он удаляется сборщиком мусора
// ✔ Нет size, keys(), values(), entries()

let weakUsers = new WeakMap();

let obj = { name: "Alice" };
weakUsers.set(obj, 25);

console.log(weakUsers.get(obj)); // 25

obj = null; // объект удалится из WeakMap при сборке мусора

//! 4. WeakSet – слабая коллекция объектов

// 📌 Работает как Set, но:
// ✔ Хранит только объекты
// ✔ Объекты удаляются сборщиком мусора, если больше не используются
// ✔ Нет size, forEach(), values() и других методов перебора

let weakSet = new WeakSet();

let user = { name: "Bob" };
weakSet.add(user);

console.log(weakSet.has(user)); // true

user = null; // объект удалится
