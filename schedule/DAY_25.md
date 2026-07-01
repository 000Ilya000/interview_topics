# День 25 — XSS + CSRF ★ (Senior security)

> Неделя 5 из 6 | ~**2.5 ч** | 1 md + 1 js

## Цель дня

**Senior must-have:** XSS (3 вида), CSRF, SameSite cookies. Уметь за **3 минуты** объяснить атаку + защиту без шпаргалки.

---

## Шаг 0 — SIMPLE (10 мин) ★

| # | Файл |
|---|------|
| 0 | **`theory/week3/SIMPLE_GUIDE.md`** — Security (XSS/CSRF) |

---

## Шаг 1 — READ (40 мин)

| # | Файл | Зачем |
|---|------|-------|
| 1 | `theory/week3/xssCsrf.md` | Reflected, Stored, DOM XSS + CSRF |
| 2 | `theory/week3/security.js` | sanitize, CSP, headers, cookies |

```bash
node theory/week3/security.js
```

---

## Шаг 2 — EXPLAIN (15 мин)

Закрой файлы. Объясни **как коллеге**:

1. Reflected vs Stored vs DOM XSS — пример на каждый
2. `dangerouslySetInnerHTML` — когда ок, как защититься?
3. CSRF — как атака работает на bank.com?
4. SameSite=Strict/Lax/None — что меняется?
5. XSS vs CSRF — в чём разница?

---

## Шаг 3 — CODE (40 мин) ✍️

### Мини-marathon (3 мин × 2 темы, **без подсказок**, таймер):

1. **XSS:** виды → как злоумышленник внедряет → 3 способа защиты (escape, CSP, httpOnly)
2. **CSRF:** сценарий → token / SameSite / double submit

На бумаге: React-компонент `<UserComment text={userInput} />` — где XSS и fix.

---

## Шаг 4 — MOCK (10 мин)

```bash
node mockInterview/questions.js 25
```

---

## CHECK

> ✅ Прогресс → [Issue](https://github.com/000Ilya000/interview_topics/issues/new?template=course_progress.md)

- [ ] xssCsrf.md + security.js прочитал
- [ ] XSS 3 вида + CSRF — 3 мин вслух
- [ ] XSS vs CSRF — чётко различаю

**Завтра → [DAY_26.md](DAY_26.md)** — Data fetching ★
