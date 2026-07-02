# Неделя 6 — Performance + A11y + ФИНАЛ (DAY 27–28)

> Расписание: `schedule/DAY_27` … `DAY_28`  
> Senior perf, accessibility, Core Web Vitals, architecture skim, финальный mock + hand coding 6/6.

| День | Тема | Файлы |
|------|------|-------|
| 27 | Reflow ★ + Code splitting ★ | `reflowRepaint.md`, `codeSplitting.md` + DevTools |
| 28 | A11y + Vitals + FSD + **ФИНАЛ** | `accessibleComponents.md`, `webVitals.js`, `featureSlicedDesign.js` |

Optional skim (DAY 28): `solid.js`, `monorepo.js`, `designSystems.js`, `cleanArchitecture.js`

---

# DAY 27 — Reflow ★ + Code splitting ★

> На **DAY 08** был reflow **база**. Сегодня — **глубина + DevTools + code splitting**.

→ **`theory/week1/reflowRepaint.md`** (повтор + deep)  
→ **`theory/week3/codeSplitting.md`**

## Layout → Paint → Composite

```
Layout (Reflow)  →  Paint  →  Composite
   геометрия          цвета      GPU-слои
   width, height      color      transform
                      shadow     opacity
```

| Шаг | Что пересчитывает | Триггеры |
|-----|-------------------|----------|
| **Layout** | Позиция, размер | width, height, font-size, DOM insert/remove |
| **Paint** | Внешний вид | color, background, box-shadow, text |
| **Composite** | GPU-слои | transform, opacity (часто без layout) |

**Правило:** чем правее в цепочке — тем дешевле для **анимаций**.

```css
/* ❌ Layout + Paint + Composite каждый кадр */
.box { position: absolute; left: 100px; transition: left 0.3s; }

/* ✅ Часто только Composite */
.box { transform: translateX(100px); transition: transform 0.3s; }
```

*Жизнь:* `left` — переставляешь мебель (layout). `transform` — двигаешь на роликах поверх пола (GPU layer).

---

## Layout thrashing — «дёргание» layout

```js
// ❌ read → write → read → write в цикле — forced synchronous layout
elements.forEach(el => {
  el.style.width = el.offsetWidth + 10 + 'px';
});

// ✅ Сначала все read, потом все write
const widths = elements.map(el => el.offsetWidth);
elements.forEach((el, i) => {
  el.style.width = widths[i] + 10 + 'px';
});
```

Браузер вынужден **синхронно** пересчитывать layout на каждой read после write.

**Fix:** batch reads/writes, `requestAnimationFrame` для DOM-изменений, DocumentFragment.

---

## will-change и compositor layers

```css
.will-animate {
  will-change: transform;
}
```

Подсказка браузеру: «скоро анимирую — создай GPU-слой заранее».

⚠️ Каждый layer = текстура в памяти. Не ставь `will-change` на всё подряд.

---

## DevTools — обязательная практика DAY 27

1. Chrome **Performance** tab → Record 5 сек анимации
2. Сравни анимацию через **`left`** vs **`transform`**
3. Ищи фиолетовые блоки **Layout** / **Recalculate Style**
4. **Rendering → Paint flashing** — зелёная подсветка перерисованных областей
5. Запиши вывод: «transform убрал N layout events»

---

## Связь с CLS

Reflow во время загрузки → элементы **прыгают** → плохой **CLS** (Cumulative Layout Shift).

**Fix:** резервируй место под картинки (`width`/`height` или aspect-ratio), не вставляй баннер над контентом, skeleton с фиксированной высотой.

---

## Code Splitting — `codeSplitting.md`

### Зачем

Один `bundle.js` на 2 MB = пользователь качает **всё** приложение, хотя открыл одну страницу.

Code splitting — грузим JS **кусками**, когда нужен.

### Bundle Analyzer

```bash
npx vite-bundle-visualizer   # Vite
# или @next/bundle-analyzer для Next.js
```

Ищи: moment.js целиком, lodash без tree-shake, chart-lib на главной.

### Три стратегии

| Стратегия | Что режем | Пример |
|-----------|-----------|--------|
| **По роутам** | Каждая страница — chunk | `React.lazy(() => import('./Dashboard'))` |
| **По фичам** | Тяжёлый редактор по клику | dynamic import RichEditor |
| **По вендорам** | react, react-dom отдельно | `manualChunks` в Vite |

```jsx
const Dashboard = lazy(() => import('./pages/Dashboard'));

<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>
```

Next.js: `dynamic(() => import('./Heavy'), { ssr: false })`

---

## preload vs prefetch

| | preload | prefetch |
|---|---------|----------|
| Приоритет | Высокий — нужен **сейчас** | Низкий — **скоро** понадобится |
| Когда | Hero font, critical chunk | Следующая страница по hover |
| Next.js | `<Link prefetch>` | prefetch соседних routes |

---

## Tree shaking

```json
// package.json библиотеки
"sideEffects": false
```

Импортируй точечно: `import debounce from 'lodash/debounce'`, не `import _ from 'lodash'`.

### Что сказать на собесе (perf)

> «Сначала analyzer — что тяжёлое. Split по роутам lazy/dynamic. Vendor chunk отдельно. Анимации через transform, не left. Batch DOM reads/writes. Prefetch следующую страницу.»

### Чеклист DAY 27

- [ ] Layout → Paint → Composite
- [ ] transform vs left
- [ ] Layout thrashing + fix
- [ ] DevTools — сравнил left vs transform
- [ ] 3 стратегии code split
- [ ] preload vs prefetch

---

# DAY 28 — A11y + Web Vitals + Architecture + ФИНАЛ 🎯

## Доступные компонents — `accessibleComponents.md`

### Минимум модалки

```jsx
<div
  role="dialog"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
  aria-modal="true"
>
  <h2 id="modal-title">Подтверждение</h2>
  <p id="modal-desc">Удалить файл?</p>
  <button onClick={onConfirm}>Да</button>
  <button onClick={onClose}>Отмена</button>
</div>
```

- `role="dialog"` — это модалка для screen reader
- `aria-modal="true"` — фон «неактивен»
- `aria-labelledby` — озвучит заголовок
- **Escape** закрывает
- **Focus trap** — Tab циклически **только** внутри модалки

---

## Focus trap — зачем

Модалка открыта → Tab → фокус уходит **под** модалку на фон. Человек с клавиатуры теряется.

```
Tab → кнопка 1 → кнопка 2 → «Закрыть» → снова кнопка 1
```

Radix UI / Focus Trap React делают автоматически. **Senior** понимает **зачем**, не только «библиотека сделала».

---

## Возврат фокуса на trigger

```jsx
const triggerRef = useRef(null);

function openModal() {
  triggerRef.current = document.activeElement;
  setOpen(true);
}

function closeModal() {
  setOpen(false);
  triggerRef.current?.focus();
}
```

Без этого: закрыл модалку → фокус пропал → Tab начинает с начала страницы.

---

## aria-hidden vs inert

| | aria-hidden | inert |
|---|-------------|-------|
| Screen reader | Скрывает | Скрывает |
| Tab / клики | ❌ **Не блокирует** | ✅ Блокирует |
| Поддержка | Везде | Современные браузеры |

**Senior:** `aria-hidden` на фоне **не** блокирует Tab — нужен focus trap **или** `inert` на backdrop.

---

## prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Уважай настройку ОС «уменьшить движение».

### Как тестировать a11y

1. **Tab** — пройди форму/модалку только клавиатурой
2. **Escape** — закрывает?
3. **VoiceOver** (Mac) / **NVDA** (Win) — озвучивает заголовок?
4. Фокус уходит на фон? → баг

---

## Core Web Vitals — `webVitals.js`

| Метрика | Что измеряет | Хорошо | Жизнь |
|---------|--------------|--------|-------|
| **LCP** | Largest Contentful Paint | < 2.5s | Когда принесли основное блюдо |
| **INP** | Interaction to Next Paint | < 200ms | Как быстро официант отреагировал |
| **CLS** | Cumulative Layout Shift | < 0.1 | Стол дёрнулся когда поставили салат |

### Как улучшить LCP
- SSR/SSG для first paint
- WebP/AVIF, responsive images
- Preload hero image / critical font
- CDN ближе к пользователю
- Убрать render-blocking JS

### Как улучшить INP
- Меньше JS на main thread
- `startTransition` для тяжёлых updates
- Debounce/throttle handlers
- Web Workers для тяжёлых вычислений

### Как улучшить CLS
- `width`/`height` или `aspect-ratio` на `<img>`
- Не вставляй контент над уже видимым
- `font-display: swap` + fallback с похожими метриками

---

## FSD — Feature-Sliced Design — `featureSlicedDesign.js`

```
app/       → init, providers, router (потолок)
pages/     → целые страницы (комнаты)
widgets/   → крупные блоки: Header, Sidebar (мебель)
features/  → действия: Login, AddToCart (выключатели)
entities/  → бизнес-сущности: User, Product (предметы)
shared/    → ui-kit, api, utils, config (инструменты)
```

**Правило импортов:** только **вниз** по слоям.

```
app → pages → widgets → features → entities → shared
```

`features` **не** импортирует из `pages`. `entities` **не** из `features`.

*Жизнь:* кухня не лезет в спальню за продуктами — всё через кладовку (`shared`).

**На собесе «50 разработчиков»:** FSD или monorepo + eslint-plugin на импорты + code review + shared ui-kit.

Optional skim: `cleanArchitecture.js`, `solid.js`, `monorepo.js`, `designSystems.js`

---

## State — повтор (DAY 20)

| Данные | Где |
|--------|-----|
| API / server | TanStack Query |
| UI toggle, форма | useState |
| Global UI | Zustand |
| Сложная client logic | Redux/RTK |

---

## Middle vs Senior — 5 отличий (объясни вслух)

1. **Security:** XSS/CSRF/JWT storage — не «слышал», а pitch на 3 мин
2. **Data:** race, abort, dedup, stale — могу miniReactQuery из памяти
3. **Perf:** reflow chain, transform, code split — с DevTools примером
4. **A11y:** focus trap, inert — тестировал Tab
5. **Architecture:** FSD слои, Query vs Redux — обоснуешь выбор

---

# ФИНАЛ DAY 28 — программа дня

### 1. Explain marathon (~30 мин)

- [ ] XSS + CSRF (3 мин pitch)
- [ ] Race + AbortController + dedup
- [ ] Reflow vs transform + layout thrashing
- [ ] Code split — 3 стратегии
- [ ] Focus trap + inert + возврат фокуса
- [ ] LCP / INP / CLS — пороги + 1 fix каждый
- [ ] FSD — 6 слоёв + правило импортов
- [ ] Middle vs Senior — 5 блоков

### 2. A11y практика (~15 мин)

Tab-тест модалки · Escape · фокус не на фоне

### 3. Hand coding 6/6 ✍️ (~30–40 мин, без AI)

| # | Файл |
|---|------|
| 1 | `practice/handCoding/debounce.js` |
| 2 | `practice/handCoding/throttle.js` |
| 3 | `practice/handCoding/eventEmitter.js` |
| 4 | `practice/handCoding/useDebounce.jsx` |
| 5 | `practice/handCoding/miniStateManager.js` |
| 6 | `practice/handCoding/miniReactQuery.js` |

5 мин на каждый → сверка `solutions/` → записать что забыл.

### 4. Mock final (~20 мин)

```bash
node mockInterview/questions.js 28
# alias:
node mockInterview/questions.js mix
```

MIX — вопросы со **всего** курса. Ответы вслух как на собесе.

---

## Чеклист — курс закрыт ✅

- [ ] DAY 27: DevTools left vs transform
- [ ] DAY 28: a11y Tab-тест
- [ ] Hand coding 6/6
- [ ] Mock final вслух
- [ ] **28 дней пройдены**
- [ ] Готов: **Senior Frontend Engineer (React/Next.js)**

---

## После курса

1. «Слабые темы» из заметки — 1 неделя точечного повтора
2. `node mockInterview/questions.js mix` — раз в 2–3 дня
3. Hand coding 6/6 из памяти — раз в неделю
4. Senior `.md` перечитывать перед реальными собесами:
   - `xssCsrf.md`
   - `reliableDataFetching.md`
   - `reflowRepaint.md`
   - `codeSplitting.md`
   - `accessibleComponents.md`

Карта: `schedule/COURSE_MAP.md` · `exploreTopics.js`
