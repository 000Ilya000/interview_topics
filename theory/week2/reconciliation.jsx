//! RECONCILIATION — Virtual DOM diffing

//! React сравнивает новое и старое Virtual DOM trees
// 1. Разные type → unmount старый, mount новый
// 2. Тот же type → обновить props, diff children
// 3. key помогает идентифицировать элемент при reorder

//! ❌ index as key при delete/reorder:
// [A, B, C] → delete A → [B, C]
// React думает: key 0 = A→B (update), key 1 = B→C (update) — state может «переехать»

//! ✅ stable unique key (id из данных)

//! Batching — React 18 автоматически batch'ит setState в event handlers, promises, timeouts
// flushSync() — принудительный sync render (редко нужен)

//! Senior: «Что произойдёт при setState в render?»
// Бесконечный цикл рендеров — нельзя вызывать setState синхронно в render body

export {};
