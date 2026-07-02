# Неделя 3–4 + Review — TypeScript + React (DAY 11–21)

> Читай **до** `.ts` / `.jsx` файлов.  
> Расписание: `schedule/DAY_11` … `DAY_21`  
> TypeScript — **4 дня** (11–14), не один. React — DAY 15–20.

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

# DAY 11 — TS 1/4: any, unknown, type guards

TypeScript = JS + проверка типов **до** запуска.

```ts
let a: any = 'hello';
a.foo(); // TS молчит — 💣

let b: unknown = 'hello';
if (typeof b === 'string') b.toUpperCase(); // ✅

function die(): never { throw new Error(); }
```

| | Жизнь |
|---|-------|
| `any` | «Мне плевать» — TS выключен |
| `unknown` | «Проверь сначала» |
| `never` | «Сюда код не дойдёт» |

## Type guards

```ts
function isUser(x: unknown): x is User {
  return typeof x === 'object' && x !== null && 'id' in x;
}
```

Способы: `typeof`, `instanceof`, `'key' in obj`, `x is Type`

---

# DAY 12 — TS 2/4: utility types + generics

```ts
type UserPreview = Pick<User, 'id' | 'name'>;
type UpdateUser = Partial<Omit<User, 'id'>>;

interface ApiResponse<T> { data: T; status: number; }
```

| Utility | Жизнь |
|---------|-------|
| `Partial` | Черновик формы |
| `Pick` | Только нужные поля |
| `Omit` | Всё кроме пароля |
| `Record` | Роль → права |

**Generics:** `function first<T>(arr: T[]): T`

**Практика:** `DeepPartial<T>` на бумаге

---

# DAY 13 — TS 3/4: infer + conditional types

```ts
type IsString<T> = T extends string ? true : false;

type ElementType<T> = T extends (infer U)[] ? U : never;
type Return<T> = T extends (...args: never[]) => infer R ? R : never;
```

**infer** — «вытащи тип изнутри».  
**Conditional** — `T extends U ? X : Y`

---

# DAY 14 — TS 4/4: mapped types + declarations

```ts
type ReadonlyUser = { readonly [K in keyof User]: User[K] };
```

**`.d.ts`** — типы без JS-кода для библиотек:

```ts
declare module 'legacy-lib' {
  export function doThing(x: string): void;
}
```

**declarationMerging** — когда interface дополняется.

## Чеклист — TS блок закрыт

- [ ] any vs unknown vs never
- [ ] Pick / Omit / Partial + generic
- [ ] infer + ReturnType
- [ ] mapped types + зачем .d.ts

---

# DAY 15 — Reconciliation + Fiber

React держит **Virtual DOM**. При update: новое дерево → diff → patch real DOM.

### key

```jsx
// ❌ index при delete/reorder
{items.map((item, i) => <Row key={i} />)}
// ✅ stable id
{items.map(item => <Row key={item.id} />)}
```

## Fiber

Render — можно прервать. Commit — нельзя.  
*Жизнь:* уборка по комнатам, между комнатами — ответил на клик.

---

# DAY 16 — Render cycle + hooks overview

```
setState → Render → Reconciliation → Commit
  → useLayoutEffect (до paint)
  → browser paint
  → useEffect (после paint)
```

| Hook | Зачем |
|------|-------|
| `useState` | State + rerender |
| `useEffect` | Side effects после paint |
| `useLayoutEffect` | DOM measure до paint |
| `useRef` | Без rerender |
| `useMemo` / `useCallback` | Memoization |
| `useContext` | Context |

**Правила hooks:** только top-level, только в React-функциях.

---

# DAY 17 — useEffect + useMemo / useCallback

```jsx
// Fetch — useEffect
useEffect(() => {
  fetch('/api').then(setData);
  return () => controller.abort();
}, []);

// Measure — useLayoutEffect
useLayoutEffect(() => setHeight(ref.current.offsetHeight), []);
```

**useMemo / useCallback** — только когда Profiler показал проблему. Не «на всякий случай».

---

# DAY 18 — Лишние рендеры + useDebounce

**Причины rerender:**
1. Parent rerender → children
2. Новый object/array в props каждый render
3. Fat Context
4. setState в render body

**Fix:** `React.memo`, split context, `useMemo`, поднять state.

**Hand coding:** `practice/handCoding/useDebounce.jsx`

---

# DAY 19 — Context + Concurrent

```jsx
// ❌ новый объект каждый render
<Ctx.Provider value={{ theme, setTheme }}>
```

**Fix:** split contexts или `useMemo` для value.

**useTransition** — срочный input vs отложенный тяжёлый filter.  
**useDeferredValue** — показать старое, пока считается новое.

---

# DAY 20 — Patterns + State management

| Паттерн | Зачем |
|---------|-------|
| Error Boundary | Fallback при ошибке render |
| Portal | Модалка в `document.body` |
| lazy + Suspense | Code split компонента |

## State — куда класть

| Данные | Где |
|--------|-----|
| API / server | **TanStack Query** |
| UI toggle, форма | `useState` |
| Global UI (cart, theme) | **Zustand** |
| Сложная client logic | **Redux/RTK** |

**Senior:** не клади fetch в Redux — для этого Query.

**Hand coding:** `practice/handCoding/miniStateManager.js`

---

# DAY 21 — Review недели 2 ★

## Marathon — объясни вслух

### Блок A — TypeScript (DAY 11–14)
- [ ] any vs unknown
- [ ] Pick / Omit / Partial
- [ ] Generic `ApiResponse<T>`
- [ ] infer + ReturnType
- [ ] mapped types + .d.ts

### Блок B — React core (DAY 15–17)
- [ ] Reconciliation + key=index problem
- [ ] Render vs Commit vs useEffect
- [ ] useLayoutEffect — 1 use case
- [ ] useMemo когда **не** нужен

### Блок C — React advanced (DAY 18–20)
- [ ] 3 причины лишнего rerender
- [ ] Context split fix
- [ ] Error Boundary limits
- [ ] Query vs Zustand vs Redux

## Практика

`practice/tasks-react/testScreen_1.js` — ответы вслух/письменно  
useDebounce + miniStateManager — 5 мин из памяти

## Mock

```bash
node mockInterview/questions.js 21
node mockInterview/questions.js 11-21   # опционально
```

---

## Чеклист «TS + React закрыты»

- [ ] DAY 11–20 по schedule
- [ ] Marathon DAY 21 — 3 блока
- [ ] testScreen_1 пройден

**Дальше → `theory/week3/SIMPLE_GUIDE.md` (DAY 22 — Next.js)**

**A11y (модалки) — подробно в `theory/week4/SIMPLE_GUIDE.md` DAY 28**
