//! HYDRATION — React «оживляет» server HTML

//! Процесс:
// 1. Server renders HTML + __NEXT_DATA__ / RSC payload
// 2. Browser показывает HTML (FCP)
// 3. JS загружается → React hydrate — attach event listeners, reconcile
// 4. App becomes interactive (TTI)

//! Hydration mismatch — server HTML ≠ client render
// Причины: Date.now(), Math.random(), window, localStorage, browser-only APIs
// React warning + возможный bug UI

//! Как избежать:
// - useEffect для client-only logic
// - suppressHydrationWarning (редко, для timestamp)
// - dynamic import с ssr: false для client-only components

//! Selective Hydration (React 18) — hydrate по приоритету (user interaction first)

export {};
