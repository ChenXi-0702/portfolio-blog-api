import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.js";

export default function ThemeToggle() {
  const theme = useContext(ThemeContext);
  let buttonText = "Use dark theme";
  if (theme.dark) {
    buttonText = "Use light theme";
  }
  return (
    <button type="button" onClick={theme.toggleTheme} aria-pressed={theme.dark}>
      {buttonText}
    </button>
  );
}