import {
  createTheme,
  experimental_extendTheme,
  responsiveFontSizes,
} from "@mui/material";
import { deepmerge } from "@mui/utils";

const baseThemeSettings = createTheme({
  typography: {
    allVariants: {
      fontFamily: "'Poppins', sans-serif",
    },
    outlined: {
      color: "#fff",
      letterSpacing: "1.5px",
      textShadow:
        "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
    },
  },
});

const darkThemeSettings = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#aba2cd",
      light: "#7B6EAF",
      dark: "#3E336D",
      contrastText: "fff",
      50: "#ebe8f2",
      100: "#ccc7e1",
      200: "#aba2cd",
      300: "#8a7eb9",
      400: "#7263aa",
      500: "#5a4a9c",
      600: "#534596",
      700: "#342c6e",
      800: "#1d1849",
      900: "#110628",
    },
    secondary: {
      main: "#c93042",
      light: "#D35967",
      dark: "#8C212E",
      contrastText: "fff",
      50: "#ded2d2",
      100: "#ffcbcb",
      200: "#ff939e",
      300: "#da737e",
      400: "#e55361",
      500: "#eb414c",
      600: "#db3949",
      700: "#c93042",
      800: "#bc2a3b",
      900: "#ac2130",
    },
    btnHover: "#3E336D",
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
    background: {
      default: "#303030",
      paper: "#424242",
    },
    divider: "rgba(255, 255, 255, 0.12)",
  },
  typography: {
    allVariants: {
      color: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: ({ theme }) => ({
          backgroundColor: theme.palette.primary[600],
          color: "#fffcfc",
          textTransform: "uppercase",
          letterSpacing: 2,
          fontSize: "large",
        }),
      },
    },
  },
});

const lightThemeSettings = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3e3783",
      light: "#7B6EAF",
      dark: "#3E336D",
      contrastText: "fff",
      50: "#ebe8f2",
      100: "#ccc7e1",
      200: "#aba2cd",
      300: "#8a7eb9",
      400: "#7263aa",
      500: "#5a4a9c",
      600: "#534596",
      700: "#342c6e",
      800: "#1d1849",
      900: "#110628",
    },
    secondary: {
      main: "#c93042",
      light: "#D35967",
      dark: "#8C212E",
      contrastText: "fff",
      50: "#fcebef",
      100: "#f8cdd6",
      200: "#e69aa2",
      300: "#da737e",
      400: "#e55361",
      500: "#eb414c",
      600: "#db3949",
      700: "#c93042",
      800: "#bc2a3b",
      900: "#ac2130",
    },
    btnHover: "#ccc7e1",
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    background: {
      default: "#ffffff",
      paper: "#f6f6f6",
    },
    divider: "rgba(0, 0, 0, 0.12)",
  },
  typography: {
    allVariants: {
      color: "rgba(0, 0, 0, 0.87)",
    },
  },
});

export const lightTheme = responsiveFontSizes(
  createTheme(deepmerge(baseThemeSettings, lightThemeSettings))
);
export const darkTheme = responsiveFontSizes(
  createTheme(deepmerge(baseThemeSettings, darkThemeSettings))
);

export const extendedDarkTheme = experimental_extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: "#aba2cd",
          light: "#7B6EAF",
          dark: "#3E336D",
          contrastText: "#fff",
          50: "#ebe8f2",
          100: "#ccc7e1",
          200: "#aba2cd",
          300: "#8a7eb9",
          400: "#7263aa",
          500: "#5a4a9c",
          600: "#534596",
          700: "#342c6e",
          800: "#1d1849",
          900: "#110628",
        },
        secondary: {
          main: "#c93042",
          light: "#D35967",
          dark: "#8C212E",
          contrastText: "#fff",
          50: "#ded2d2",
          100: "#ffcbcb",
          200: "#ff939e",
          300: "#da737e",
          400: "#e55361",
          500: "#eb414c",
          600: "#db3949",
          700: "#c93042",
          800: "#bc2a3b",
          900: "#ac2130",
        },
        btnHover: "#3E336D",
        text: {
          primary: "#fff",
          secondary: "rgba(255, 255, 255, 0.7)",
          disabled: "rgba(255, 255, 255, 0.5)",
        },
        background: {
          default: "#303030",
          paper: "#424242",
        },
        divider: "rgba(255, 255, 255, 0.12)",
        AppBar: {
          darkBg: "#303030",
        },
      },
    },
  },
  typography: {
    allVariants: {
      fontFamily: "'Poppins', sans-serif",
    },
    outlined: {
      color: "#fff",
      letterSpacing: "1.5px",
      textShadow:
        "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: ({ theme }) => ({
          backgroundColor: theme.palette.primary[600],
          color: "#fffcfc",
          textTransform: "uppercase",
          letterSpacing: 2,
          fontSize: "large",
        }),
      },
    },
  },
});
