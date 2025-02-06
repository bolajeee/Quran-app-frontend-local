import React, { createContext, useState, useContext } from "react";
import { Colors } from "./styles";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    backgroundColor: isDarkMode ? "#1a1a1a" : "#004225",
    textColor: isDarkMode ? "#ffffff" : Colors.primary,
    cardBackground: isDarkMode ? "#333333" : "rgba(255,255,255,0.1)",
    listBackground: isDarkMode ? "#2a2a2a" : Colors.primary,
    iconColor: isDarkMode ? "#ffffff" : Colors.darkLight,
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
