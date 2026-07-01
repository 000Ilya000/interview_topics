// 🎯 MOCK INTERVIEW — 28 дней, ~2–2.5 ч/день
// node mockInterview/questions.js N

export const dailyQuestions = {
  1: {
    label: "HTML/CSS + Event Loop",
    questions: [
      { topic: "HTML", text: "article vs section vs div — пример из реального сайта?" },
      { topic: "CSS", text: "flex vs grid — когда что?" },
      { topic: "JavaScript", text: "Event loop — call stack, microtasks, macrotasks" },
      { topic: "JavaScript", text: "Почему Promise выполняется раньше setTimeout?" },
      { topic: "HTML", text: "Semantic HTML, viewport meta, базовая a11y" },
    ],
  },
  2: {
    label: "Promises + Closures + Debounce/Throttle",
    questions: [
      { topic: "JavaScript", text: "Promise.all vs allSettled vs race — когда что?" },
      { topic: "JavaScript", text: "Что такое closure и где используется?" },
      { topic: "JavaScript", text: "Debounce vs throttle — разница и use case" },
      { topic: "JavaScript", text: "Как работает .then().catch().finally()?" },
      { topic: "JavaScript", text: "Объясни debounce словами" },
    ],
  },
  3: {
    label: "this + prototypes + JS basics",
    questions: [
      { topic: "JavaScript", text: "this в arrow vs regular + call/apply/bind" },
      { topic: "JavaScript", text: "Prototype chain — как JS ищет свойство?" },
      { topic: "JavaScript", text: "Примитивы vs ссылочные типы" },
      { topic: "JavaScript", text: "let/const/var + == vs === + typeof null" },
      { topic: "JavaScript", text: "?? vs || — разница" },
    ],
  },
  4: {
    label: "Функции + массивы",
    questions: [
      { topic: "JavaScript", text: "Function declaration vs arrow vs expression" },
      { topic: "JavaScript", text: "map vs filter vs reduce — когда что?" },
      { topic: "JavaScript", text: "Mutating vs non-mutating методы массива" },
      { topic: "JavaScript", text: "forEach vs map — когда map обязателен?" },
      { topic: "JavaScript", text: "Как бы ты реализовал myMap?" },
    ],
  },
  5: {
    label: "Destructuring",
    questions: [
      { topic: "JavaScript", text: "Destructuring object и array — пример" },
      { topic: "JavaScript", text: "Rest vs spread оператор" },
      { topic: "JavaScript", text: "Default values в destructuring" },
      { topic: "JavaScript", text: "Вложенный destructuring — зачем?" },
      { topic: "JavaScript", text: "Destructuring в параметрах функции" },
    ],
  },
  6: {
    label: "Memory + immutability",
    questions: [
      { topic: "JavaScript", text: "3 причины memory leak" },
      { topic: "JavaScript", text: "Immutability — зачем в React?" },
      { topic: "JavaScript", text: "Shallow vs deep copy" },
      { topic: "JavaScript", text: "Как найти leak в DevTools?" },
      { topic: "JavaScript", text: "Замыкание и memory leak — связь?" },
    ],
  },
  7: {
    label: "Map/Set + Rendering pipeline",
    questions: [
      { topic: "JavaScript", text: "Map vs Object — когда что?" },
      { topic: "JavaScript", text: "Set vs Array" },
      { topic: "Browser", text: "Layout → Paint → Composite — базово" },
      { topic: "Browser", text: "WeakMap/WeakSet — зачем?" },
      { topic: "JavaScript", text: "Immutability + spread для копии объекта" },
    ],
  },
  8: {
    label: "Reflow база + задачи",
    questions: [
      { topic: "Browser", text: "Reflow vs repaint — одним предложением" },
      { topic: "Browser", text: "Почему transform лучше left?" },
      { topic: "JavaScript", text: "myFilter — логика своими словами" },
      { topic: "JavaScript", text: "Палиндром — как проверить?" },
      { topic: "Browser", text: "Что такое compositor layer?" },
    ],
  },
  9: {
    label: "EventEmitter + память W1",
    questions: [
      { topic: "JavaScript", text: "EventEmitter pub/sub — как работает?" },
      { topic: "JavaScript", text: "Debounce из памяти — опиши алгоритм" },
      { topic: "JavaScript", text: "Throttle из памяти — опиши алгоритм" },
      { topic: "JavaScript", text: "Closure в debounce — зачем?" },
      { topic: "JavaScript", text: "Event loop — кратко повтори" },
    ],
  },
  10: {
    label: "Review недели 1",
    questions: [
      { topic: "JavaScript", text: "Event loop — Promise vs setTimeout" },
      { topic: "JavaScript", text: "this + prototype chain" },
      { topic: "JavaScript", text: "Debounce vs throttle" },
      { topic: "HTML/CSS", text: "Semantic HTML + flex vs grid" },
      { topic: "JavaScript", text: "Closures — пример" },
    ],
  },
  11: {
    label: "TS: any + guards",
    questions: [
      { topic: "TypeScript", text: "any vs unknown vs never" },
      { topic: "TypeScript", text: "Type guard `x is User` — зачем?" },
      { topic: "TypeScript", text: "Type assertion vs type guard" },
      { topic: "TypeScript", text: "Когда unknown лучше any?" },
      { topic: "TypeScript", text: "never — пример использования" },
    ],
  },
  12: {
    label: "TS: utility + generics",
    questions: [
      { topic: "TypeScript", text: "Pick vs Omit vs Partial" },
      { topic: "TypeScript", text: "Generic ApiResponse<T> — пример" },
      { topic: "TypeScript", text: "Record<K,V> — когда?" },
      { topic: "TypeScript", text: "ReturnType — как работает?" },
      { topic: "TypeScript", text: "DeepPartial — идея реализации" },
    ],
  },
  13: {
    label: "TS: infer + conditional",
    questions: [
      { topic: "TypeScript", text: "infer — зачем? Пример" },
      { topic: "TypeScript", text: "Conditional T extends U ? X : Y" },
      { topic: "TypeScript", text: "Distributive conditional types — что это?" },
      { topic: "TypeScript", text: "Extract vs Exclude" },
      { topic: "TypeScript", text: "NonNullable<T> — как через conditional?" },
    ],
  },
  14: {
    label: "TS: mapped + declarations",
    questions: [
      { topic: "TypeScript", text: "Mapped types `{ [K in keyof T] }`" },
      { topic: "TypeScript", text: "Readonly<T> vs ReadonlyArray" },
      { topic: "TypeScript", text: "Зачем .d.ts файлы?" },
      { topic: "TypeScript", text: "declare module — когда?" },
      { topic: "TypeScript", text: "TS блок — что запомнить для собеса?" },
    ],
  },
  15: {
    label: "Reconciliation + Fiber",
    questions: [
      { topic: "React", text: "Virtual DOM + reconciliation" },
      { topic: "React", text: "Почему index as key плохо?" },
      { topic: "React", text: "React Fiber — зачем?" },
      { topic: "React", text: "Render vs Commit phase" },
      { topic: "React", text: "Что такое key и stable id?" },
    ],
  },
  16: {
    label: "Render cycle + hooks overview",
    questions: [
      { topic: "React", text: "Порядок: commit → useLayoutEffect → paint → useEffect" },
      { topic: "React", text: "Назови 5 hooks и зачем каждый" },
      { topic: "React", text: "useRef vs useState" },
      { topic: "React", text: "useReducer — когда вместо useState?" },
      { topic: "React", text: "Правила hooks — 2 главных" },
    ],
  },
  17: {
    label: "useEffect + useMemo",
    questions: [
      { topic: "React", text: "useEffect vs useLayoutEffect" },
      { topic: "React", text: "useMemo vs useCallback — когда нужны?" },
      { topic: "React", text: "Dependency array — что будет если []?" },
      { topic: "React", text: "Cleanup в useEffect — зачем?" },
      { topic: "React", text: "Когда useMemo вредит?" },
    ],
  },
  18: {
    label: "Extra renders + useDebounce",
    questions: [
      { topic: "React", text: "3 причины лишнего рендера" },
      { topic: "React", text: "React DevTools Profiler — как пользоваться?" },
      { topic: "React", text: "useDebounce — зачем в React?" },
      { topic: "React", text: "style={{}} — почему лишний рендер?" },
      { topic: "React", text: "React.memo — когда помогает?" },
    ],
  },
  19: {
    label: "Context + Concurrent",
    questions: [
      { topic: "React", text: "Context — почему все consumers ререндерятся?" },
      { topic: "React", text: "useTransition — зачем?" },
      { topic: "React", text: "useDeferredValue vs useTransition" },
      { topic: "React", text: "Split context — как fix rerenders?" },
      { topic: "React", text: "Provider value={{}} — в чём баг?" },
    ],
  },
  20: {
    label: "Patterns + miniStateManager",
    questions: [
      { topic: "React", text: "Error Boundary — что ловит?" },
      { topic: "React", text: "Portal — зачем?" },
      { topic: "React", text: "React.lazy + Suspense" },
      { topic: "React", text: "miniStateManager — pub/sub vs useState" },
      { topic: "React", text: "Compound components — идея" },
    ],
  },
  21: {
    label: "Review недели 2",
    questions: [
      { topic: "TypeScript", text: "any vs unknown + Pick/Omit" },
      { topic: "React", text: "Reconciliation + key" },
      { topic: "React", text: "useEffect vs useLayoutEffect" },
      { topic: "React", text: "Context + useTransition" },
      { topic: "React", text: "Лишний рендер — причины" },
    ],
  },
  22: {
    label: "Next.js SSR + hydration",
    questions: [
      { topic: "Next.js", text: "CSR vs SSR vs SSG vs ISR" },
      { topic: "Next.js", text: "Когда SSR вредит perf?" },
      { topic: "Next.js", text: "Hydration mismatch — пример" },
      { topic: "Next.js", text: "Streaming — зачем?" },
      { topic: "Next.js", text: "TTFB vs FCP — простыми словами" },
    ],
  },
  23: {
    label: "Next.js App Router + RSC",
    questions: [
      { topic: "Next.js", text: "Server vs Client Components" },
      { topic: "Next.js", text: "Зачем 'use client'?" },
      { topic: "Next.js", text: "layout vs page" },
      { topic: "Next.js", text: "RSC — 0 JS на клиент для server части?" },
      { topic: "Next.js", text: "loading.tsx / error.tsx — зачем?" },
    ],
  },
  24: {
    label: "HTTP + CORS + JWT",
    questions: [
      { topic: "Network", text: "CORS preflight — когда?" },
      { topic: "Network", text: "JWT httpOnly cookie vs localStorage" },
      { topic: "Network", text: "401 vs 403" },
      { topic: "Network", text: "HttpOnly, Secure, SameSite" },
      { topic: "Network", text: "GET vs POST — идемпотентность" },
    ],
  },
  25: {
    label: "XSS + CSRF ★",
    questions: [
      { topic: "Senior", text: "XSS — 3 вида + защита" },
      { topic: "Senior", text: "CSRF — механизм + SameSite" },
      { topic: "Senior", text: "XSS vs CSRF" },
      { topic: "Senior", text: "Почему JWT не в localStorage?" },
      { topic: "Senior", text: "CSP — что даёт?" },
    ],
  },
  26: {
    label: "Data fetching ★",
    questions: [
      { topic: "Senior", text: "Race condition + fix" },
      { topic: "Senior", text: "AbortController + cleanup" },
      { topic: "Senior", text: "Stale-while-revalidate" },
      { topic: "Senior", text: "Dedup через Map" },
      { topic: "Senior", text: "TanStack Query vs useEffect fetch" },
    ],
  },
  27: {
    label: "Reflow ★ + Code splitting ★",
    questions: [
      { topic: "Senior", text: "Layout thrashing + fix" },
      { topic: "Senior", text: "transform vs left" },
      { topic: "Senior", text: "3 стратегии code splitting" },
      { topic: "Senior", text: "preload vs prefetch" },
      { topic: "Senior", text: "will-change overhead" },
    ],
  },
  28: {
    label: "ФИНАЛ — Mock MIX + Architecture",
    mix: true,
    questions: [
      { topic: "JavaScript", text: "Event loop + this + prototype — связь" },
      { topic: "React", text: "Fiber + hooks + лишний рендер" },
      { topic: "TypeScript", text: "Generics + infer — пример" },
      { topic: "Next.js", text: "SSR vs RSC + hydration" },
      { topic: "Senior", text: "XSS + CSRF + JWT cookie" },
      { topic: "Senior", text: "Race condition + TanStack Query" },
      { topic: "Senior", text: "Reflow + code split + CLS" },
      { topic: "Senior", text: "Focus trap + inert" },
      { topic: "System", text: "FSD слои + Query vs Redux vs Zustand" },
      { topic: "System", text: "Design System + monorepo — когда?" },
    ],
  },
};

export const mixedPool = Object.entries(dailyQuestions)
  .filter(([day, data]) => Number(day) <= 27 && !data.mix)
  .flatMap(([, data]) => data.questions);

export function getDailyQuestions(day) {
  const data = dailyQuestions[day];
  if (!data) return null;
  return { day, label: data.label, mix: !!data.mix, questions: data.questions };
}

export function getRangeQuestions(from, to) {
  const result = [];
  for (let d = from; d <= to; d++) {
    const data = dailyQuestions[d];
    if (!data) continue;
    const q = data.questions[0];
    if (q) result.push({ day: d, label: data.label, ...q });
  }
  return result;
}

function printQuestions(title, questions, opts = {}) {
  console.log(`\n🎯 Mock Interview — ${title}\n`);
  if (opts.mix) console.log('📌 Режим MIX — весь курс\n');
  else if (opts.range) console.log(`📌 Повторение: дни ${opts.from}–${opts.to}\n`);
  else console.log('📌 Только пройденный материал\n');
  questions.forEach((q, i) => {
    const prefix = q.day ? `[День ${q.day}] ` : '';
    console.log(`${i + 1}. [${q.topic}] ${prefix}${q.text}`);
  });
  console.log("\n→ Ответь на каждый ВСЛУХ, 2–3 мин\n");
}

const arg = process.argv[2];
if (arg === 'mix') {
  const data = getDailyQuestions(28);
  printQuestions('MIX (день 28)', data.questions, { mix: true });
} else if (arg && arg.includes('-')) {
  const [from, to] = arg.split('-').map(Number);
  printQuestions(`Дни ${from}–${to}`, getRangeQuestions(from, to), { range: true, from, to });
} else {
  const day = Number(arg || 1);
  const data = getDailyQuestions(day);
  if (!data) { console.error(`День ${day} не найден. 1–28`); process.exit(1); }
  printQuestions(`День ${day}: ${data.label}`, data.questions, { mix: data.mix });
}
