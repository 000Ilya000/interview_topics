//! structuredClone()
// --Метод structuredClone() создаёт глубокую копию объекта или массива.
// • Поддерживает даты, Map, Set, File, Blob, ArrayBuffer и циклические структуры.
// • Не теряет undefined и NaN.
// • Поддерживает функции.
let obj = {
    name: "Ilya",
    details: { age: 25 },
};

let copy = structuredClone(obj);
copy.details.age = 30;

console.log(obj.details.age); // 25 (исходный объект не изменился)
console.log(copy.details.age); // 30 (изменение только в копии)

//*🔹 Аналог с JSON.stringify() ломается на undefined, функциях и Map:
let obj1 = { a: undefined, b: () => {}, c: new Map() };
console.log(JSON.parse(JSON.stringify(obj1))); // { c: {} } (а и b пропали!)
console.log(structuredClone(obj1)); // { a: undefined, b: undefined, c: Map(0) {} }

//! .at(index)
// --Метод .at(index) позволяет удобно получать элементы по индексу, включая отрицательные значения (от конца массива).
let arr = [10, 20, 30];
console.log(arr[0]); // 10
console.log(arr.at(0)); // 10 (то же самое)

//* Главное отличие: поддержка отрицательных индексов!
console.log(arr[arr.length - 1]); // 30 (старый способ)
console.log(arr.at(-1)); // 30 (новый удобный способ)
