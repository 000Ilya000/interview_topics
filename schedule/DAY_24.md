# День 24 — HTTP + fetch + CORS + JWT

> Неделя 5 из 6 | ~**2.5 ч** | 3 theory-файла

## Цель дня

**Как браузер ходит в сеть:** HTTP/TLS, fetch API, **CORS**, cookies, **JWT**. Плюс практическая задача на async.

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week3/SIMPLE_GUIDE.md`** — HTTP + CORS + Auth |

---

## Шаг 1 — READ (40 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week3/httpTls.js` | HTTP methods, status codes, HTTPS, TLS |
| 2 | `theory/week3/fetchAPI.js` | fetch, headers, credentials, errors |
| 3 | `theory/week3/corsCookiesJwt.js` | CORS, preflight, SameSite, JWT storage |

```bash
node theory/week3/httpTls.js
node theory/week3/corsCookiesJwt.js
```

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. CORS — почему браузер блокирует? Что такое preflight?
2. `credentials: 'include'` — когда нужен?
3. JWT в httpOnly cookie vs localStorage — security
4. 401 vs 403 — разница

---

## Шаг 3 — CODE (50 мин) ✍️ **без AI**

| # | Задача | Файл |
|---|--------|------|
| 1 | Currencies / async | `practice/tasks-js/currenciesTask.js` |

На бумаге: sequence diagram — login → JWT cookie → API request → CORS preflight.

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 24
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] 3 network-файла прочитал
- [ ] CORS + JWT — вслух с примерами
- [ ] currenciesTask решил

**Завтра → [DAY_25.md](DAY_25.md)** — XSS + CSRF ★
