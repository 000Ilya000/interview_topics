# Неделя 2 — TypeScript + React (DAY 06–10)

> Одна неделя = весь TS за день + React глубоко.  
> Расписание: `schedule/DAY_06` … `DAY_10`  
> Чекбоксы ниже: самопроверка. На GitHub не кликаются → [Issue «Прогресс»](../../issues/new?template=course_progress.md) или Obsidian.

---

# DAY 06 — TypeScript (весь блок за один день)

TypeScript = **JavaScript + проверка типов до запуска**. Ошибки ловишь в редакторе, не в проде.

## any vs unknown vs never

```ts
let a: any = 'hello';
a.foo(); // TS молчит — 💣 в runtime

let b: unknown = 'hello';
// b.toUpperCase(); // ❌
if (typeof b === 'string') b.toUpperCase(); // ✅

function die(): never {
  throw new Error('упало');
}
```

| | Простыми словами |
|---|------------------|
| `any` | «Мне плевать» — TS выключен |
| `unknown` | «Не знаю — проверь сначала» |
| `never` | «Сюда код не дойдёт» (throw, бесконечный цикл) |

*Жизнь:* `any` — коробка без маркировки. `unknown` — «открой и проверь содержимое».

**Файл:** `anyTypes.ts`

---

## Type Guards — «сузить тип»

```ts
function print(val: string | number) {
  if (typeof val === 'string') {
    console.log(val.toUpperCase()); // TS знает: string
  } else {
    console.log(val.toFixed(2));      // TS знает: number
  }
}

// Custom guard:
function isUser(x: unknown): x is User {
  return typeof x === 'object' && x !== null && 'id' in x;
}
```

Способы: `typeof`, `instanceof`, `'key' in obj`, `x is Type`

**Файл:** `typeGuards.ts`

---

## Generics — «шаблон типа»

```ts
function first<T>(arr: T[]): T {
  return arr[0];
}

interface ApiResponse<T> {
  data: T;
  status: number;
}

type UserResponse = ApiResponse<User>;
```

*Жизнь:* форма «укажи тип» — работает для User, Product, Order.

```tsx
function List<T>({ items, render }: { items: T[]; render: (item: T) => ReactNode }) {
  return items.map(render);
}
```

**Файл:** `generics.tsx`

---

## Utility Types — готовые трансформации

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;       // все поля ?
type RequiredUser = Required<User>;       // все обязательны
type UserPreview = Pick<User, 'id' | 'name'>;  // только id, name
type UserWithoutEmail = Omit<User, 'email'>;
type ReadonlyUser = Readonly<User>;

type Roles = 'admin' | 'user';
const perms: Record<Roles, boolean> = { admin: true, user: false };

type UserFn = () => User;
type UserReturn = ReturnType<UserFn>; // User
```

| Utility | Жизнь |
|---------|-------|
| `Partial` | Черновик формы — поля необязательны |
| `Pick` | Покажи только имя и фото из паспорта |
| `Omit` | Всё кроме пароля |
| `Record` | Таблица: роль → права |

**Файл:** `utilityTypes.ts`

---

## infer + Conditional + Mapped (Senior TS)

**Conditional:** `T extends U ? X : Y`
```ts
type IsString<T> = T extends string ? true : false;
type NonNullable<T> = T extends null | undefined ? never : T;
```

**infer** — «вытащи тип изнутри»:
```ts
type ElementType<T> = T extends (infer U)[] ? U : never;
type Return<T> = T extends (...args: never[]) => infer R ? R : never;
```

**Mapped:** `{ [K in keyof T]: T[K] }`

*Жизнь:* conditional — «если T строка — да, иначе нет». infer — «достань тип из Promise».

**Файлы:** `inferTypes.ts`, `conditionalTypes.ts`, `mappedTypes.ts`

---

## *.d.ts — типы без кода

```ts
// types/api.d.ts
declare module 'legacy-lib' {
  export function doThing(x: string): void;
}
```

Нужно для JS-библиотек без типов.

**Файл:** `declorations.d.ts`

---

## Чеклист TS — объясни вслух

- [ ] any vs unknown
- [ ] Type guard `x is User`
- [ ] Generic `<T>` на примере
- [ ] Pick vs Omit
- [ ] Зачем infer

---

# DAY 07 — Reconciliation + Fiber + Render Cycle

## Virtual DOM + Reconciliation

React держит **дерево UI в памяти** (Virtual DOM). При изменении state:

1. Строит **новое** дерево
2. **Сравнивает** со старым (diff)
3. Меняет **только** отличия в real DOM

*Жизнь:* список покупок изменился — переписываешь только изменённые строки, не всю тетрадь.

### key — номерок на элементе

```jsx
// ❌ Плохо — index как key при delete/reorder
{items.map((item, i) => <Row key={i} item={item} />)}

// ✅ Хорошо — stable id
{items.map(item => <Row key={item.id} item={item} />)}
```

Удалил первый элемент с index key — React думает, что **все** строки изменились. State «переедет» не туда.

**Файл:** `reconciliation.jsx`

---

## Fiber — React может прерваться

**Старая React:** рендерил всё разом → UI замирал на тяжёлой странице.

**Fiber:** разбил работу на **кусочки**. Между кусочками — браузер обрабатывает клики.

Две фазы:
- **Render** — можно прервать (посчитать diff)
- **Commit** — нельзя прервать (записать в DOM)

*Жизнь:* уборка по одной комнате. Между комнатами — ответил на звонок.

**Файл:** `fiber.jsx`

---

## Render Cycle — порядок

```
setState / props change
  → Render (вызов компонента, hooks)
  → Reconciliation (diff)
  → Commit (DOM update)
  → useLayoutEffect (sync, до paint)
  → browser paint
  → useEffect (async, после paint)
```

**Файл:** `renderCycle.jsx`

---

# DAY 08 — Hooks + Memo + Extra Renders

## Все hooks — шпаргалка

| Hook | Простыми словами |
|------|------------------|
| `useState` | Переменная, при изменении — ререндер |
| `useReducer` | useState для сложной логики (reducer) |
| `useEffect` | Side effect **после** paint (fetch, подписки) |
| `useLayoutEffect` | Side effect **до** paint (измерения DOM) |
| `useRef` | Коробка без ререндера (DOM ref, prev value) |
| `useMemo` | Запомнить результат вычисления |
| `useCallback` | Запомнить функцию |
| `useContext` | Прочитать context |
| `useId` | Стабильный id (SSR-safe) |

**Правила hooks:**
1. Только на **верхнем уровне** (не в if)
2. Только в React-функциях

**Файл:** `hooksOverview.jsx`

---

## useEffect vs useLayoutEffect

```jsx
// Fetch — useEffect (не блокируем UI)
useEffect(() => {
  fetch('/api').then(setData);
}, []);

// Измерить высоту блока — useLayoutEffect (до paint)
useLayoutEffect(() => {
  setHeight(ref.current.offsetHeight);
}, []);
```

*Жизнь:* useEffect — повесил картину, гость уже в комнате. useLayoutEffect — поправил рамку **до** входа гостя.

**Файл:** `useEffectUseLayoutEffect.jsx`

---

## useMemo / useCallback — не «на всякий случай»

```jsx
const sorted = useMemo(() => heavySort(items), [items]);

const handleClick = useCallback(() => {
  doThing(id);
}, [id]);

const MemoChild = React.memo(Child);
// MemoChild ререндерится только если props по ссылке те же
```

**Когда нужно:** Profiler показал лишний рендер + тяжёлый child или вычисление.

**Когда НЕ нужно:** «на всякий случай» — сами добавляют overhead.

**Файл:** `useMemoUseCallback.jsx`

---

## Лишние рендеры — найти и fix

**Причины:**
1. Parent rerender → children тоже (default)
2. `style={{ color: 'red' }}` — **новый объект** каждый render
3. Context изменился → все consumers
4. `setState` в render body → бесконечный цикл

**Как найти:** React DevTools → Profiler → record → «Why did this render?»

**Fix:** `React.memo`, `useMemo`, `useCallback`, split context, поднять state ближе к месту использования.

**Файл:** `extraRenders.jsx`

**Hand coding:** `practice/handCoding/useDebounce.jsx`

---

# DAY 09 — Context + Concurrent + Patterns

## Context

```jsx
const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Page />
    </ThemeContext.Provider>
  );
}
```

⚠️ `value={{ theme, setTheme }}` — **новый объект** каждый render → все consumers ререндерятся.

**Fix:** `useMemo(() => ({ theme, setTheme }), [theme])` или split contexts.

**Файл:** `context.jsx`

---

## Concurrent — useTransition, useDeferredValue

```jsx
const [isPending, startTransition] = useTransition();

const handleChange = (e) => {
  setInput(e.target.value);              // срочно — input отзывчив
  startTransition(() => {
    setFilter(e.target.value);           // можно подождать — тяжёлый список
  });
};
```

*Жизнь:* печатаешь в поиске — буквы появляются сразу, фильтрация списка — «когда успеет».

**Файл:** `concurrentFeatures.jsx`

---

## Error Boundaries, Portals, Lazy

**Error Boundary** — ловит ошибку рендера, показывает fallback:
```jsx
// Только class или react-error-boundary
// Не ловит: event handlers, async, SSR
```

**Portal** — модалка рендерится в `document.body`, но логически в React tree:
```jsx
createPortal(<Modal />, document.getElementById('modal-root'));
```

**Lazy + Suspense** — code splitting:
```jsx
const Page = lazy(() => import('./Page'));
<Suspense fallback={<Spinner />}><Page /></Suspense>
```

**Файл:** `advancedPatterns.jsx`

**Hand coding:** `practice/handCoding/miniStateManager.js`

---

# DAY 10 — Повторение недели 2

## Чеклист — объясни вслух

- [ ] any vs unknown vs never
- [ ] Pick, Omit, Partial
- [ ] Generic на примере компонента
- [ ] Зачем key, почему не index
- [ ] Render vs Commit phase
- [ ] useEffect vs useLayoutEffect
- [ ] 3 причины лишнего рендера
- [ ] Когда useMemo реально нужен
- [ ] Context — почему все ререндерятся
- [ ] useTransition — зачем

**Практика:** `practice/tasks-react/`, useDebounce + miniStateManager из памяти

**Mock:** `node mockInterview/questions.js 6` … `10`

---

## Все файлы недели 2

| DAY | Темы | Файлы |
|-----|------|-------|
| 06 | TypeScript | `anyTypes.ts`, `typeGuards.ts`, `generics.tsx`, `utilityTypes.ts`, `inferTypes.ts`, `conditionalTypes.ts`, `mappedTypes.ts`, `declorations.d.ts` |
| 07 | Reconciliation, Fiber | `reconciliation.jsx`, `fiber.jsx`, `renderCycle.jsx` |
| 08 | Hooks, memo | `hooksOverview.jsx`, `useEffectUseLayoutEffect.jsx`, `useMemoUseCallback.jsx`, `extraRenders.jsx` |
| 09 | Context, Concurrent | `context.jsx`, `concurrentFeatures.jsx`, `advancedPatterns.jsx` |
| 10 | Review | `smthTasks.jsx`, `tasks-react/` |

**A11y модалки (неделя 4):** `accessibleComponents.md`
