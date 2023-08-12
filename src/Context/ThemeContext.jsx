/* eslint-disable no-undef */
import { createContext,useState } from "react";

export const ThemeContext = createContext();

// eslint-disable-next-line react/prop-types
const ThemeContextProvider = ({children}) => {
  const [theme, setTheme] = useState("dark");
  const [isOpen, setIsOpen] = useState(false);
  const values = { theme, setTheme, isOpen, setIsOpen };
  return (
    <ThemeContext.Provider value={values}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
