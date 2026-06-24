// const promise1 = new Promise((resolve, reject) => {
//   resolve("foo");
// });

// promise1.then((value) => {
//   console.log(value);
// });

// //! Методы промисов
// async function getPosts() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts");

//   return await response.json();
// }

// async function getUsers() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");

//   return await response.json();
// }

// async function getComments() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/comments");

//   return await response.json();
// }

// async function getImages() {
//   // const response = await fetch("https://jsonplaceholder.typicode.com/images");

//   // return await response.json();

//   return Promise.resolve();
// }

// //! Promise.all выполняются все промисы, если один reject - прекращается работа -> catch
// //! Promise.allSettled выполняются все промисы, даже если какой то reject - возвращаются объекты промисов с их состоянием
// //! Promise.race - выполняется 1 промис который быстрее

// //! Promise.reject - создание своего прямого ответа(reject) от сервера
// //! Promise.resolve - создание своего прямого ответа от сервера (типа что то получаем)

// Promise.race([getPosts(), getUsers(), getComments()]).then(console.log);

const fetchData = (shouldReject) => {
  if (shouldReject) {
    return new Promise((resolve, reject) => {
      reject("Ошибка загрузки данных");
    });
  }
  return new Promise((resolve) => {
    resolve({ id: 1, name: "John Doe" });
  });
};

fetchData(false)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

// const promises = [
//   () => Promise.resolve(1),
//   () => new Promise((resolve) => setTimeout(() => resolve(2), 500)),
//   () => new Promise((resolve) => setTimeout(() => resolve(3), 100)),
// ];

// async function runPromisesSequentially(promises) {
//   const results = [];
//   for (const promise of promises) {
//     const result = await promise(); // ждем выполнения текущего промиса
//     results.push(result); // добавляем результат в массив
//   }
//   return results;
// }

// runPromisesSequentially(promises).then((result) => {
//   console.log(result); // Ожидаемый вывод: [1, 2, 3]
// });

// const promises = [
//   () => new Promise((resolve) => setTimeout(() => resolve(1), 300)),
//   () => new Promise((resolve) => setTimeout(() => resolve(2), 200)),
//   () => new Promise((resolve) => setTimeout(() => resolve(3), 100)),
//   () => new Promise((resolve) => setTimeout(() => resolve(4), 400)),
// ];

// const limitConcurrency = async (promises, limit) => {
//   const result = [];
//   let nowPromises = [];

//   for (let i = 0; i < promises.length; i++) {
//     const promise = promises[i];
//     if (nowPromises.length < limit) {
//       result.push(await promise());
//     } else {
//       result = [...nowPromises];
//       nowPromises = [];
//     }
//   }

//   return result;
// };

// limitConcurrency(promises, 2).then((result) => {
//   console.log(result); // Ожидаемый вывод: [1, 2, 3, 4]
// });

const processData = (numbers) => {
  return new Promise((resolve, reject) => {
    let resultSqw = [];
    numbers.map((number) => {
      if (number < 0) {
        reject("Отрицательные числа не допускаются");
      }
      resultSqw.push(number * number);
    });
    resolve(resultSqw);
  });
};

processData([1, 2, 3]).then((response) => console.log(response));
