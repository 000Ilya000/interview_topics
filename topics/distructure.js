//! Диструктуризация с массивами
function clacValues(a, b) {
  return [a + b, undefined, a * b, a / b];
}

const [sum, sub = "Вычитания нет", mult, ...other] = clacValues(42, 10);
console.log(sum, mult, other, sub);

//! Диструктуризация с объектами
const persone = {
  name: "Max",
  age: 20,
  adress: {
    country: "Russia",
    city: "Moscow",
  },
};

// const {
//   name: firstName = "Без имени",
//   age,
//   car = "Машины нет",
//   adress: { city: homeTown, country },
// } = persone;

const { name, ...info } = persone;
// console.log(firstName, age, car, homeTown);
console.log(name, info);

//! Практика
function logPerson({ name, age }) {
  console.log(name + "" + age);
}

logPerson(persone);
