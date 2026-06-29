// 🎯 MOCK INTERVIEW — вопросы только по пройденному материалу
//
// node mockInterview/questions.js N       — mock дня N (5 вопросов)
// node mockInterview/questions.js 1-5     — по 1 вопросу с каждого дня (повторение)
// node mockInterview/questions.js mix     — финальный mix (8 вопросов, дни 23–25)
//
// Дни 1–22: только то, что уже прошли к этому дню
// Дни 23–25: всё вперемешку (как на реальном собесе)

export const dailyQuestions = {
  // ─── НЕДЕЛЯ 1 ───────────────────────────────────────────────────────────────
  1: {
    label: "HTML/CSS + Event Loop",
    questions: [
      { topic: "HTML", text: "article vs section vs div — пример из реального сайта?" },
      { topic: "CSS", text: "flex vs grid — когда что? Пример: navbar vs каталог карточек" },
      { topic: "JavaScript", text: "Event loop — call stack, microtasks, macrotasks простыми словами" },
      { topic: "JavaScript", text: "Почему Promise выполняется раньше setTimeout?" },
      { topic: "HTML", text: "Зачем semantic HTML, viewport meta tag и базовая a11y (Tab, alt)?" },
    ],
  },

  2: {
    label: "Promises + Closures + Debounce/Throttle",
    questions: [
      { topic: "JavaScript", text: "Promise.all vs allSettled vs race — когда что?" },
      { topic: "JavaScript", text: "Что такое closure и где используется?" },
      { topic: "JavaScript", text: "Debounce vs throttle — разница и пример из жизни (поиск vs scroll)" },
      { topic: "JavaScript", text: "Как работает цепочка .then().catch().finally()?" },
      { topic: "JavaScript", text: "Объясни debounce словами — что происходит при быстрых вызовах?" },
    ],
  },

  3: {
    label: "this + Prototypes + JS basics",
    questions: [
      { topic: "JavaScript", text: "this в arrow function vs regular function — в чём разница?" },
      { topic: "JavaScript", text: "Prototype chain — как JS ищет свойство?" },
      { topic: "JavaScript", text: "typeof null, == vs === — что вернёт и почему?" },
      { topic: "JavaScript", text: "map vs filter vs reduce — когда что?" },
      { topic: "JavaScript", text: "let vs const vs var — отличия и hoisting" },
    ],
  },

  4: {
    label: "Memory + Reflow (база) + Collections",
    questions: [
      { topic: "JavaScript", text: "Как найти memory leak в Chrome DevTools?" },
      { topic: "Browser", text: "Layout → Paint → Composite — что каждый шаг делает?" },
      { topic: "JavaScript", text: "Map vs Object, Set vs Array — когда что?" },
      { topic: "JavaScript", text: "Immutability — зачем в React?" },
      { topic: "Browser", text: "Какие CSS-свойства вызывают reflow?" },
    ],
  },

  5: {
    label: "Повторение недели 1",
    questions: [
      { topic: "JavaScript", text: "Event loop — порядок sync → micro → macro. Promise vs setTimeout" },
      { topic: "JavaScript", text: "Debounce vs throttle — объясни и назови use case" },
      { topic: "JavaScript", text: "Closure — пример (счётчик, debounce)" },
      { topic: "JavaScript", text: "this + prototype — как связаны?" },
      { topic: "HTML/CSS", text: "Semantic HTML + flex vs grid — кратко всё неделя 1" },
    ],
  },

  // ─── НЕДЕЛЯ 2 ───────────────────────────────────────────────────────────────
  6: {
    label: "TypeScript",
    questions: [
      { topic: "TypeScript", text: "any vs unknown vs never — когда что?" },
      { topic: "TypeScript", text: "Type guard — что это? Пример `x is User`" },
      { topic: "TypeScript", text: "Generic — объясни на примере `useState<T>` или `ApiResponse<T>`" },
      { topic: "TypeScript", text: "Pick vs Omit vs Partial — пример из формы/API" },
      { topic: "TypeScript", text: "infer — зачем нужен? Пример ReturnType" },
    ],
  },

  7: {
    label: "Reconciliation + Fiber + Render Cycle",
    questions: [
      { topic: "React", text: "Virtual DOM + reconciliation — как React обновляет UI?" },
      { topic: "React", text: "Почему index as key — плохая идея при delete/reorder?" },
      { topic: "React", text: "React Fiber — зачем React его сделал?" },
      { topic: "React", text: "Render phase vs Commit phase — что в каждой?" },
      { topic: "React", text: "Порядок после setState: render → commit → useLayoutEffect → paint → useEffect" },
    ],
  },

  8: {
    label: "Hooks + Memo + Extra Renders",
    questions: [
      { topic: "React", text: "useEffect vs useLayoutEffect — когда что?" },
      { topic: "React", text: "useMemo vs useCallback — когда реально нужны, а когда нет?" },
      { topic: "React", text: "3 причины лишнего рендера в React?" },
      { topic: "React", text: "Как найти лишний рендер в React DevTools Profiler?" },
      { topic: "React", text: "Правила hooks — какие два главных?" },
    ],
  },

  9: {
    label: "Context + Concurrent + Patterns",
    questions: [
      { topic: "React", text: "Context — почему все consumers ререндерятся? Как fix?" },
      { topic: "React", text: "useTransition / useDeferredValue — зачем?" },
      { topic: "React", text: "Error Boundary — что ловит и что НЕ ловит?" },
      { topic: "React", text: "Portal — зачем рендерить модалку в document.body?" },
      { topic: "React", text: "React.lazy + Suspense — что даёт?" },
    ],
  },

  10: {
    label: "Повторение недели 2",
    questions: [
      { topic: "TypeScript", text: "any vs unknown + Pick vs Omit — кратко" },
      { topic: "React", text: "Reconciliation + key — зачем stable id?" },
      { topic: "React", text: "useEffect vs useLayoutEffect" },
      { topic: "React", text: "Лишний рендер — причины и как найти" },
      { topic: "React", text: "Context + useTransition — когда что использовать?" },
    ],
  },

  // ─── НЕДЕЛЯ 3 ───────────────────────────────────────────────────────────────
  11: {
    label: "Next.js SSR + App Router + RSC",
    questions: [
      { topic: "Next.js", text: "CSR vs SSR vs SSG vs ISR — одним предложением каждый" },
      { topic: "Next.js", text: "Когда SSR ухудшает производительность?" },
      { topic: "Next.js", text: "Server Component vs Client Component — что где можно?" },
      { topic: "Next.js", text: "Hydration mismatch — что это и пример бага?" },
      { topic: "Next.js", text: "Зачем директива 'use client'?" },
    ],
  },

  12: {
    label: "HTTP + CORS + JWT",
    questions: [
      { topic: "Network", text: "CORS — что это и зачем браузер блокирует?" },
      { topic: "Network", text: "CORS preflight — когда срабатывает?" },
      { topic: "Network", text: "JWT в httpOnly cookie vs localStorage — почему?" },
      { topic: "Network", text: "401 vs 403 — разница?" },
      { topic: "Network", text: "HttpOnly, Secure, SameSite — зачем каждый флаг cookie?" },
    ],
  },

  13: {
    label: "XSS + CSRF ★ Senior",
    questions: [
      { topic: "Senior", text: "XSS — три вида (reflected, stored, DOM-based)?" },
      { topic: "Senior", text: "XSS — как защититься? (escape, CSP, HttpOnly, sanitize)" },
      { topic: "Senior", text: "CSRF — как работает атака простыми словами?" },
      { topic: "Senior", text: "CSRF — SameSite cookie + CSRF token" },
      { topic: "Senior", text: "XSS vs CSRF — в чём разница?" },
    ],
  },

  14: {
    label: "Data Fetching ★ Senior",
    questions: [
      { topic: "Senior", text: "Race condition при fetch — воспроизведи словами и как fix?" },
      { topic: "Senior", text: "AbortController + cleanup в useEffect — зачем?" },
      { topic: "Senior", text: "Дедупликация запросов через Map — зачем?" },
      { topic: "Senior", text: "Stale-while-revalidate — что это одним предложением?" },
      { topic: "Senior", text: "TanStack Query vs fetch в useEffect — зачем Query?" },
    ],
  },

  15: {
    label: "Повторение недели 3",
    questions: [
      { topic: "Next.js", text: "SSR vs SSG — когда что?" },
      { topic: "Senior", text: "XSS + CSRF — разница и защита за 2 минуты" },
      { topic: "Senior", text: "Race condition + AbortController" },
      { topic: "Network", text: "CORS preflight + JWT в cookie" },
      { topic: "Senior", text: "Stale-while-revalidate + dedup — зачем?" },
    ],
  },

  // ─── НЕДЕЛЯ 4 ───────────────────────────────────────────────────────────────
  16: {
    label: "Reflow vs Repaint ★ Senior",
    questions: [
      { topic: "Senior", text: "Layout → Paint → Composite — цепочка и примеры триггеров" },
      { topic: "Senior", text: "Почему transform лучше left/top для анимаций?" },
      { topic: "Senior", text: "Layout thrashing — что это и как fix?" },
      { topic: "Senior", text: "will-change — зачем и какой memory overhead?" },
      { topic: "Senior", text: "Связь reflow с CLS — как избежать прыжков вёрстки?" },
    ],
  },

  17: {
    label: "Code Splitting ★ Senior",
    questions: [
      { topic: "Senior", text: "Code splitting — три стратегии (роуты, фичи, вендоры)?" },
      { topic: "Senior", text: "preload vs prefetch — разница?" },
      { topic: "Senior", text: "React.lazy + Suspense — как работает?" },
      { topic: "Senior", text: "Tree shaking + sideEffects в package.json — зачем?" },
      { topic: "Senior", text: "Как бы ты уменьшил initial bundle на 40%?" },
    ],
  },

  18: {
    label: "A11y интерактивных компонентов ★ Senior",
    questions: [
      { topic: "Senior", text: "Focus trap в модалке — зачем?" },
      { topic: "Senior", text: "Возврат фокуса на триггер после закрытия — зачем?" },
      { topic: "Senior", text: "aria-hidden vs inert — разница?" },
      { topic: "A11y", text: "role=\"dialog\", aria-modal, aria-labelledby — зачем?" },
      { topic: "A11y", text: "Как протестировать модалку только с клавиатуры?" },
    ],
  },

  19: {
    label: "Web Vitals + Протоколы",
    questions: [
      { topic: "Performance", text: "LCP, INP, CLS — пороги «хорошо» и что каждый измеряет?" },
      { topic: "Performance", text: "Как улучшить CLS на странице с картинками?" },
      { topic: "Network", text: "HTTP vs WebSocket — когда что?" },
      { topic: "Network", text: "REST vs GraphQL — кратко, когда GraphQL?" },
      { topic: "Performance", text: "Как улучшить INP на тяжёлой React-странице?" },
    ],
  },

  20: {
    label: "Повторение Senior-блоков (недели 3–4)",
    questions: [
      { topic: "Senior", text: "XSS — 3 вида + защита" },
      { topic: "Senior", text: "CSRF — механизм + SameSite" },
      { topic: "Senior", text: "Race condition + AbortController + dedup" },
      { topic: "Senior", text: "Layout → paint → composite + layout thrashing" },
      { topic: "Senior", text: "Focus trap + aria-hidden vs inert + code splitting стратегии" },
    ],
  },

  // ─── НЕДЕЛЯ 5 ───────────────────────────────────────────────────────────────
  21: {
    label: "Architecture + State",
    questions: [
      { topic: "System", text: "FSD — назови слои и правило импортов" },
      { topic: "System", text: "TanStack Query vs Redux vs Zustand — когда что?" },
      { topic: "System", text: "Как организовать frontend-проект на 50 разработчиков?" },
      { topic: "System", text: "Clean Architecture — слои UI → Use Cases → Domain" },
      { topic: "React", text: "Почему API-данные не кладут в Redux?" },
    ],
  },

  22: {
    label: "Design Systems + Monorepo + SOLID",
    questions: [
      { topic: "System", text: "Monorepo vs multi-repo — когда monorepo?" },
      { topic: "System", text: "Design System — из чего состоит (tokens → components)?" },
      { topic: "System", text: "SOLID — объясни S (Single) и D (Dependency) на примере React" },
      { topic: "System", text: "Compound Components — что это? Пример Select.Option" },
      { topic: "System", text: "Turborepo/Nx — зачем в monorepo?" },
    ],
  },

  // ─── ФИНАЛ — всё вперемешку ─────────────────────────────────────────────────
  23: {
    label: "Mock Interview — MIX #1 (весь курс)",
    mix: true,
    questions: [
      { topic: "JavaScript", text: "Event loop — Promise vs setTimeout" },
      { topic: "React", text: "Почему лишний рендер и как найти?" },
      { topic: "TypeScript", text: "any vs unknown vs never" },
      { topic: "Next.js", text: "SSR vs SSG + когда SSR вредит" },
      { topic: "Senior", text: "XSS vs CSRF — объясни и защита" },
      { topic: "Senior", text: "Race condition — воспроизведи и fix" },
      { topic: "Senior", text: "Reflow vs Repaint — цепочка" },
      { topic: "Senior", text: "Focus trap — зачем в модалке?" },
    ],
  },

  24: {
    label: "Mock Interview — MIX #2 (весь курс)",
    mix: true,
    questions: [
      { topic: "JavaScript", text: "Debounce vs throttle — реализуй словами" },
      { topic: "JavaScript", text: "Closure + this — пример" },
      { topic: "React", text: "useEffect vs useLayoutEffect" },
      { topic: "TypeScript", text: "Pick vs Omit + type guard" },
      { topic: "Senior", text: "AbortController + stale-while-revalidate" },
      { topic: "Senior", text: "Code splitting — 3 стратегии" },
      { topic: "System", text: "FSD слои + state management" },
      { topic: "System", text: "Monorepo — структура apps/packages" },
    ],
  },

  25: {
    label: "ФИНАЛ — Mock Interview MIX #3",
    mix: true,
    questions: [
      { topic: "JavaScript", text: "Event loop + micro/macro tasks — полный разбор" },
      { topic: "React", text: "Fiber + reconciliation + key" },
      { topic: "TypeScript", text: "Generics + infer — пример" },
      { topic: "Next.js", text: "Server vs Client Components + hydration" },
      { topic: "Senior", text: "XSS + CSRF + JWT cookie" },
      { topic: "Senior", text: "Race condition + dedup + TanStack Query" },
      { topic: "Senior", text: "Layout thrashing + transform vs left + CLS" },
      { topic: "Senior", text: "Focus trap + inert + a11y модалки" },
      { topic: "System", text: "Админка на 100 экранов — как организуешь? (FSD/monorepo)" },
      { topic: "System", text: "Design System для 5 продуктов — подход" },
    ],
  },
};

// ─── Пул для команды mix (если захочешь рандом) ─────────────────────────────
export const mixedPool = Object.entries(dailyQuestions)
  .filter(([day]) => Number(day) <= 22)
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
  if (opts.mix) {
    console.log("📌 Режим MIX — вопросы из всего курса\n");
  } else if (opts.range) {
    console.log(`📌 Повторение: по 1 вопросу с каждого дня (${opts.from}–${opts.to})\n`);
  } else {
    console.log("📌 Только материал, пройденный к этому дню\n");
  }
  questions.forEach((q, i) => {
    const prefix = q.day ? `[День ${q.day}] ` : "";
    console.log(`${i + 1}. [${q.topic}] ${prefix}${q.text}`);
  });
  console.log("\n→ Ответь на каждый ВСЛУХ, 2–3 мин на вопрос\n");
}

// ─── CLI ─────────────────────────────────────────────────────────────────────
const arg = process.argv[2];

if (arg === "mix") {
  const day = 23;
  const data = getDailyQuestions(day);
  printQuestions(`MIX (день ${day})`, data.questions, { mix: true });
} else if (arg && arg.includes("-")) {
  const [from, to] = arg.split("-").map(Number);
  if (!from || !to || from > to) {
    console.error("Использование: node mockInterview/questions.js 1-5");
    process.exit(1);
  }
  const questions = getRangeQuestions(from, to);
  printQuestions(`Дни ${from}–${to}`, questions, { range: true, from, to });
} else {
  const day = Number(arg || 1);
  const data = getDailyQuestions(day);
  if (!data) {
    console.error(`День ${day} не найден. Доступно: 1–25, mix, или диапазон 1-5`);
    process.exit(1);
  }
  printQuestions(`День ${day}: ${data.label}`, data.questions, { mix: data.mix });
}
