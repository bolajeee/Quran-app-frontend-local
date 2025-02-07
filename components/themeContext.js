import React, { createContext, useState, useContext } from "react";
import { Colors } from "./styles";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
    textColor: isDarkMode ? Colors.primary : Colors.tertiary,
    cardBackground: isDarkMode ? "#333333" : "#f9f9f9",
    listBackground: isDarkMode ? "#2a2a2a" : "#ffffff",
    iconColor: isDarkMode ? "#ffffff" : Colors.darkLight,
    darkLight: isDarkMode ? "#b0b0b0" : "#9CA3AF",
    brand: "#10B981",
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
