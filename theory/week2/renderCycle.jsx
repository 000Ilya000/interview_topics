//! RENDER CYCLE — от setState до pixels

//! 1. Trigger — setState, dispatch, props change, context change, parent re-render
//! 2. Render phase — вызов компонента, hooks, построение нового fiber tree
//! 3. Reconciliation — diff old vs new
//! 4. Commit phase:
//    - before mutation (getSnapshotBeforeUpdate, useLayoutEffect cleanup)
//    - mutation (DOM updates)
//    - layout (useLayoutEffect, componentDidMount/Update)
//    - passive (useEffect cleanup + setup) — async после paint

//! Strict Mode (dev) — double invoke render/effects для поиска side effects

//! Порядок lifecycle (functional):
// mount: render → useLayoutEffect → useEffect
// update: render → useLayoutEffect cleanup → useLayoutEffect → useEffect cleanup → useEffect
// unmount: useLayoutEffect cleanup → useEffect cleanup

export {};
