//! MEMORY LEAKS — типичные причины и как дебажить в проде

//! ─── 1. Забытые event listeners ──────────────────────────────────────────────
// ❌ window.addEventListener("resize", handler) без removeEventListener
// ✅ cleanup в useEffect return или AbortController:
// const ctrl = new AbortController();
// el.addEventListener("click", fn, { signal: ctrl.signal });
// ctrl.abort(); // снимает все listeners с этим signal

//! ─── 2. Замыкания, держащие большие объекты ──────────────────────────────────
function createLeakyHandler() {
  const hugeData = new Array(1_000_000).fill("x");
  return () => {
    // hugeData остаётся в closure даже если не используется
    console.log("handler");
  };
}

//! ─── 3. Detached DOM nodes ───────────────────────────────────────────────────
// Удалённый из DOM элемент, на который есть ссылка в JS — не собирается GC
// let detached = document.getElementById("btn");
// document.body.removeChild(detached);
// detached = null; // ✅ обнули ссылку

//! ─── 4. Timers и intervals ───────────────────────────────────────────────────
// ❌ setInterval без clearInterval
// ✅ clearInterval(id) в cleanup

//! ─── 5. React-специфика ─────────────────────────────────────────────────────
// - подписки без cleanup в useEffect
// - setState на unmounted компоненте (race condition)
// - глобальные кэши без eviction (Map без лимита)

//! ─── Дебаг в проде ───────────────────────────────────────────────────────────
// Chrome DevTools → Memory → Heap snapshot → Compare snapshots
// Performance monitor → JS heap size растёт и не падает = leak
// React DevTools Profiler — компоненты, которые не unmount
