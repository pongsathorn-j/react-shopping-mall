import { createTheme } from "@mui/material";

const theme = (themeMode) =>
  createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#80cbc4",
        light: "b2fef7",
        dark: "4f9a94",
        contrastText: "000000",
      },
      secondary: {
        light: "#ea605d",
        main: "#e53935",
        dark: "#a02725",
        contrastText: "#000",
      },
      background: {
        default: themeMode==='dark'? '#121212': "#F5F5F5"
      }
    },

  });

export default theme;
