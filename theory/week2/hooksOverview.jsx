//! HOOKS OVERVIEW — правила и назначение

//! Правила Hooks:
// 1. Только на top level (не в if/for)
// 2. Только в React functions (components, custom hooks)

//! useState — state, batch updates
//! useReducer — complex state logic
//! useEffect — side effects после paint (fetch, subscriptions)
//! useLayoutEffect — sync после DOM update, до paint
//! useRef — mutable ref, DOM ref (не вызывает re-render)
//! useMemo — cache computed value
//! useCallback — cache function reference
//! useContext — read context
//! useId — stable unique id (SSR-safe)
//! useTransition — mark update low priority
//! useDeferredValue — defer value update

//! Custom hooks — extract reusable logic (useDebounce, useFetch, useLocalStorage)

export {};
