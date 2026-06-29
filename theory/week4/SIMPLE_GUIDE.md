# Недели 4–5 — Performance + A11y + Архитектура + Mock (DAY 16–25)

> Неделя 4 = Senior perf + a11y. Неделя 5 = архитектура + финальный mock.  
> Расписание: `schedule/DAY_16` … `DAY_25`  
> Чекбоксы ниже: самопроверка. На GitHub не кликаются → [Issue «Прогресс»](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md) или Obsidian.

---

# DAY 16 — Reflow vs Repaint ★ Senior

→ Полная версия: **`theory/week1/reflowRepaint.md`**

## Цепочка: Layout → Paint → Composite

```
Layout (Reflow)  →  Paint  →  Composite
   геометрия          цвета      GPU-слои
   width, height      color      transform
                      shadow     opacity
```

| Шаг | Что пересчитывает | Триггеры |
|-----|-------------------|----------|
| **Layout** | Позиция, размер | `width`, `height`, `font-size`, DOM insert |
| **Paint** | Внешний вид | `color`, `background`, `box-shadow` |
| **Composite** | GPU-слои | `transform`, `opacity` |

**Правило:** чем правее — тем дешевле для анимаций.

```css
/* ❌ Layout + Paint + Composite каждый кадр */
.box { left: 100px; transition: left 0.3s; }

/* ✅ Часто только Composite */
.box { transform: translateX(100px); transition: transform 0.3s; }
```

*Жизнь:* `left` — переставляешь мебель (layout). `transform` — двигаешь на роликах поверх пола (GPU).

**Файлы:** `reflowRepaint.md`, `renderingPipeline.js`

---

## Layout thrashing — «дёргание» layout

```js
// ❌ read → write → read → write в цикле
elements.forEach(el => {
  el.style.width = el.offsetWidth + 10 + 'px';
});

// ✅ Сначала все read, потом все write
const widths = elements.map(el => el.offsetWidth);
elements.forEach((el, i) => {
  el.style.width = widths[i] + 10 + 'px';
});
```

Браузер вынужден **синхронно** пересчитывать layout на каждой итерации.

**Fix:** batch reads/writes, `requestAnimationFrame` для DOM-изменений.

---

## will-change и compositor layers

```css
.animated { will-change: transform; }
```

Подсказка браузеру: «скоро анимирую — создай GPU-слой заранее».

⚠️ Каждый layer = текстура в памяти. Не ставь на всё подряд.

---

## DevTools — как проверить

1. **Performance** tab → запиши анимацию → ищи фиолетовые «Layout»
2. **Rendering → Paint flashing** — зелёная подсветка перерисованных областей
3. Сравни `left` vs `transform` — Layout blocks должны исчезнуть

---

## Связь с CLS

Reflow во время загрузки → элементы **прыгают** → плохой CLS (Cumulative Layout Shift).

**Fix:** резервируй место под картинки (`width`/`height`), не вставляй контент над уже видимым.

---

## Чеклист DAY 16

- [ ] Layout → Paint → Composite — что каждый делает
- [ ] Почему transform лучше left
- [ ] Layout thrashing — пример и fix
- [ ] will-change — зачем и overhead
- [ ] Связь reflow с CLS

---

# DAY 17 — Code Splitting ★ Senior

→ Полная версия: **`theory/week3/codeSplitting.md`**

## Зачем

Один `bundle.js` на 2 MB = пользователь качает **всё** приложение, хотя нужна одна страница.

Code splitting — грузим JS **кусками**, когда нужен.

---

## Шаг 0: Bundle Analyzer

```bash
npx vite-bundle-visualizer   # Vite
npx webpack-bundle-analyzer stats.json  # Webpack
```

Ищи: moment.js целиком, lodash без tree-shake, chart-lib на главной.

---

## Три стратегии

| Стратегия | Что режем | Пример |
|-----------|-----------|--------|
| **По роутам** | Каждая страница — chunk | `React.lazy(() => import('./Dashboard'))` |
| **По фичам** | Тяжёлый редактор по клику | `import('./RichEditor')` on demand |
| **По вендорам** | react, react-dom отдельно | `manualChunks` в Vite |

```jsx
const Dashboard = lazy(() => import('./pages/Dashboard'));

<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>
```

*Жизнь:* не тащи весь шкаф — возьми нужный ящик.

---

## preload vs prefetch

| | preload | prefetch |
|---|---------|----------|
| Приоритет | Высокий — нужен **сейчас** | Низкий — **скоро** понадобится |
| Когда | Критичный chunk страницы | Следующая страница по hover |

Next.js `<Link prefetch>` — prefetch соседних роутов.

---

## Tree shaking + sideEffects

```json
// package.json библиотеки
"sideEffects": false  // «можно выкинуть неиспользуемое»
```

Импортируй точечно: `import debounce from 'lodash/debounce'`, не `import _ from 'lodash'`.

---

## HTTP/2 и чанки

HTTP/2 мультиплексирует запросы — **несколько маленьких чанков** часто лучше одного огромного bundle (параллельная загрузка, кэширование по файлам).

---

## Что сказать на собесе

> «Сначала analyzer — что тяжёлое. Потом split по роутам (lazy), тяжёлые фичи — dynamic import. Vendor chunk отдельно. Prefetch следующую страницу. sideEffects для tree-shake.»

**Файлы:** `codeSplitting.md`, `advancedPatterns.jsx`

---

# DAY 18 — Доступные компоненты ★ Senior

→ Полная версия: **`theory/week2/accessibleComponents.md`**

## Минимум (Middle)

```jsx
<div role="dialog" aria-labelledby="title" aria-modal="true">
  <h2 id="title">Подтверждение</h2>
  <button onClick={onClose}>Закрыть</button>
</div>
```

- `role="dialog"` — это модалка
- `aria-modal="true"` — фон неактивен
- `aria-labelledby` — screen reader озвучит заголовок
- **Escape** закрывает

**Файл:** `htmlCssA11y.js` (база семантики)

---

## Focus trap — зачем

Модалка открыта → Tab → фокус уходит **под** модалку на фон. Человек с клавиатуры теряется.

**Focus trap:** Tab циклически ходит **только** внутри модалки:
```
Tab → кнопка 1 → кнопка 2 → «Закрыть» → снова кнопка 1
```

Radix/Focus Trap React делают автоматически. **Senior** понимает **зачем**.

---

## Возврат фокуса на триггер

```jsx
const triggerRef = useRef(null);

function openModal() {
  triggerRef.current = document.activeElement;
  setOpen(true);
}

function closeModal() {
  setOpen(false);
  triggerRef.current?.focus(); // вернули на «Открыть»
}
```

Без этого: закрыл модалку → фокус пропал.

---

## aria-hidden vs inert

| | aria-hidden | inert |
|---|-------------|-------|
| Screen reader | Скрывает | Скрывает |
| Tab/клики | ❌ Не блокирует | ✅ Блокирует |
| Поддержка | Везде | Современные браузеры |

**Senior:** `aria-hidden` не блокирует Tab — нужен focus trap. `inert` блокирует всё.

---

## prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

Уважай настройку ОС «уменьшить движение».

---

## Как тестировать

1. **Tab** — пройди форму/модалку только клавиатурой
2. **Escape** — закрывает?
3. **VoiceOver** (Mac) / **NVDA** (Win) — озвучивает заголовок?
4. Фокус уходит на фон? → баг

**Практика:** открой любую модалку на сайте → Tab. Фокус на фоне = баг.

---

## Чеклист DAY 18

- [ ] Focus trap — зачем
- [ ] Возврат фокуса на триггер
- [ ] aria-hidden vs inert
- [ ] prefers-reduced-motion
- [ ] Как тестировать Tab + screen reader

---

# DAY 19 — Web Vitals + Протоколы + WebSocket

## Core Web Vitals — пороги

| Метрика | Что измеряет | Хорошо | Жизнь |
|---------|--------------|--------|-------|
| **LCP** | Largest Contentful Paint — главный контент | < 2.5s | Когда принесли основное блюдо |
| **INP** | Interaction to Next Paint — отклик на клик | < 200ms | Как быстро официант отреагировал |
| **CLS** | Cumulative Layout Shift — прыжки вёрстки | < 0.1 | Стол дёрнулся когда поставили салат |

### Как улучшить LCP
- SSR/SSG для first paint
- Оптимизация изображений (WebP, lazy)
- Preload критичных ресурсов
- CDN ближе к пользователю

### Как улучшить INP
- Меньше JS на main thread
- `startTransition` для тяжёлых обновлений
- Debounce/throttle обработчиков

### Как улучшить CLS
- `width`/`height` на `<img>`
- Не вставляй контент над видимым
- `font-display: swap` с fallback размером

**Файл:** `webVitals.js`

---

## HTTP vs WebSocket vs GraphQL

| | HTTP | WebSocket | GraphQL |
|---|------|-----------|---------|
| Связь | Запрос → ответ | Постоянное двустороннее | Один endpoint, гибкий query |
| Когда | CRUD, REST API | Чат, live updates, игры | Сложные связанные данные |
| Пример | `fetch('/api/users')` | `new WebSocket('wss://...')` | `query { user { posts { title } } }` |

*Жизнь:*
- HTTP — позвонил, спросил, положил трубку
- WebSocket — открытая линия, оба говорят когда хотят
- GraphQL — «принеси мне именно это и это, не всё меню»

**Файлы:** `protokols.js`, `websocketReact.jsx`

---

## Чеклист DAY 19

- [ ] LCP, INP, CLS — пороги и как улучшить
- [ ] HTTP vs WebSocket — когда что
- [ ] GraphQL — зачем один endpoint

---

# DAY 20 — Повторение Senior-блоков (недели 3–4)

## EXPLAIN marathon — отметь ❌ где слабо

- [ ] XSS — 3 вида + защита
- [ ] CSRF — механизм + SameSite
- [ ] Race condition + AbortController
- [ ] Dedup + stale-while-revalidate
- [ ] Layout → paint → composite
- [ ] Layout thrashing
- [ ] Code splitting — 3 стратегии
- [ ] Focus trap + возврат фокуса
- [ ] aria-hidden vs inert
- [ ] LCP / INP / CLS

## MOCK

8 вопросов по Senior-темам — ответы вслух

**Senior `.md` для повторения:**
- `theory/week3/xssCsrf.md`
- `theory/week3/reliableDataFetching.md`
- `theory/week1/reflowRepaint.md`
- `theory/week3/codeSplitting.md`
- `theory/week2/accessibleComponents.md`

---

# DAY 21 — Architecture + State Management

## FSD — «разложить проект по полкам»

```
app/       → настройки, роутинг, providers (потолок)
pages/     → целые страницы (комнаты)
widgets/   → большие блоки: Header, Sidebar (мебель)
features/  → действия пользователя: Login, AddToCart (выключатели)
entities/  → бизнес-сущности: User, Product (предметы)
shared/    → ui-kit, api, utils, config (инструменты)
```

**Правило импортов:** только **вниз**. `features` не тянет из `pages`. `entities` не тянет из `features`.

```
app → pages → widgets → features → entities → shared
```

*Жизнь:* кухня не лезет в спальню за продуктами — всё через кладовку (`shared`).

**На собесе «50 разработчиков»:** FSD или monorepo + eslint на импорты + code review.

**Файл:** `featureSlicedDesign.js`

---

## Clean Architecture — слои

```
UI (React) → Use Cases → Domain → Infrastructure (API, DB)
```

UI не знает про fetch напрямую — получает данные через use case / hook.

**Файл:** `cleanArchitecture.js`

---

## State — «где хранить данные»

| Данные | Где | Жизнь |
|--------|-----|-------|
| Поле ввода, toggle | `useState` | Записка на столе |
| Данные с API | **TanStack Query** | Общая доска с API, автообновление |
| Корзина, UI prefs, theme | **Zustand** | Общий ящик в open space |
| Сложная бизнес-логика, audit | **Redux/RTK** | Бухгалтерия с журналом операций |
| URL-фильтры, табы | URL searchParams | Адрес на двери комнаты |

### TanStack Query vs Redux vs Zustand

| | Query | Zustand | Redux/RTK |
|---|-------|---------|-----------|
| Server state | ✅ Идеально | ❌ | ❌ Overkill |
| Client UI state | ❌ | ✅ | ✅ |
| DevTools time-travel | ❌ | ⚠️ | ✅ |
| Boilerplate | Мало | Мало | Больше |

**Senior-правило:** **Не клади API в Redux** — для этого Query. Redux — сложная client-side логика с предсказуемым flow.

**Файлы:** `stateManagement.jsx`, `RTK.jsx`

---

## Чеклист DAY 21

- [ ] FSD слои — назови все 6
- [ ] Правило импортов FSD
- [ ] Query vs Zustand vs Redux — когда что
- [ ] Как организовать проект на 50 человек

---

# DAY 22 — Design Systems + Monorepo + SOLID

## Design System — «конструктор LEGO»

```
Tokens (цвета, spacing, typography)
  → Atoms (Button, Input, Badge)
    → Molecules (SearchBar, FormField)
      → Organisms (Header, ProductCard)
        → Pages
```

*Жизнь:* не печатаешь каждую кнопку с нуля — берёшь из набора.

**Storybook** — каталог компонентов для команды и дизайнеров.

**Файл:** `designSystems.js`

---

## Monorepo — «один репозиторий, много приложений»

```
apps/
  web/          ← основной сайт
  admin/        ← админка
packages/
  ui/           ← общий ui-kit
  api-client/   ← типизированный API клиент
  config-eslint/
```

**Turborepo / Nx** — «собери только то, что изменилось» (incremental builds, caching).

*Жизнь:* один склад, несколько магазинов. Общие коробки (ui-kit) для всех.

**Файл:** `monorepo.js`

---

## SOLID — без академии

| | Простыми словами | Пример |
|---|------------------|--------|
| **S** — Single | Один компонент — одна задача | Кнопка не fetch'ит API |
| **O** — Open/Closed | Расширяй через props, не лезь внутрь | `<Button variant="danger">` |
| **L** — Liskov | Подтипы взаимозаменяемы | `DangerButton` работает где ждут `Button` |
| **I** — Interface | Не 50 props — разбей | `UserCard` vs `UserAvatar` + `UserName` |
| **D** — Dependency | Получай зависимости, не импортируй | `fetchUser` через prop/context, не `api.ts` |

**Файл:** `solid.js`

---

## Design Patterns — частые на собесе

| Паттерн | Где в React |
|---------|-------------|
| **Compound Components** | `<Select>`, `<Select.Option>` |
| **Render Props** | `<DataFetcher render={data => ...}>` |
| **HOC** | `withAuth(Component)` — реже с hooks |
| **Provider** | Context для theme, auth |
| **Container/Presentational** | Smart hook + dumb UI |

**Файл:** `designPatterns.js`

---

## CODE DAY 22

`practice/tasks-js/` ×2 без AI

---

# DAY 23 — Mock Interview

## 8 вопросов вслух (3 мин каждый)

| # | Категория | Пример |
|---|-----------|--------|
| 1 | system | Спроектируй админку на 100 экранов |
| 2 | react | Почему лишний рендер и как найти? |
| 3 | typescript | any vs unknown vs never |
| 4 | javascript | Event loop — Promise vs setTimeout |
| 5 | **senior** | XSS vs CSRF — объясни и защита |
| 6 | **senior** | Race condition — воспроизведи и fix |
| 7 | **senior** | Reflow vs Repaint — цепочка |
| 8 | **senior** | Focus trap — зачем в модалке |

## Как отвечать

1. **Структура:** проблема → решение → пример из работы
2. **3 минуты** — не монолог, как коллеге
3. Не знаешь — честно + «как бы googl'ил / спросил команду»

**Запиши 3 слабые темы → DAY_24**

`node mockInterview/questions.js 23`

---

# DAY 24 — Mock + слабые места

## Утро — повтори по слабым темам

Особенно Senior `.md`:
- `theory/week3/xssCsrf.md`
- `theory/week3/reliableDataFetching.md`
- `theory/week1/reflowRepaint.md`
- `theory/week3/codeSplitting.md`
- `theory/week2/accessibleComponents.md`

## День — mock ×8

`node mockInterview/questions.js 24`

## Вечер

- `practice/tasks-js/` ×3
- `practice/tasks-react/testScreen_2.js`

---

# DAY 25 — ФИНАЛ 🎯

## 1. Senior EXPLAIN marathon (45 мин) — без файлов

- [ ] XSS + CSRF
- [ ] Race condition + AbortController + dedup
- [ ] Stale-while-revalidate
- [ ] Layout → paint → composite
- [ ] Code splitting — 3 стратегии
- [ ] Focus trap + inert
- [ ] SSR vs SSG + когда SSR вредит
- [ ] TanStack Query vs Redux
- [ ] FSD layers
- [ ] Event loop

## 2. Hand coding (90 мин) ✍️ — все 6 без solutions

| # | Файл |
|---|------|
| 1 | debounce |
| 2 | throttle |
| 3 | EventEmitter |
| 4 | useDebounce |
| 5 | miniStateManager |
| 6 | miniReactQuery |

## 3. Mock final (45 мин)

8 вопросов — включая 4 Senior-темы

## 4. Готов ✅

- [ ] 25 дней пройдены
- [ ] Middle vs Senior — разница по 5 блокам
- [ ] Позиция: **Senior Frontend Engineer (React/Next.js)**

Карта курса: `exploreTopics.js`

---

## Все файлы недель 4–5

| DAY | Темы | Файлы |
|-----|------|-------|
| 16 | Reflow/Repaint | **`reflowRepaint.md`**, `renderingPipeline.js` |
| 17 | Code Splitting | **`codeSplitting.md`**, `advancedPatterns.jsx` |
| 18 | A11y | **`accessibleComponents.md`**, `htmlCssA11y.js` |
| 19 | Web Vitals | `webVitals.js`, `protokols.js`, `websocketReact.jsx` |
| 20 | Senior review | все `.md` выше |
| 21 | Architecture | `featureSlicedDesign.js`, `cleanArchitecture.js`, `stateManagement.jsx`, `RTK.jsx` |
| 22 | DS, Monorepo | `designSystems.js`, `monorepo.js`, `solid.js`, `designPatterns.js` |
| 23–25 | Mock + Final | `mockInterview/questions.js`, handCoding |
