# Неделя 2 — TypeScript + React простым языком

---

## TypeScript — «подсказки для кода до запуска»

### any vs unknown vs never

```ts
let a: any = 'hello';
a.foo(); // TS молчит — 💣 упадёт в runtime

let b: unknown = 'hello';
b.foo(); // ❌ TS: сначала проверь тип
if (typeof b === 'string') b.toUpperCase(); // ✅
```

*Жизнь:* `any` — «мне плевать, что в коробке». `unknown` — «не знаю, открой и проверь».

### Generics — «шаблон для типа»

```ts
function first<T>(arr: T[]): T {
  return arr[0];
}
first([1, 2]);     // number
first(['a', 'b']); // string
```

*Жизнь:* форма «укажи тип данных» — работает и для чисел, и для строк.

### Utility types — «вырезать/добавить поля»

```ts
interface User { id: number; name: string; email: string; }

type Preview = Pick<User, 'id' | 'name'>;  // только id и name
type Draft = Partial<User>;                 // все поля необязательные
```

*Жизнь:* Pick — «дай только имя и фото из паспорта». Partial — «заполни что можешь».

---

## React — «UI = функция от данных»

### Reconciliation — «React сравнивает списки дел»

Ты дал React новый список покупок. Он не выкидывает всё — **сравнивает** со старым и меняет только отличия.

**key** — номерок на вещи.  
*Плохо:* key = index. Удалил первый элемент — React думает, что **все** элементы изменились.  
*Хорошо:* key = `item.id`.

### Fiber — «React может прерваться»

Раньше React рисовал всё разом — UI замирал.  
Fiber — разбил работу на кусочки. Между кусочками браузер успевает обработать клик.

*Жизнь:* не убираешь всю квартиру за раз — по одной комнате, между комнатами отвечаешь на звонок.

### Лишний рендер — «компонент перерисовался зря»

**Причины:**
1. Родитель перерисовался → дети тоже (по умолчанию)
2. Каждый раз новый объект в props: `style={{ color: 'red' }}` — новая ссылка!
3. Context поменялся → все подписчики

**Как найти:** React DevTools → Profiler → «Why did this render?»

**Fix:** `React.memo`, `useMemo`, `useCallback` — но **только** если Profiler показал проблему.

### useEffect vs useLayoutEffect

- **useEffect** — после того как пользователь **увидел** экран. Fetch, подписки.
- **useLayoutEffect** — после обновления DOM, но **до** показа. Измерить высоту блока.

*Жизнь:* useEffect — повесил картину когда гость уже в комнате. useLayoutEffect — поправил рамку до того как гость зашёл.

### useMemo / useCallback — «не пересчитывай зря»

```jsx
const expensive = useMemo(() => heavyCalc(data), [data]);
const handleClick = useCallback(() => doThing(id), [id]);
```

Нужны когда: тяжёлый расчёт или `React.memo` ребёнок.  
**Не нужны** «на всякий случай» — сами добавляют overhead.

### Context — «общая доска объявлений»

Все компоненты внутри Provider видят `theme`.  
⚠️ Поменял theme — **все** consumers перерисуются.  
*Fix:* разделить context (theme отдельно от user).

---

## A11y модалки (DAY 18)

Кратко — полная версия: `accessibleComponents.md`

*Жизнь:* модалка — отдельная комната. Focus trap — не даёшь выйти в коридор Tab-ом, пока не закроешь дверь. При закрытии — вернуть человека туда, откуда пришёл.

---

## Файлы недели

| День | SIMPLE (ты здесь) | Код |
|------|-------------------|-----|
| 06 | TS ☝️ | `anyTypes.ts` … `mappedTypes.ts` |
| 07–09 | React ☝️ | `reconciliation.jsx`, `fiber.jsx`, hooks… |
| 18 | a11y | `accessibleComponents.md` |

**Расписание:** `schedule/DAY_06` … `DAY_10`
