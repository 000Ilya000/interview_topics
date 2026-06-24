//! FEATURE-SLICED DESIGN (FSD)

//! Слои (сверху вниз, import только вниз):
// app      — routing, providers, global styles
// pages    — full pages (compose widgets)
// widgets  — composite UI blocks (Header, Sidebar)
// features — user actions (AddToCart, LoginForm)
// entities — business entities (User, Product)
// shared   — ui kit, api, lib, config

//! Слайс = feature/entity folder с segments:
// ui/, model/, api/, lib/, config/

//! Senior-вопрос: «Как организовать проект на 50 разработчиков?»
// FSD или modular monolith с чёткими boundaries
// Public API через index.ts — не импортировать internals соседнего slice
// ESLint boundaries plugin — enforce import rules

export {};
