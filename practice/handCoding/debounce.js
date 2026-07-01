// ✍️ HAND CODING — реализуй БЕЗ Cursor/AI, потом сверь с solutions/

//! Задача: реализовать debounce
//! debounce(fn, delay) — вызов fn только после delay мс паузы

export function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId)
    timerId = setTimeout(() => fn.apply(this, args), delay)
  }
}
