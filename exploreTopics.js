// =============================================================================
//  EXPLORE TOPICS — карта курса Senior Frontend (React/Next.js)
//  25 рабочих дней | schedule/DAY_XX.md
//  Старт: BEFORE_START.md → START_HERE.md
//  Формат: SIMPLE_GUIDE.md → код → вслух → handCoding
// =============================================================================

// ─── НЕДЕЛЯ 1 (DAY 01–05) — HTML/CSS + JavaScript + Browser ──────────────────

//  DAY 01 — HTML/CSS + Event Loop
//    theory/week1/htmlCssA11y.js, metaTags.html, browserInternals.js, eventLoop.js

//  DAY 02 — Promises + Closures + Debounce/Throttle
//    theory/week1/promiseChain.js, promiseObject.js, circuitFunction.js, debounceThrottle.js
//    practice/handCoding/debounce.js, throttle.js

//  DAY 03 — this + Prototypes + JS basics
//    theory/week1/this.js, prototypes.js, dataTypes.js, variables.js, arrayMethods.js …

//  DAY 04 — Memory + Reflow (база) + Collections
//    theory/week1/memoryLeaks.js, renderingPipeline.js, reflowRepaint.md (пробежаться)
//    arrayMapSetWeakMapWeakSet.js, immutability.js

//  DAY 05 — Review W1 + EventEmitter
//    practice/handCoding/eventEmitter.js

// ─── НЕДЕЛЯ 2 (DAY 06–10) — TypeScript + React ───────────────────────────────

//  DAY 06 — TypeScript (весь блок)
//    theory/week2/anyTypes.ts … mappedTypes.ts, declorations.d.ts

//  DAY 07 — Reconciliation + Fiber + Render Cycle
//    theory/week2/reconciliation.jsx, fiber.jsx, renderCycle.jsx

//  DAY 08 — Hooks + Memo + Extra Renders
//    theory/week2/hooksOverview.jsx, useEffectUseLayoutEffect.jsx, useMemoUseCallback.jsx, extraRenders.jsx
//    practice/handCoding/useDebounce.jsx

//  DAY 09 — Context + Concurrent + Patterns
//    theory/week2/context.jsx, concurrentFeatures.jsx, advancedPatterns.jsx
//    practice/handCoding/miniStateManager.js

//  DAY 10 — Review W2

// ─── НЕДЕЛЯ 3 (DAY 11–15) — Next.js + Сеть + Security + Data (Senior) ────────

//  DAY 11 — Next.js SSR + App Router + RSC
//    theory/week3/renderingModes.jsx, hydration.jsx, appRouter.jsx, serverComponents.jsx

//  DAY 12 — HTTP + TLS + CORS + fetch + JWT
//    theory/week3/httpTls.js, fetchAPI.js, corsCookiesJwt.js

//  DAY 13 — XSS + CSRF (простым языком + ссылки) ★ SENIOR
//    theory/week3/xssCsrf.md, security.js

//  DAY 14 — Надёжная загрузка данных ★ SENIOR
//    theory/week3/reliableDataFetching.md
//    practice/handCoding/miniReactQuery.js

//  DAY 15 — Review W3 + mock

// ─── НЕДЕЛЯ 4 (DAY 16–20) — Performance + A11y (Senior) ─────────────────────

//  DAY 16 — Reflow vs Repaint (Senior) ★
//    theory/week1/reflowRepaint.md, renderingPipeline.js

//  DAY 17 — Code Splitting ★ SENIOR
//    theory/week3/codeSplitting.md
//    theory/week2/advancedPatterns.jsx (lazy/Suspense)

//  DAY 18 — Доступные интерактивные компоненты ★ SENIOR
//    theory/week2/accessibleComponents.md

//  DAY 19 — Web Vitals + Протоколы + WebSocket
//    theory/week3/webVitals.js, protokols.js, websocketReact.jsx

//  DAY 20 — Review W4 (Senior блоки)

// ─── НЕДЕЛЯ 5 (DAY 21–25) — Архитектура + Mock + Финал ───────────────────────

//  DAY 21 — FSD + Clean Architecture + State + RTK
//    theory/week4/featureSlicedDesign.js, cleanArchitecture.js, stateManagement.jsx, RTK.jsx

//  DAY 22 — Design Systems + Monorepo + SOLID + Patterns
//    theory/week4/designSystems.js, monorepo.js, solid.js, designPatterns.js

//  DAY 23 — Mock Interview ×8

//  DAY 24 — Mock + слабые темы + practice/tasks-js/

//  DAY 25 — ФИНАЛ: handCoding из памяти + mock ×8

// ─── SENIOR-ТЕМЫ (из Middle vs Senior) ───────────────────────────────────────
//  XSS/CSRF           → theory/week3/xssCsrf.md
//  Data fetching      → theory/week3/reliableDataFetching.md
//  Reflow/Repaint     → theory/week1/reflowRepaint.md
//  Code Splitting     → theory/week3/codeSplitting.md
//  A11y компоненты    → theory/week2/accessibleComponents.md

// ─── ФОРМАТ ОБУЧЕНИЯ ─────────────────────────────────────────────────────────
//  1. theory/weekN/SIMPLE_GUIDE.md  — простым языком, жизненные примеры
//  2. *.md Senior-темы              — xssCsrf, reflowRepaint, …
//  3. *.js / *.jsx                  — код, node / читать примеры
//  4. schedule/DAY_XX.md            — маршрут дня
//  5. practice/handCoding/          — без AI

// ─── MOCK INTERVIEW ──────────────────────────────────────────────────────────
//  Дни 1–22: node mockInterview/questions.js N   — только пройденный материал
//  Повторение: node mockInterview/questions.js 1-5 — по 1 вопросу с каждого дня
//  Финал:      node mockInterview/questions.js 23|24|25 — весь курс вперемешку
