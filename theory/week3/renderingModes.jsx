//! SSR vs CSR vs SSG vs ISR

//! CSR (Client-Side Rendering)
// HTML shell + JS bundle → React рендерит в браузере
// ✅ Rich interactivity, простой deploy (SPA)
// ❌ Медленный FCP, плохой SEO без prerender

//! SSR (Server-Side Rendering)
// HTML генерируется на сервере на каждый request
// ✅ SEO, быстрый FCP
// ❌ TTFB выше, нагрузка на сервер, hydration cost

//! SSG (Static Site Generation)
// HTML на build time
// ✅ Максимально быстрый, CDN-friendly
// ❌ Данные устаревают до rebuild

//! ISR (Incremental Static Regeneration)
// SSG + revalidate через N секунд
// ✅ Свежие данные без full rebuild

//! Senior-вопрос: Когда SSR УХУДШАЕТ производительность?
// - TTFB растёт (server compute + DB на каждый request)
// - Hydration тяжёлого интерактивного UI — double work (server render + client hydrate)
// - Персонализированные страницы не кэшируются на CDN
// - Высокий traffic → server bottleneck
// Лучше: SSG/ISR для статики, CSR для dashboard за auth, SSR для SEO-critical pages

export {};
