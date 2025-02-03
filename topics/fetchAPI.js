fetch("https://jsonplaceholder.typicode.com/users"); //! - возвращает промис
fetch("https://jsonplaceholder.typicode.com/users")
  .then((value) => value.json())
  .then((res) => console.log(res)); //! - выводит ответ

fetch("https://jsonplaceholder.typicode.com/users", {
  method: "POST",
  body: JSON.stringify({
    name: "Ilya",
    age: "18",
  }),
}).then();
