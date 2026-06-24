// 🎯 MOCK INTERVIEW
// Запуск: node mockInterview/questions.js 1
//         node mockInterview/questions.js     (день 1 по умолчанию)

export const mockQuestions = {
  system: [
    "Спроектируй админку на 100 экранов. Как организуешь структуру?",
    "Как построить дизайн-систему для 5 продуктов?",
    "Как организовать микрофронтенды vs monorepo — когда что?",
    "Как масштабировать frontend-команду с 5 до 30 человек?",
    "Как бороться с ростом связности модулей?",
    "Спроектируй real-time dashboard с 10k updates/sec",
    "Как организовать CI/CD для frontend monorepo?",
    "Как мигрировать legacy jQuery app на React без big bang?",
  ],

  react: [
    "Почему компонент ререндерится и как это найти?",
    "useEffect vs useLayoutEffect — когда что?",
    "Почему index as key — плохая идея?",
    "Как работает React Fiber?",
    "Server Components vs Client Components — в чём разница?",
    "Когда SSR ухудшает производительность?",
    "Как организовать state: Redux vs Zustand vs TanStack Query?",
    "Что такое hydration mismatch и как избежать?",
  ],

  typescript: [
    "any vs unknown vs never — когда что?",
    "Что такое conditional types и distributive behavior?",
    "Как работает infer?",
    "Напиши тип DeepPartial<T>",
    "Type guard vs type assertion — в чём разница?",
    "Utility types: Pick vs Omit vs Extract vs Exclude",
    "Как типизировать API response с generic?",
    "Declaration merging — зачем нужен?",
  ],

  javascript: [
    "Почему Promise выполняется раньше setTimeout?",
    "Объясни event loop, call stack, micro/macro tasks",
    "Что такое closure и где используется?",
    "Разница между == и ===, typeof null",
    "Как работает this в arrow vs regular function?",
    "Debounce vs throttle — реализуй и объясни",
    "Что такое prototype chain?",
    "Как найти memory leak в Chrome DevTools?",
  ],
};

export function getDailyQuestions(day) {
  const d = (day - 1) % 8;
  return {
    day,
    system: mockQuestions.system[d],
    react: mockQuestions.react[d],
    typescript: mockQuestions.typescript[d],
    javascript: mockQuestions.javascript[d],
  };
}

const day = Number(process.argv[2] || 1);

console.log("\n🎯 Mock Interview — День", day, "\n");
console.log("SYSTEM:    ", getDailyQuestions(day).system);
console.log("REACT:     ", getDailyQuestions(day).react);
console.log("TYPESCRIPT:", getDailyQuestions(day).typescript);
console.log("JAVASCRIPT:", getDailyQuestions(day).javascript);
console.log("\n→ Ответь на каждый ВСЛУХ, 2–3 мин на вопрос\n");
