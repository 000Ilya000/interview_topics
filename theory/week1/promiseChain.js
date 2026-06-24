//! 🧠 Цепочка промисов — как работает?
// Каждый .then() возвращает новый промис, и ты можешь:
// 	•	вернуть значение → пойдёт в следующий .then
// 	•	бросить ошибку (throw) → пойдёт в ближайший .catch
// 	•	вернуть промис → цепочка подождёт, пока он выполнится

Promise.resolve("начало")
    .then((res) => {
        console.log(res); // "начало"
        return "шаг 1";
    })
    .then((res) => {
        console.log(res); // "шаг 1"
        return "шаг 2";
    })
    .then((res) => {
        console.log(res); // "шаг 2"
    });

//!🔥 Как работает reject в цепочке
Promise.resolve("начало")
    .then(() => {
        throw "ошибка!";
    })
    .then(() => {
        console.log("Это не выполнится");
    })
    .catch((err) => {
        console.error("Поймали:", err);
        return "восстановлено"; // можно вернуть что-то после ошибки
    })
    .then((res) => {
        console.log("Дальше:", res); // "восстановлено"
    });

//! 📦 finally — вызывается всегда
Promise.reject("fail")
    .catch((e) => {
        console.log("Ошибка:", e);
        return "ок";
    })
    .finally(() => {
        console.log("Завершено");
    });

// ________________________________
// Promise.resolve("начало")
//   .then((res) => {
//     console.log(res);
//     throw "ошибка";
//   })
//   .then(() => {
//     console.log("OK");
//   })
//   .catch((err) => {
//     console.error("Поймано:", err);
//     return "всё хорошо";
//   })
//   .then((res) => {
//     console.log("Финал:", res);
//   });

// начало Поймано: ошибка Финал: все хорошо
