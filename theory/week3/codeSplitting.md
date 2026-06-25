# Code Splitting — стратегия разбивки бандла

> **Middle:** React.lazy, Suspense, split по роутам, Next.js «сам»  
> **Senior:** начинает с analyzer, три стратегии, preload vs prefetch, sideEffects

📖 [web.dev: Reduce JavaScript payloads](https://web.dev/articles/reduce-javascript-payloads-with-code-splitting)

---

## Зачем

Один огромный `bundle.js` = пользователь ждёт загрузку **всего** приложения, хотя ему нужна одна страница.

Code splitting — грузим JS **кусками**, когда он реально нужен.

---

## Шаг 0: Bundle Analyzer (начни отсюда)

Не гадай — **посмотри** что тяжёлое:

```bash
# Vite
npx vite-bundle-visualizer

# Webpack
npx webpack-bundle-analyzer stats.json
```

Ищи: moment.js целиком, lodash без tree-shake, тяжёлые chart-библиотеки на главной.

---

## Три стратегии разбивки

| Стратегия | Что режем | Пример |
|-----------|-----------|--------|
| **По роутам** | Каждая страница — отдельный chunk | `React.lazy(() => import('./Dashboard'))` |
| **По фичам** | Тяжёлый редактор только на странице редактирования | `import('./RichEditor')` по клику |
| **По вендорам** | react, react-dom — отдельный vendor chunk | `splitChunks` в Webpack / manualChunks в Vite |

```jsx
// Route-based
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}
```

---

## dynamic import()

```js
button.addEventListener('click', async () => {
  const { heavyFn } = await import('./heavyModule.js');
  heavyFn();
});
```

Chunk загрузится **только по клику** — не при первом открытии.

---

## preload vs prefetch

| | preload | prefetch |
|---|---------|----------|
| **Приоритет** | Высокий — нужен **сейчас** | Низкий — понадобится **скоро** |
| **Когда** | Критичный chunk текущей страницы | Следующая страница по hover/вероятности |
| **HTML** | `<link rel="preload" href="chunk.js" as="script">` | `<link rel="prefetch" href="next-page.js">` |

Next.js `<Link prefetch>` — prefetch соседних роутов автоматически.

📖 [MDN: rel=preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload)

---

## sideEffects и tree shaking

**Tree shaking** — bundler выкидывает неиспользуемый код из ESM-модулей.

В `package.json` библиотеки:
```json
"sideEffects": false
```
→ «этот пакет можно безопасно чистить».

Если `"sideEffects": ["*.css"]` — CSS не удалят, JS почистят.

**Проблема:** `import _ from 'lodash'` тянет **всё**.  
**Fix:** `import debounce from 'lodash/debounce'`

---

## HTTP/1.1 vs HTTP/2 и чанки

- **HTTP/1.1** — много мелких файлов = много TCP-соединений (раньше было больно). Поэтому один большой bundle был логичен.
- **HTTP/2** — multiplexing, много параллельных запросов в одном соединении → **мелкие чанки OK**

Не режь на 500 файлов по 1 KB — баланс важен.

---

## module / nomodule

Для старых браузеров без ES modules:
```html
<script type="module" src="app.modern.js"></script>
<script nomodule src="app.legacy.js"></script>
```
Современный браузер игнорирует `nomodule`. Старый — игнорирует `type="module"`.

---

## Замер результата

**До и после** в Lighthouse:
- Total Blocking Time
- JavaScript execution time
- Размер initial chunk

Senior не «добавил lazy» — Senior **замерил** что initial bundle уменьшился.

---

## Что сказать на собесе

> «Сначала analyzer — смотрю что тяжёлое. Режу по роутам, фичам, вендорам. preload — критичное сейчас, prefetch — следующая страница. sideEffects: false помогает tree-shake. HTTP/2 позволяет больше чанков. Результат проверяю в Lighthouse.»
