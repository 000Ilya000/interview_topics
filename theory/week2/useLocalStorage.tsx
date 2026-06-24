import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}
//использование
const [theme, setTheme] = useLocalStorage("theme", "light");

function useToggle(initialValue = false): [boolean, () => void] {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => {
        setValue((prev) => !prev);
    }, []);

    return [value, toggle];
}
//использование
const [isOpen, toggleOpen] = useToggle();

return <button onClick={toggleOpen}>{isOpen ? "Закрыть" : "Открыть"}</button>;

//! ⚠️ Правила кастомных хуков
// 	1.	Имя должно начинаться с use
// 	2.	Вызовы хуков всегда на верхнем уровне функции
// 	3.	Хуки не вызываются в условиях, циклах и вложенных функциях
