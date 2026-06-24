//! DESIGN PATTERNS — кратко для frontend собеса

//! Порождающие:
// Singleton — один instance (store, config)
// Factory — create objects по типу
// Builder — пошаговое создание сложного объекта

//! Структурные:
// Adapter — обёртка над чужим API (legacy → new interface)
// Decorator — расширение без наследования (HOC в React)
// Facade — простой API над сложной системой

//! Поведенческие:
// Observer — pub/sub (EventEmitter, Redux subscriptions)
// Strategy — interchangeable algorithms (payment methods)
// Command — undo/redo (redux actions)

//! React-specific:
// Compound Components — <Select><Option /></Select>
// Render Props / HOC — sharing logic (legacy, hooks replaced most)
// Container/Presentational — smart/dumb components

export {};
