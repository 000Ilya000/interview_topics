# XSS и CSRF — простым языком

> **Middle:** «знаю что XSS — это опасно, ставлю httpOnly на cookie»  
> **Senior:** объясняет механизм атаки и конкретные меры на каждом уровне

---

## XSS (Cross-Site Scripting)

**Что это:** злоумышленник вставляет свой JavaScript на твою страницу. Браузер жертвы выполняет этот код — как будто это часть твоего сайта.

**Три вида:**

| Вид | Как работает | Пример |
|-----|--------------|--------|
| **Reflected** | Скрипт в URL, сервер отражает его в HTML | `?search=<script>steal()</script>` |
| **Stored** | Скрипт сохраняется в БД (комментарий, профиль) | Все, кто откроет страницу — получат атаку |
| **DOM-based** | JS на клиенте сам вставляет вредный код в DOM | `innerHTML = location.hash` без проверки |

**Что может украсть XSS:**
- Cookie (если не `HttpOnly`)
- Токен из `localStorage`
- Данные со страницы, действия от имени пользователя

### Как защититься

1. **Не вставляй пользовательский ввод в HTML напрямую**  
   React по умолчанию экранирует `{userInput}` — это хорошо.  
   Опасно: `dangerouslySetInnerHTML`, `innerHTML`, `eval()`

2. **CSP (Content Security Policy)** — заголовок, который говорит браузеру: «выполняй скрипты только с этих доменов»  
   ```http
   Content-Security-Policy: default-src 'self'; script-src 'self'
   ```

3. **HttpOnly cookie** — JS не может прочитать cookie → даже при XSS токен не украдут через `document.cookie`

4. **Sanitize** — если HTML от пользователя необходим (rich text), прогоняй через [DOMPurify](https://github.com/cure53/DOMPurify)

5. **Не храни JWT в localStorage** — при XSS его легко украсть. Лучше httpOnly cookie.

📖 Подробнее: [OWASP XSS](https://owasp.org/www-community/attacks/xss/)

---

## CSRF (Cross-Site Request Forgery)

**Что это:** пользователь залогинен на `bank.com`. Он открывает `evil.com`, а тот сайт отправляет скрытый запрос на `bank.com/transfer` — браузер **автоматически** прикрепляет cookie. Банк думает, что это легитимный запрос.

**XSS vs CSRF:**
- XSS — выполняется **чужой JS на твоей странице**
- CSRF — **чужой сайт** отправляет запрос **от имени** залогиненного пользователя

### Как защититься

1. **SameSite cookie**  
   - `Strict` — cookie не уходит на cross-site запросы вообще  
   - `Lax` — не уходит на POST с другого сайта (дефолт в современных браузерах)  
   - `None` — только с `Secure` (HTTPS)

2. **CSRF-токен** — сервер генерирует секретный токен, клиент отправляет его в заголовке или форме. Чужой сайт не знает этот токен.

3. **Проверка Origin / Referer** на сервере для state-changing запросов (POST, PUT, DELETE)

4. **Не использовать GET для изменения данных** — `<img src="bank.com/transfer?to=hacker">` сработает без JS

📖 Подробнее: [OWASP CSRF](https://owasp.org/www-community/attacks/csrf)

---

## Что сказать на собесе (Senior)

> «XSS — это когда вредный JS попадает на страницу. Защита: escape по умолчанию, CSP, HttpOnly cookies, sanitize если нужен HTML. CSRF — когда другой сайт шлёт запрос с cookie пользователя. Защита: SameSite, CSRF token, проверка Origin. JWT храню в httpOnly cookie, не в localStorage — потому что при XSS localStorage читается, cookie с HttpOnly — нет.»

---

## Связанные темы

- `corsCookiesJwt.js` — cookies и JWT
- `security.js` — CSP кратко
