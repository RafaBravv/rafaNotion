import { ThemeContext } from "@react-navigation/native";
import { useContext } from "react";

export const useThemeContext = () => {
    const theme = useContext(ThemeContext);
    if (theme === undefined){
        throw new Error("UseTheme debe ser usado dentro de ThemeContext");
    }
    return theme;
}