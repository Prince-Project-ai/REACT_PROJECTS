import { useContext } from "react";
import { ThemeContext } from "../TodoAppContext/ThemeContext";

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('use Theme is must be used within ThemeProvider');
    }
    return context;
};
