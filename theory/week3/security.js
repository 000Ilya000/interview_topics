//! XSS, CSRF, CSP, SameSite

//! XSS (Cross-Site Scripting) — injection JS в страницу
// Reflected — через URL param
// Stored — в БД (comments)
// DOM-based — client-side only
// Защита: escape output, CSP, DOMPurify, httpOnly cookies, не eval/innerHTML

//! CSRF (Cross-Site Request Forgery) — forged request от имени user
// Защита: SameSite cookies, CSRF token, проверка Origin/Referer header

//! CSP (Content Security Policy)
// Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-xxx'
// Блокирует inline scripts, unauthorized domains

//! SameSite cookie attribute — Lax (default) блокирует cross-site POST cookies

export {};
