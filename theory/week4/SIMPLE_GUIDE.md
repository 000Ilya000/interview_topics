# Неделя 6 — Performance + A11y + ФИНАЛ (DAY 27–28)

> Расписание: `schedule/DAY_27` … `DAY_28`  
> Финал курса: Senior perf, accessibility, vitals, architecture skim, mock + hand coding 6/6.

| День | Тема | Файлы |
|------|------|-------|
| 27 | Reflow ★ + Code splitting ★ | `reflowRepaint.md`, `codeSplitting.md` + DevTools |
| 28 | A11y + Vitals + FSD + **ФИНАЛ** | `accessibleComponents.md`, `webVitals.js`, `featureSlicedDesign.js` |

Optional skim (DAY 28): `solid.js`, `monorepo.js`, `designSystems.js`, `cleanArchitecture.js`

---

# DAY 27 — Reflow ★ + Code splitting ★

> На DAY 08 был **базовый** reflow. Сегодня — **глубина + DevTools**.

→ **`theory/week1/reflowRepaint.md`** (повтор + deep)  
→ **`theory/week3/codeSplitting.md`**

## Layout → Paint → Composite

```css
/* ❌ Layout каждый кадр */
.box { left: 100px; transition: left 0.3s; }
/* ✅ часто только Composite */
.box { transform: translateX(100px); transition: transform 0.3s; }
```

## Layout thrashing

```js
// ❌ read → write в цикле
el.style.width = el.offsetWidth + 10 + 'px';
// ✅ batch reads, потом writes
```

## DevTools — обязательно

1. **Performance** → запись анимации → ищи фиолетовый **Layout**
2. Сравни `left` vs `transform`
3. Запиши вывод в заметку

## Code splitting — 3 стратегии

| Стратегия | Пример |
|-----------|--------|
| По роутам | `lazy(() => import('./Page'))` |
| По фичам | Editor по клику |
| Vendor chunk | react отдельно |

**preload** — нужен **сейчас**. **prefetch** — **скоро** (hover, Next `<Link>`).

---

# DAY 28 — A11y + Web Vitals + Architecture + ФИНАЛ 🎯

## A11y — модалки

→ **`theory/week2/accessibleComponents.md`**

```jsx
<div role="dialog" aria-labelledby="title" aria-modal="true">
```

- **Focus trap** — Tab только внутри модалки
- **Возврат фокуса** на кнопку-тригger после close
- **Escape** закрывает
- **`inert`** на фоне — блокирует Tab (лучше чем только `aria-hidden`)

**Тест:** Tab + Escape на любой модалке.

---

## Core Web Vitals

| Метрика | Хорошо | Что |
|---------|--------|-----|
| **LCP** | < 2.5s | Главный контент |
| **INP** | < 200ms | Отклик на клик |
| **CLS** | < 0.1 | Прыжки вёрстки |

**Fix LCP:** SSR/SSG, WebP, preload hero.  
**Fix INP:** меньше JS, `startTransition`.  
**Fix CLS:** width/height на `<img>`, не вставляй контент сверху.

**Файл:** `webVitals.js`

---

## FSD — слои (skim)

```
app → pages → widgets → features → entities → shared
```

Импорты только **вниз**. `features` не тянет из `pages`.

**Файл:** `featureSlicedDesign.js`

### State (повтор с DAY 20)

| Данные | Где |
|--------|-----|
| API | TanStack Query |
| UI global | Zustand |
| Сложная logic | Redux/RTK |

---

## ФИНАЛ — что сделать в DAY 28

### 1. Explain marathon (20 мин)

- [ ] XSS + CSRF (3 мин)
- [ ] Race + AbortController
- [ ] Reflow vs transform
- [ ] Code split — 3 стратегии
- [ ] Focus trap + inert
- [ ] LCP / INP / CLS
- [ ] FSD слои
- [ ] Middle vs Senior — 5 отличий

### 2. Hand coding 6/6 ✍️ (без AI)

| # | Файл |
|---|------|
| 1 | `practice/handCoding/debounce.js` |
| 2 | `practice/handCoding/throttle.js` |
| 3 | `practice/handCoding/eventEmitter.js` |
| 4 | `practice/handCoding/useDebounce.jsx` |
| 5 | `practice/handCoding/miniStateManager.js` |
| 6 | `practice/handCoding/miniReactQuery.js` |

### 3. Mock final

```bash
node mockInterview/questions.js 28
# alias:
node mockInterview/questions.js mix
```

---

## Чеклист — курс закрыт ✅

- [ ] DAY 27: DevTools left vs transform
- [ ] DAY 28: a11y Tab-тест
- [ ] Hand coding 6/6 (или список повторить)
- [ ] Mock final вслух
- [ ] **28 дней пройдены**
- [ ] Готов: **Senior Frontend Engineer (React/Next.js)**

---

## После курса

1. «Слабые темы» — 1 неделя повтор
2. Mock `mix` — раз в 2–3 дня
3. Hand coding 6/6 — раз в неделю

Карта: `schedule/COURSE_MAP.md` · `exploreTopics.js`
