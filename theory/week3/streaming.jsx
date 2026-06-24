//! STREAMING — progressive rendering

//! Suspense boundaries на server → HTML chunks отправляются по мере готовности
// app/page.tsx:
// <Suspense fallback={<Skeleton />}>
//   <SlowComponent />  ← async Server Component
// </Suspense>

//! loading.tsx = automatic Suspense boundary для route segment

//! Преимущества:
// - быстрее TTFB (не ждём самый медленный fetch)
// - пользователь видит UI постепенно

//! React 18 Suspense на server (Next.js App Router)

export {};
