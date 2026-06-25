# Доступность интерактивных компонентов — Senior

> **Middle:** role="dialog", Escape закрывает, слышал про aria-label, Radix/HeadlessUI  
> **Senior:** focus trap, возврат фокуса, inert, тестирует со screen reader

📖 [WAI-ARIA: Dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)  
📖 [Radix UI Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) — эталон реализации

---

## Минимум (Middle — уже хорошо)

```jsx
<div role="dialog" aria-labelledby="title" aria-modal="true">
  <h2 id="title">Подтверждение</h2>
  <button onClick={onClose}>Закрыть</button>
</div>
```

- `role="dialog"` — «это модалка»
- `aria-modal="true"` — фон неактивен
- `aria-labelledby` — screen reader озвучит заголовок
- Escape закрывает

---

## Focus trap — зачем

**Проблема:** модалка открыта, пользователь жмёт Tab — фокус уходит **под** модалку на фон. Человек с клавиатуры или screen reader теряется.

**Focus trap:** Tab циклически ходит **только** по элементам внутри модалки.

```
Tab → кнопка 1 → кнопка 2 → кнопка «Закрыть» → снова кнопка 1
```

Библиотеки (Radix, Focus Trap React) делают это автоматически.  
**Senior** понимает **зачем**, даже если использует библиотеку.

---

## Возврат фокуса на триггер

```jsx
const triggerRef = useRef(null);

function openModal() {
  triggerRef.current = document.activeElement;
  setOpen(true);
}

function closeModal() {
  setOpen(false);
  triggerRef.current?.focus(); // вернули фокус на кнопку «Открыть»
}
```

Без этого: закрыл модалку → фокус пропал → пользователь не знает где он.

---

## aria-hidden vs inert на фоне

Пока модалка открыта, **фон не должен быть интерактивным**.

| | aria-hidden | inert |
|---|-------------|-------|
| **Что делает** | Скрывает от screen reader | Блокирует **и** фокус, **и** клики |
| **Поддержка** | Везде | Современные браузеры |
| **Когда** | Контент «невидим» для SR | Полная блокировка фона |

```html
<main inert> <!-- или aria-hidden="true" -->
  ... контент под модалкой ...
</main>
```

**Senior знает:** `aria-hidden` не блокирует Tab программно — нужен focus trap. `inert` блокирует всё.

📖 [MDN: inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert)

---

## prefers-reduced-motion

Пользователь в настройках OS включил «уменьшить движение» — не крути тяжёлую анимацию модалки.

```css
.modal {
  animation: slideIn 0.3s;
}

@media (prefers-reduced-motion: reduce) {
  .modal {
    animation: none;
  }
}
```

---

## Тестирование

**Автотесты не заменяют ручную проверку a11y.**

1. **Tab** — могу пройти всю модалку с клавиатуры?
2. **Escape** — закрывается?
3. **VoiceOver** (Mac: Cmd+F5) / **NVDA** (Windows) — озвучивается заголовок?
4. После закрытия — фокус вернулся?

⚠️ **Senior знает:** многие UI-библиотеки делают a11y не идеально — проверяй сам, не верь слепо.

---

## Чеклист модалки

- [ ] `role="dialog"` + `aria-modal="true"`
- [ ] Focus trap работает
- [ ] Escape закрывает
- [ ] Фокус возвращается на триггер
- [ ] Фон `inert` или `aria-hidden`
- [ ] `prefers-reduced-motion` учтён
- [ ] Проверил с Tab + screen reader

---

## Что сказать на собесе

> «Модалка — это не div по центру. Focus trap чтобы Tab не уходил на фон. При закрытии возвращаю фocus на кнопку-триггер. Фон блокирую через inert. Учитываю prefers-reduced-motion. Тестирую Tab + VoiceOver вручную. Radix использую, но понимаю что он делает под капотом.»

---

## Связанные темы

- `htmlCssA11y.js` — базовая семантика
- `theory/week2/advancedPatterns.jsx` — React Portals для модалок
