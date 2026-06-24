//! EXTRA RENDERS — найти и исправить

//! Причины лишних рендеров:
// 1. Parent re-render → все children re-render (default)
// 2. New object/array/function in props каждый render
// 3. Context value меняется → все consumers
// 4. setState с тем же значением (React 18 bail out для primitives)
// 5. key меняется → unmount/remount

//! Как найти:
// React DevTools Profiler → "Why did this render?"
// console.log в render body (dev only)
// why-did-you-render library

//! Как исправить:
// React.memo + stable props (useCallback/useMemo)
// Split components — isolate state ближе к месту использования
// useMemo для expensive children props
// Virtualization для длинных списков (react-window)
// Context split — theme отдельно от user

//! ⚠️ Не оптимизируй преждевременно — сначала Profiler, потом memo

export {};
