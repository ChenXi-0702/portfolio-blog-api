import { useState } from "react";
import { ThemeContext } from "./ThemeContext.js";

export default function ThemeProvider(props) {
  const [dark, setDark] = useState(false);
  function toggleTheme() {
    setDark(!dark);
  }
  const value = {
    dark: dark,
    toggleTheme: toggleTheme
  };
  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}