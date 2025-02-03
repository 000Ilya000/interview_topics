//! push, pop, shift, unshift - МУТИРУЮЩИЕ
// --push - добавляет элементы в конец массива
// --pop - удаляет и возвращает последний элемент из массива
// --shift - удаляет первое значение массива и возвращает его новое значение
// --unshift - добавляет значение в начало массива и возвращает его новую длину

//! НЕМУТИРУЮЩИЕ
const persons = [
  { name: "Илья", age: 21 },
  { name: "Миша", age: 16 },
  { name: "Антон", age: 32 },
  { name: "Дима", age: 41 },
  { name: "Алексей", age: 26 },
];

//! ForEach
// persons.forEach(function (person, index, pArr) {
//   console.log(person);
//   console.log(index);
//   console.log(pArr);
// });

persons.forEach((person) => console.log(person));

//! Map
const newPeople = persons.map((person) => {
  return person.name;
});
console.log(newPeople);

//! Filter
// const adults = [];
// for (let i = 0; i < persons.length; i++) {
//   if (persons[i].age >= 18) {
//     adults.push(persons[i]);
//   }
// }
// console.log(adults);

const adults = persons.filter((person) => person.age >= 18);

console.log(adults);

//! Reduce
//* Сумма всех возростов
// let ammount = 0;
// for (let i = 0; i < persons.length; i++) {
//   ammount += persons[i].age;
// }
// console.log(ammount);

const amount = persons.reduce((total, person) => total + person.age, 0);
console.log(amount);

//!Find
const Ilya = persons.find((person) => person.name === "Илья");
console.log(Ilya);

//!FindIndex
const IlyaIndex = persons.findIndex((person) => person.name === "Илья");
console.log(IlyaIndex);
