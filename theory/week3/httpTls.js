//! HTTP, HTTPS, TLS, HTTP/2, HTTP/3

//! HTTP — request/response, stateless, текстовые заголовки
// Методы: GET (safe, idempotent), POST, PUT, PATCH, DELETE
// Статусы: 200 OK, 201 Created, 204 No Content, 301/302 Redirect
//          400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
//          429 Too Many Requests, 500 Internal Server Error, 502 Bad Gateway

//! HTTPS = HTTP + TLS
// TLS handshake → symmetric encryption → certificate validation (CA)
// Защита: confidentiality, integrity, authentication сервера

//! HTTP/1.1 — one request per TCP connection (или keep-alive pipeline limited)
//! HTTP/2 — multiplexing (много streams в одном connection), header compression (HPACK), binary
//! HTTP/3 — QUIC (UDP-based), быстрее reconnect, меньше head-of-line blocking

//! Senior: HTTP/2 не всегда быстрее — small assets могут быть хуже из-за overhead

export {};
