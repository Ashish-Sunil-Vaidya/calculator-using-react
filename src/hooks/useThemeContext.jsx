import { useContext } from "react";

import { ThemeContext } from "../Context/ThemeContext.jsx";

const useThemeContext = () => {
    const context = useContext(ThemeContext);
    return context;
}

export default useThemeContext