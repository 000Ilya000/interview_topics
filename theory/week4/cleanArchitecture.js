//! CLEAN / MODULAR ARCHITECTURE

//! Clean Architecture (frontend adaptation):
// Domain — entities, use cases (pure TS, no React)
// Application — services, state orchestration
// Infrastructure — API clients, localStorage adapters
// Presentation — React components, hooks

//! Dependency rule: inner layers не знают outer
// UI → hooks → services → api client

//! Modular Architecture:
// Feature modules с public API
// Shared kernel (types, utils)
// Anti-pattern: circular deps, god modules, shared mutable state

//! Senior: «Как бороться с ростом связности?»
// Enforce module boundaries (eslint-plugin-boundaries)
// Event-driven между modules (custom events, message bus)
// Code review на cross-module imports

export {};
