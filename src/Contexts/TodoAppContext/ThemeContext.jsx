import { createContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  }

  const Theme = {
    isDarkMode,
    toggleTheme,
  }
  return (
    <ThemeContext.Provider value={Theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;
export { ThemeContext };