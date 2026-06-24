//! STATE MANAGEMENT — RTK, RTK Query, Zustand, TanStack Query

//! Разделение:
// Server state — TanStack Query / RTK Query (fetch, cache, invalidation)
// Client UI state — useState, useReducer, Zustand
// Global app state — Redux Toolkit (complex flows, middleware, devtools)

//! TanStack Query:
// useQuery({ queryKey, queryFn, staleTime, gcTime })
// useMutation + invalidateQueries
// Optimistic updates: onMutate → rollback on error

//! Zustand:
// const useStore = create((set) => ({ count: 0, inc: () => set(s => ({ count: s.count + 1 })) }))
// Минимальный boilerplate, no Provider

//! Redux Toolkit:
// createSlice — reducers + actions + Immer
// configureStore — middleware, devtools
// RTK Query — встроенный data fetching layer

//! Когда что:
// Query — любые API данные
// Zustand — простой global (cart, UI prefs)
// RTK — сложная бизнес-логика, undo, cross-feature state

export {};
