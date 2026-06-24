//! CORE WEB VITALS + OPTIMIZATION

//! Core Web Vitals (Google ranking signals):
// LCP (Largest Contentful Paint) < 2.5s — main content visible
// INP (Interaction to Next Paint) < 200ms — responsiveness (заменил FID)
// CLS (Cumulative Layout Shift) < 0.1 — visual stability

//! Lighthouse — audit: performance, a11y, SEO, best practices

//! Bundle optimization:
// Code splitting (React.lazy, dynamic import)
// Tree shaking (ESM, sideEffects: false)
// Minification (Terser), compression (gzip/brotli)
// Analyze: webpack-bundle-analyzer, vite-plugin-visualizer

//! Loading:
// Lazy load images (loading="lazy", srcset, WebP/AVIF)
// Preload critical assets, prefetch next route
// CDN для static assets

//! Caching:
// Cache-Control: max-age, immutable для hashed files
// Service Worker для offline (PWA)

export {};
