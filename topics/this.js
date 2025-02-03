const item = {
  title: "Phone",
  fullPrice: 100,
  calculatePrice(discountPercent = 0) {
    console.log(this.fullPrice - (discountPercent / 100) * this.fullPrice);
  },
};

item.calculatePrice();

//! .call, .apply
//* .call, .apply - передает контекст (привязывают контекст) и сразу вызывает функцию
//* .call(obj, a, b, c)
//* .apply(obj, [a, b, c])
function calcDiscount(age) {
  if (age > 65) {
    console.log(this.price / 2);
  } else {
    console.log(this.price);
  }
}
const item2 = { title: "phone", price: 1000 };
calcDiscount.call(item2, 70);

//! .bind - привязывает контекст и возвращает функцию с новым контекстом
const calcDiscountForElderly = calcDiscount.bind(item2);
calcDiscountForElderly(70);
