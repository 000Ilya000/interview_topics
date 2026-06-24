//! DEBOUNCE и THROTTLE — must know для live coding
//! Реализуй сам в practice/handCoding/debounce.js и throttle.js

//! DEBOUNCE — вызов после паузы (search input, resize end)
function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

//! THROTTLE — не чаще чем раз в delay (scroll, mousemove)
function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

//! Когда что:
// debounce — ждём, пока пользователь перестанет (поиск, автосохранение)
// throttle — ограничиваем частоту (scroll handler, progress bar)

const logSearch = debounce((q) => console.log("search:", q), 300);
logSearch("a");
logSearch("ab");
logSearch("abc"); // только "abc" через 300ms

const logScroll = throttle(() => console.log("scroll"), 200);
