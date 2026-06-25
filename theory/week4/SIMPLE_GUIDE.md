# Неделя 4–5 — Архитектура + собес простым языком

---

## FSD — «разложить проект по полкам»

```
app/       → настройки, роутинг (потолок)
pages/     → целые страницы (комнаты)
widgets/   → большие блоки: Header, Sidebar (мебель)
features/  → действия: Login, AddToCart (выключатели)
entities/  → сущности: User, Product (предметы)
shared/    → ui-kit, api, utils (инструменты)
```

**Правило:** импорт только **вниз**. `features` не тянет из `pages`.

*Жизнь:* кухня не лезет в спальню за продуктами — всё через кладовку (`shared`).

**На собесе «50 разработчиков»:** FSD или monorepo с чёткими границами + eslint на импорты.

---

## State — «где хранить данные»

| Что | Где | Жизнь |
|-----|-----|-------|
| Поле ввода | `useState` | Записка на столе |
| Данные с API | TanStack Query | Общая доска с API, автообновление |
| Корзина, UI prefs | Zustand | Общий ящик в open space |
| Сложная бизнес-логика | Redux/RTK | Бухгалтерия с журналом всех операций |

**Не клади API в Redux** — для этого Query.

---

## SOLID — без академии

| | Простыми словами |
|---|------------------|
| **S** | Один компонент — одна задача. Кнопка не fetch'ит API. |
| **O** | Расширяй через props, не лезь внутрь чужого компонента. |
| **L** | `PrimaryButton` и `DangerButton` взаимозаменяемы там, где ждут Button. |
| **I** | Не передавай 50 props — разбей интерфейс. |
| **D** | Компонент получает `fetchUser`, не импортирует `api.ts` напрямую. |

---

## Monorepo — «один репозиторий, много приложений»

```
apps/web, apps/admin
packages/ui, packages/api-client
```

*Turborepo/Nx* — «собери только то, что изменилось».

*Жизнь:* один склад, несколько магазинов. Общие коробки (ui-kit) для всех.

---

## Design System — «конструктор LEGO»

Tokens (цвета, отступы) → Button, Input → Form, Card → страницы.

*Жизнь:* не печатаешь каждую кнопку с нуля — берёшь из набора.

---

## Как готовиться к mock (DAY 23–25)

1. **3 минуты вслух** — не монолог, как коллеге
2. Структура: «проблема → решение → пример из работы»
3. Не знаешь — честно + как бы googl'ил / спросил команду

**Senior-вопросы повторить:**
- XSS/CSRF (`xssCsrf.md`)
- Race condition (`reliableDataFetching.md`)
- Reflow (`reflowRepaint.md`)
- Focus trap (`accessibleComponents.md`)
- Code split (`codeSplitting.md`)

---

## Файлы

| День | Тема |
|------|------|
| 16–20 | Perf, a11y — week3 SIMPLE + md |
| 21 | `featureSlicedDesign.js`, `stateManagement.jsx` |
| 22 | `solid.js`, `monorepo.js` |
| 23–25 | `mockInterview/questions.js` |

**Расписание:** `schedule/DAY_21` … `DAY_25`
