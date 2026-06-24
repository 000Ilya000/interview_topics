//! NEXT.JS APP ROUTER (13+)

//! Структура:
// app/
//   layout.tsx      — shared UI, не unmount при navigation
//   page.tsx        — route UI
//   loading.tsx     — Suspense fallback
//   error.tsx       — error boundary
//   not-found.tsx
//   [id]/page.tsx   — dynamic segment
//   (group)/        — route groups без URL segment

//! Server Component по умолчанию — 0 JS на клиент для data fetching
//! 'use client' — интерактивность, hooks, browser APIs

//! Data fetching в Server Components:
// async function Page() {
//   const data = await fetch('...', { next: { revalidate: 60 } });
//   return <div>{data.title}</div>;
// }

//! Navigation — client-side через Link, prefetch on viewport

export {};
