//! Инкапсуляция, наследование, полиморфизм и абстракция — являются основами объектно-ориентированного программирования.

//! Инкапсуляция
class BankAccount {
  constructor(balance) {
    this._balance = balance; // Приватное поле
  }

  deposit(amount) {
    this._balance += amount; // Метод для изменения состояния
  }

  getBalance() {
    return this._balance; // Метод для доступа к состоянию
  }
}

const account = new BankAccount(100);
console.log(account._balance);
account.deposit(50);
console.log(account.getBalance()); // 150

//! Наследование
class Animal {
  speak() {
    console.log("Животное издает звук");
  }
}

class Dog extends Animal {
  // Наследование от класса Animal
  speak() {
    console.log("Гав!");
  }
}

const dog = new Dog();
dog.speak(); // Гав!

//! Полиморфизм
class Cat extends Animal {
  speak() {
    console.log("Мяу!");
  }
}

const animals = [new Dog(), new Cat()];
animals.forEach((animal) => animal.speak()); // Гав! Мяу!

//! Абстракция
class Shape {
  area() {
    throw new Error("Метод area() должен быть переопределен"); // Абстрактный метод
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height; // Реализация метода area()
  }
}

const rectangle = new Rectangle(5, 10);
console.log(rectangle.area()); // 50
