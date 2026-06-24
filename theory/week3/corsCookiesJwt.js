//! CORS, Cookies, JWT

//! CORS — браузер блокирует cross-origin без заголовков сервера
// Same-origin: protocol + host + port
// Simple request — без preflight (GET, POST form, limited headers)
// Preflight OPTIONS — для PUT, custom headers, application/json

// Server headers:
// Access-Control-Allow-Origin: https://app.com (не * с credentials)
// Access-Control-Allow-Methods: GET, POST
// Access-Control-Allow-Headers: Content-Type, Authorization
// Access-Control-Allow-Credentials: true

//! Cookies
// HttpOnly — JS не читает (защита XSS)
// Secure — только HTTPS
// SameSite=Strict|Lax|None — CSRF protection
// Domain, Path, Max-Age, Expires

//! JWT — header.payload.signature (base64)
// Stateless auth, payload не encrypted (только signed!)
// ❌ localStorage — XSS украдёт токен
// ✅ httpOnly cookie + refresh token rotation

export {};
