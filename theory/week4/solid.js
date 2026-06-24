//! SOLID на Frontend

//! S — Single Responsibility
// Компонент рендерит UI, логика в custom hook, API в service

//! O — Open/Closed
// Расширение через props/slots/composition, не правка базового компонента

//! L — Liskov Substitution
// Button variants взаимозаменяемы без ломания UI

//! I — Interface Segregation
// Узкие props interfaces, не god-props object

//! D — Dependency Inversion
// Компонент зависит от абстракции (inject fetcher), не от конкретного api.ts

export {};
