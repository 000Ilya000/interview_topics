import { createContext, useContext, useState } from "react";

//! CONTEXT — prop drilling alternative
// ⚠️ Все consumers re-render при изменении value
// ⚠️ Разделяй contexts по частоте изменений (theme vs user)

const ThemeContext = createContext("light");

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme}
    </button>
  );
}

//! Оптимизация: split context или useMemo для value object
// const value = useMemo(() => ({ theme, setTheme }), [theme]);

export { ThemeProvider, ThemedButton };
