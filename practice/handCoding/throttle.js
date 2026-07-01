// ✍️ HAND CODING — реализуй БЕЗ AI

//! throttle(fn, delay) — не чаще чем раз в delay мс

export function throttle(fn, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      fn.apply(this,args)
    }
  }
}
