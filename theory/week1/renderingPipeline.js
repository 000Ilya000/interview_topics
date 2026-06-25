//! RENDERING PIPELINE — база (Middle)
//! Senior-версия с layout thrashing, CLS, DevTools → reflowRepaint.md (DAY 16)
//! 📖 https://web.dev/articles/rendering-performance

//! ─── Этапы ───────────────────────────────────────────────────────────────────
// 1. Parse HTML → DOM
// 2. Parse CSS → CSSOM
// 3. DOM + CSSOM → Render Tree (без display:none, head и т.д.)
// 4. Layout (Reflow) — вычисление геометрии (width, height, position)
// 5. Paint — отрисовка пикселей (color, shadow, text)
// 6. Composite — слои GPU (transform, opacity)

//! ─── Reflow (Layout) ─────────────────────────────────────────────────────────
// Триггеры: изменение width/height, font-size, добавление DOM, getComputedStyle
// Reflow может вызвать reflow дочерних и соседних элементов
// ❌ document.body.offsetHeight в цикле — forced synchronous layout (layout thrashing)

//! ─── Repaint ─────────────────────────────────────────────────────────────────
// Триггеры: color, visibility, background (без изменения геометрии)
// Дешевле reflow, но всё равно стоит избегать массовых repaint

//! ─── Composite (лучший вариант для анимаций) ─────────────────────────────────
// transform и opacity — часто не вызывают reflow/repaint, только composite layer
// will-change: transform — hint браузеру создать слой заранее

//! ─── Блокирующие ресурсы ─────────────────────────────────────────────────────
// CSS в <head> — блокирует render (FOUC если внизу)
// JS без defer/async — блокирует парсинг HTML
// defer — выполнится после парсинга, async — сразу после загрузки

//! ─── Senior-вопрос ───────────────────────────────────────────────────────────
// «Почему анимация через left/top медленнее, чем через transform?»
// left/top → reflow + repaint + composite каждый кадр
// transform → только composite (GPU layer)
