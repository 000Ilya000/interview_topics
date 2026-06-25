# Reflow vs Repaint — Senior

> **Middle:** reflow дороже repaint, transform лучше left/top, знаю will-change  
> **Senior:** объясняет цепочку, layout thrashing, DevTools, связь с CLS

📖 База: `renderingPipeline.js`  
📖 [Google Web Fundamentals: Rendering Performance](https://web.dev/articles/rendering-performance)

---

## Цепочка: Layout → Paint → Composite

Браузер рисует страницу в три больших шага:

```
Layout (Reflow)  →  Paint  →  Composite
   геометрия          цвета      GPU-слои
   где и какого       тени       transform,
   размера            текст      opacity
```

| Шаг | Что пересчитывает | Пример триггера |
|-----|-------------------|-----------------|
| **Layout (Reflow)** | Позиция, размер | `width`, `height`, `font-size`, добавление DOM |
| **Paint** | Внешний вид без геометрии | `color`, `background`, `box-shadow` |
| **Composite** | Слои на GPU | `transform`, `opacity` |

**Правило:** чем правее — тем дешевле для анимаций.

`left: 100px` → **Layout + Paint + Composite** каждый кадр 😱  
`transform: translateX(100px)` → часто только **Composite** ✅

---

## Layout thrashing — «дёргание» layout

**Что это:** код **читает** геометрию (`offsetHeight`, `getBoundingClientRect`) и **сразу пишет** стили — в цикле. Браузер вынужден синхронно пересчитывать layout на каждой итерации.

```js
// ❌ Layout thrashing
elements.forEach(el => {
  el.style.width = el.offsetWidth + 10 + 'px'; // read → write → read → write
});

// ✅ Сначала все read, потом все write
const widths = elements.map(el => el.offsetWidth);
elements.forEach((el, i) => {
  el.style.width = widths[i] + 10 + 'px';
});
```

**Batching через requestAnimationFrame:** все DOM-изменения — в одном rAF-колбэке, браузер сделает один layout за кадр.

📖 [What forces layout/reflow](https://gist.github.com/paulirish/5d52fb08138b021a57984210755141) — список свойств, форсирующих sync layout

---

## Свойства, форсирующие синхронный reflow

Если ты **читаешь** после **записи** стилей — браузер должен пересчитать layout прямо сейчас:

- `offsetWidth`, `offsetHeight`, `clientWidth`, `scrollTop`
- `getBoundingClientRect()`
- `getComputedStyle()`

**DevTools:** Performance tab → смотри фиолетовые блоки «Layout».  
**Rendering → Paint flashing** — зелёная подсветка перерисованных областей.

---

## will-change и compositor layers

`will-change: transform` — подсказка браузеру: «скоро буду анимировать, создай GPU-слой заранее».

⚠️ **Memory overhead:** каждый compositor layer — отдельная текстура в памяти. Не ставь `will-change` на всё подряд.

---

## Связь с CLS (Cumulative Layout Shift)

CLS — метрика «прыгает ли контент». Причинa — reflow **после** того как пользователь уже видит страницу:

- Картинка без `width/height` — загрузилась, контент сдвинулся
- Баннер сверху «выехал» и сдвинул кнопку
- Шрифт подгрузился — текст изменил размер

**Fix:** резервируй место (`aspect-ratio`, skeleton), `font-display: swap` осознанно.

📖 [web.dev: CLS](https://web.dev/articles/cls)

---

## Что сказать на собесе

> «Reflow — пересчёт геометрии, repaint — перерисовка пикселей, composite — склейка GPU-слоёв. Анимации через transform/opacity, не left/top. Layout thrashing — когда чередуем read/write DOM в цикле; решаю batch read → batch write или rAF. CLS растёт когда layout меняется после paint — резервирую размеры.»
