# Неделя 3–4 + Review — TypeScript + React (DAY 11–21)

> Читай **до** `.ts` / `.jsx` — здесь объяснение «как коллеге».  
> Расписание: `schedule/DAY_11` … `DAY_21`  
> **TypeScript — 4 дня (11–14), не один.** React — DAY 15–20.

| День | Тема | Файлы |
|------|------|-------|
| 11 | TS 1/4: any + guards | `anyTypes.ts`, `typeGuards.ts` |
| 12 | TS 2/4: utility + generics | `utilityTypes.ts`, `generics.tsx` |
| 13 | TS 3/4: infer + conditional | `inferTypes.ts`, `conditionalTypes.ts` |
| 14 | TS 4/4: mapped + .d.ts | `mappedTypes.ts`, `declorations.d.ts`, `declarationMerging.d.ts` |
| 15 | Reconciliation + Fiber | `reconciliation.jsx`, `fiber.jsx` |
| 16 | Render cycle + hooks overview | `renderCycle.jsx`, `hooksOverview.jsx` |
| 17 | useEffect + useMemo | `useEffectUseLayoutEffect.jsx`, `useMemoUseCallback.jsx` |
| 18 | Extra renders + useDebounce | `extraRenders.jsx` → `useDebounce.jsx` ✍️ |
| 19 | Context + Concurrent | `context.jsx`, `concurrentFeatures.jsx` |
| 20 | Patterns + state mgmt | `advancedPatterns.jsx`, `stateManagement.jsx` → `miniStateManager.js` ✍️ |
| 21 | **Review W2** | marathon + `testScreen_1.js` + mock 11–21 |

---

# DAY 11 — TS 1/4: any, unknown, never + type guards

TypeScript = **JavaScript + проверка типов до запуска**. Ошибки ловишь в IDE, не в проде у пользователя.

## any vs unknown vs never — `anyTypes.ts`

```ts
let a: any = 'hello';
a.foo();        // TS молчит — 💣 в runtime
a = 42;
a.toFixed();    // тоже ok для TS

let b: unknown = 'hello';
// b.toUpperCase(); // ❌ TS: Object is of type 'unknown'
if (typeof b === 'string') {
  b.toUpperCase(); // ✅ сузили тип
}

function die(): never {
  throw new Error('упало');
  // или бесконечный цикл — сюда код после never не дойдёт
}

function exhaustive(x: 'a' | 'b'): string {
  switch (x) {
    case 'a': return 'A';
    case 'b': return 'B';
    default:
      const _check: never = x; // если добавят 'c' — TS ошибка
      return _check;
  }
}
```

| Тип | Простыми словами | Жизнь |
|-----|------------------|-------|
| `any` | «Мне плевать» — TS выключен | Коробка без маркировки |
| `unknown` | «Не знаю — проверь сначала» | Открой и проверь содержимое |
| `never` | «Сюда код не дойдёт» | exhaustive check в switch |
| `void` | Функция ничего полезного не возвращает | `console.log` |

**На собесе:** «Почему unknown лучше any?» — заставляет проверять перед использованием.

---

## Type Guards — «сузить тип» — `typeGuards.ts`

```ts
function print(val: string | number) {
  if (typeof val === 'string') {
    console.log(val.toUpperCase()); // TS: string
  } else {
    console.log(val.toFixed(2));    // TS: number
  }
}

interface User { id: string; name: string; }

function isUser(x: unknown): x is User {
  return (
    typeof x === 'object' &&
    x !== null &&
    'id' in x &&
    'name' in x
  );
}

function handle(data: unknown) {
  if (isUser(data)) {
    console.log(data.name); // TS: User
  }
}
```

**Способы сужения:**
- `typeof` — примитивы
- `instanceof` — классы
- `'key' in obj` — discriminated object
- Custom guard `x is Type` — переиспользуемая проверка

**Файлы:** `anyTypes.ts`, `typeGuards.ts`

### Чеклист DAY 11

- [ ] any vs unknown vs never
- [ ] Custom guard `x is User`
- [ ] typeof vs in

---

# DAY 12 — TS 2/4: utility types + generics

## Utility Types — `utilityTypes.ts`

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type PartialUser = Partial<User>;              // все поля optional
type RequiredUser = Required<PartialUser>;     // обратно required
type UserPreview = Pick<User, 'id' | 'name'>;  // только id, name
type UserPublic = Omit<User, 'password'>;      // всё кроме password
type ReadonlyUser = Readonly<User>;

type Roles = 'admin' | 'user' | 'guest';
type Permissions = Record<Roles, boolean>;
// { admin: boolean; user: boolean; guest: boolean }

type UserFn = () => User;
type UserReturn = ReturnType<UserFn>; // User
type UserArgs = Parameters<(id: number, name: string) => void>; // [number, string]
```

| Utility | Жизнь |
|---------|-------|
| `Partial` | PATCH-запрос — все поля необязательны |
| `Pick` | Карточка пользователя — только имя и аватар |
| `Omit` | Форма без password в state |
| `Record` | Таблица: роль → права доступа |

**DeepPartial** (на бумаге) — рекурсивно optional все поля вложенных объектов.

---

## Generics — «шаблон типа» — `generics.tsx`

```ts
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

interface ApiResponse<T> {
  data: T;
  status: number;
  error?: string;
}

type UserResponse = ApiResponse<User>;

// Constraint — T должен иметь id
function getById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}
```

**В React:**
```tsx
function List<T>({ items, render }: {
  items: T[];
  render: (item: T) => React.ReactNode;
}) {
  return <>{items.map(render)}</>;
}
```

*Жизнь:* форма «укажи тип T» — работает для User, Product, Order без копипасты.

**Файлы:** `utilityTypes.ts`, `generics.tsx`

### Чеклист DAY 12

- [ ] Pick vs Omit — пример
- [ ] Partial для update DTO
- [ ] Generic `ApiResponse<T>`

---

# DAY 13 — TS 3/4: infer + conditional types

## Conditional types — `conditionalTypes.ts`

```ts
type IsString<T> = T extends string ? true : false;
// IsString<'hello'> = true
// IsString<42> = false

type NonNullable<T> = T extends null | undefined ? never : T;

// Distributive — применяется к каждому члену union
type ToArray<T> = T extends any ? T[] : never;
type StrOrNumArr = ToArray<string | number>; // string[] | number[]
```

**Conditional** = `T extends U ? X : Y` — «если T подходит под U, то тип X, иначе Y».

---

## infer — «вытащи тип изнутри» — `inferTypes.ts`

```ts
type ElementType<T> = T extends (infer U)[] ? U : never;
// ElementType<string[]> = string

type PromiseValue<T> = T extends Promise<infer V> ? V : T;
// PromiseValue<Promise<User>> = User

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

*Жизнь:* infer — «достань тип элемента массива / возврат функции / unwrap Promise».

**На собесе:** объясни как работает встроенный `ReturnType<typeof fn>`.

**Файлы:** `inferTypes.ts`, `conditionalTypes.ts`

### Чеклист DAY 13

- [ ] Conditional type — синтаксис
- [ ] infer в массиве и Promise
- [ ] ReturnType на примере

---

# DAY 14 — TS 4/4: mapped types + declarations

## Mapped types — `mappedTypes.ts`

```ts
type ReadonlyUser = { readonly [K in keyof User]: User[K] };

type OptionalUser = { [K in keyof User]?: User[K] };

type Mutable<T> = { -readonly [K in keyof T]: T[K] }; // убрать readonly

type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
```

**Mapped** = пройти по всем ключам `keyof T` и построить новый тип.

---

## Declaration files — `declorations.d.ts`, `declarationMerging.d.ts`

**.d.ts** — типы **без** JS-кода:

```ts
// types/styles.d.ts
declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module 'legacy-lib' {
  export function doThing(x: string): void;
}
```

**Зачем:** JS-библиотека без типов, CSS modules, расширение глобального `Window`.

**Declaration merging** — несколько `interface Window` / `namespace` дополняют друг друга.

### Чеклист TS блок закрыт (DAY 11–14)

- [ ] any vs unknown vs never
- [ ] Pick / Omit / Partial + generic
- [ ] infer + ReturnType
- [ ] mapped types + .d.ts зачем
- [ ] Перечисли вслух 4 дня TS без подсказок

**Дальше React → DAY 15**

---

# DAY 15 — Reconciliation + Fiber

## Virtual DOM + Reconciliation — `reconciliation.jsx`

React держит **дерево UI в памяти** (Virtual DOM). При изменении state:

1. Вызывает компоненты → строит **новое** дерево элементов
2. **Сравнивает** (diff) со старым
3. Меняет **только** отличия в real DOM (patch)

*Жизнь:* список покупок изменился — переписываешь только изменённые строки, не всю тетрадь.

**React сравнивает по type + key.** Если type другой — subtree пересоздаётся.

### key — зачем не index

```jsx
// ❌ index как key при delete/reorder
{items.map((item, i) => <Row key={i} item={item} />)}

// ✅ stable id из данных
{items.map(item => <Row key={item.id} item={item} />)}
```

Удалили первый элемент с index key — React думает, что **все** строки изменились. State input'ов «переедет» к другому item.

---

## Fiber — React может прерваться — `fiber.jsx`

**Старая React:** рендерил всё дерево разом → тяжёлая страница замирала.

**Fiber:** разбил работу на **кусочки** (units of work). Между кусочками — браузер обрабатывает клики, scroll.

**Две фазы:**
- **Render** (reconciliation) — можно прервать, низкий приоритет
- **Commit** — запись в DOM, нельзя прервать

*Жизнь:* уборка по одной комнате. Между комнатами — ответил на звонок.

**Файлы:** `reconciliation.jsx`, `fiber.jsx`

### Чеклист DAY 15

- [ ] Virtual DOM — зачем
- [ ] key=index problem
- [ ] Render vs Commit phase

---

# DAY 16 — Render cycle + hooks overview

## Порядок — `renderCycle.jsx`

```
setState / props change
  → Render phase (вызов компонента, hooks, построение vDOM)
  → Reconciliation (diff)
  → Commit phase (DOM update, refs, useLayoutEffect)
  → Browser paint (пользователь видит)
  → useEffect (async, после paint)
```

**useLayoutEffect** — синхронно **после** DOM update, **до** paint.  
**useEffect** — **после** paint. Не блокирует отрисовку.

---

## Hooks overview — `hooksOverview.jsx`

| Hook | Простыми словами |
|------|------------------|
| `useState` | Переменная; при setState — rerender |
| `useReducer` | useState для сложной логики (reducer + dispatch) |
| `useEffect` | Side effect после paint (fetch, подписки) |
| `useLayoutEffect` | Effect до paint (measure DOM, sync layout) |
| `useRef` | `.current` без rerender (DOM node, prev value, timer id) |
| `useMemo` | Запомнить **результат** вычисления |
| `useCallback` | Запомнить **функцию** |
| `useContext` | Прочитать context без prop drilling |
| `useId` | Стабильный id (SSR-safe для label) |

**Правила hooks:**
1. Только на **верхнем уровне** — не в if/for
2. Только в React-функциях / custom hooks

**Файлы:** `renderCycle.jsx`, `hooksOverview.jsx`

### Чеклист DAY 16

- [ ] Render → Commit → useEffect timeline
- [ ] useLayout vs useEffect — когда что
- [ ] 5 hooks назови с use case

---

# DAY 17 — useEffect / useLayoutEffect + useMemo / useCallback

## useEffect — deps и cleanup — `useEffectUseLayoutEffect.jsx`

```jsx
useEffect(() => {
  const controller = new AbortController();
  fetch('/api', { signal: controller.signal })
    .then(r => r.json())
    .then(setData);
  return () => controller.abort(); // cleanup при unmount или смене deps
}, [userId]); // пустой [] — только mount/unmount
```

| deps | Поведение |
|------|-----------|
| нет массива | Каждый render |
| `[]` | Только mount (+ cleanup unmount) |
| `[a, b]` | При изменении a или b |

**Stale closure:** если в effect старый state — добавь в deps или functional update.

**useLayoutEffect** — измерить `offsetHeight`, синхронно поправить layout до того как пользователь увидит «мигание».

**Файл:** `useEffectUseLayoutEffect.jsx`

---

## useMemo / useCallback — `useMemoUseCallback.jsx`

```jsx
const sorted = useMemo(() => heavySort(items), [items]);

const handleClick = useCallback(() => {
  doThing(id);
}, [id]);

const MemoChild = React.memo(Child);
// MemoChild rerender только если props shallow-equal
```

**Когда нужно:** Profiler показал лишний рендер + тяжёлый child или дорогое вычисление.

**Когда НЕ нужно:**
- «На всякий случай» — сами добавляют overhead
- Дешёвые вычисления
- Child не обёрнут в memo — useCallback бесполезен

**Файл:** `useMemoUseCallback.jsx`

### Чеклист DAY 17

- [ ] useEffect cleanup — зачем
- [ ] deps [] vs [x]
- [ ] useMemo vs useCallback
- [ ] Когда memo не нужен

---

# DAY 18 — Лишние рендеры + useDebounce

## Причины rerender — `extraRenders.jsx`

1. **Parent rerender** → все children (default, без memo)
2. **Новый object/array в props** каждый render: `style={{ color: 'red' }}`
3. **Context value** — новый объект → все consumers
4. **setState в render body** → бесконечный цикл
5. **key меняется** → unmount/remount

**Как найти:** React DevTools → Profiler → record → «Why did this render?»

**Fix:**
- `React.memo` на чистый child
- `useMemo` / `useCallback` для стабильных props
- Split context (theme отдельно от user)
- Поднять state ближе к месту использования

---

## useDebounce hook ✍️

Связка closure + useEffect + cleanup timer.

**Hand coding:** `practice/handCoding/useDebounce.jsx` → `solutions/`

**Файл:** `extraRenders.jsx`

### Чеклист DAY 18

- [ ] 3 причины rerender
- [ ] Profiler — что смотреть
- [ ] useDebounce написал руками

---

# DAY 19 — Context + Concurrent features

## Context — `context.jsx`

```jsx
const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  // ❌ новый объект каждый render → все consumers rerender
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Page />
    </ThemeContext.Provider>
  );
}
```

**Fix:**
```jsx
const value = useMemo(() => ({ theme, setTheme }), [theme]);
// или split: ThemeContext + ThemeDispatchContext
```

*Жизнь:* megaphone в офисе — все слышат, даже кто не нужен. Split = личные каналы.

---

## Concurrent — `concurrentFeatures.jsx`

**useTransition** — пометить update как non-urgent:
```jsx
const [isPending, startTransition] = useTransition();

const handleChange = (e) => {
  setInput(e.target.value);              // urgent — input сразу
  startTransition(() => {
    setFilteredList(heavyFilter(e.target.value)); // можно подождать
  });
};
```

**useDeferredValue** — показать старое значение, пока считается новое (для тяжёлого списка).

**Suspense** — показать fallback пока lazy/server component грузится.

**Файлы:** `context.jsx`, `concurrentFeatures.jsx`

### Чеклист DAY 19

- [ ] Context rerender fix
- [ ] useTransition — urgent vs non-urgent
- [ ] useDeferredValue vs debounce

---

# DAY 20 — Advanced patterns + State management

## Patterns — `advancedPatterns.jsx`

**Error Boundary** — ловит ошибку **рендера** дочерних, показывает fallback:
```jsx
// class component или react-error-boundary
// НЕ ловит: event handlers, async, SSR errors внутри
```

**Portal** — модалка рендерится в `document.body`, логически в React tree:
```jsx
createPortal(<Modal />, document.getElementById('modal-root'));
```

**Lazy + Suspense:**
```jsx
const Page = lazy(() => import('./Page'));
<Suspense fallback={<Spinner />}><Page /></Suspense>
```

---

## State management — `stateManagement.jsx`

| Данные | Где | Жизнь |
|--------|-----|-------|
| Поле input, toggle | `useState` | Записка на столе |
| Server / API | **TanStack Query** | Общая доска с API |
| Cart, theme, UI prefs | **Zustand** | Ящик в open space |
| Сложная logic, audit, undo | **Redux/RTK** | Бухгалтерия с журналом |
| Фильтры в URL | searchParams | Адрес на двери |

**Senior-правило:** **Не клади fetch в Redux** — для server state есть Query.

**Hand coding:** `practice/handCoding/miniStateManager.js` — pub/sub store

**Файлы:** `advancedPatterns.jsx`, `stateManagement.jsx`

### Чеклист DAY 20

- [ ] Error Boundary — что ловит / не ловит
- [ ] Portal — зачем
- [ ] Query vs Zustand vs Redux
- [ ] miniStateManager руками

---

# DAY 21 — Review недели 2 ★

## Marathon — объясни вслух **без файлов** (~40 мин)

### Блок A — TypeScript (DAY 11–14) ~12 мин
- [ ] any vs unknown vs never
- [ ] Type guard `x is User`
- [ ] Pick / Omit / Partial — пример формы
- [ ] Generic `ApiResponse<T>`
- [ ] infer + ReturnType
- [ ] mapped types + .d.ts

### Блок B — React core (DAY 15–17) ~12 мин
- [ ] Reconciliation + key=index
- [ ] Render vs Commit vs useEffect timing
- [ ] useLayoutEffect — measure DOM
- [ ] useMemo когда **не** нужен
- [ ] useEffect deps + cleanup

### Блок C — React advanced (DAY 18–20) ~12 мин
- [ ] 3 причины лишнего rerender + Profiler
- [ ] Context split fix
- [ ] useTransition
- [ ] Error Boundary limits
- [ ] Server state → Query

## Практика

`practice/tasks-react/testScreen_1.js` — ответы вслух  
useDebounce + miniStateManager — 5 мин из памяти

## Mock

```bash
node mockInterview/questions.js 21
node mockInterview/questions.js 11-21   # опционально
```

---

## Чеклист «TS + React закрыты»

- [ ] DAY 11–20 по schedule
- [ ] Marathon DAY 21
- [ ] testScreen_1

**Дальше → `theory/week3/SIMPLE_GUIDE.md` (DAY 22 — Next.js)**

**A11y модалки — подробно в `theory/week4/SIMPLE_GUIDE.md` DAY 28**
