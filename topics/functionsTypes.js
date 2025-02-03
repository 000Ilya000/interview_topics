//! Function Decloration
//! Можем вызвать ее даже до ее создания (происходит всплытие функций)
function calculateSCircle(radius) {
  const area = 3.14 * radius ** 2;
  return area;
}

console.log(calculateSCircle(5));

//! Function Expression
//! Если создаем функцию таким образом - мы не можем вызвать ее до создания (работает как переменная)
const sayHello = function () {
  console.log("Hello");
};

//! Стрелочные функции (они безИмяные -> создаются как function Expression)
const sayBye = () => {
  console.log("Bye");
};
//* Если одна строка можем убрать усы и написать так:
const sayBye2 = () => console.log("Bye2");
sayBye();
sayBye2();
//* У стрелочной функции нет контекста (это плюс)
//* У стрелочной функции нет arguments

// ПРИМЕР СТРЕЛОЧНОЙ ФУНКЦИИ
const brokenLinks = ["vk", "youtube", "facebook"];

const trueLinks = (brokenLinks) => {
  brokenLinks.map((link) => `https://${link}.com`);
};
console.log(trueLinks(brokenLinks));

const a = 1;

function func1() {
  console.log(this.a);
}

func1();

const func2 = () => {
  console.log(this.a);
};

func2();

const users = [
  { name: "Алексей", age: 25 },
  { name: "Мария", age: 17 },
  { name: "Дмитрий", age: 30 },
];

const filterAdults = (arrUsers) => arrUsers.filter((user) => user.age >= 18);

console.log(filterAdults(users));
