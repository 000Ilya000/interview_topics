//! SERVER vs CLIENT COMPONENTS

//! Server Component (default в App Router):
// - async/await прямо в компоненте
// - доступ к DB, file system, secrets
// - меньше JS bundle на клиент
// - НЕТ hooks, useState, useEffect, event handlers

//! Client Component ('use client'):
// - useState, useEffect, onClick, browser APIs
// - импортируется в Server Component как leaf

//! Паттерн:
// ServerComponent (fetch data) → передаёт props → ClientComponent (interactivity)

//! Composition:
// <ClientWrapper>  ← 'use client'
//   <ServerChild /> ← ❌ нельзя напрямую передать Server в Client
// </ClientWrapper>
// ✅ Решение: children pattern — Server рендерит Client с children slot

export {};
