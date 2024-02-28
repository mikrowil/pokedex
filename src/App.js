import "./App.css";
import Header from "./components/Header/Header";
import {
  Experimental_CssVarsProvider as CssVarProvider,
  ThemeProvider,
} from "@mui/material";
import Navigator from "./components/Navigator";
import { useContext, useEffect, useState } from "react";
import { darkTheme, extendedDarkTheme, lightTheme } from "./theme/theme";
import StyledBackground from "./layout/StyledBackground/StyledBackground";
import { LanguageContextProvider } from "./contex/LanguageContext";
import { ColorModeContext, ColorModeProvider } from "./contex/ColorModeContext";
import "./assets/styles/variables.scss";

const getTheme = (mode) => {
  switch (mode) {
    case "light":
      return lightTheme;
    case "dark":
      return darkTheme;
    default:
      return lightTheme;
  }
};

function App() {
  const { mode } = useContext(ColorModeContext);
  const [theme, setTheme] = useState(getTheme(mode));

  useEffect(() => {
    setTheme(getTheme(mode));
  }, [mode]);

  return (
    <CssVarProvider theme={extendedDarkTheme} defaultMode="dark">
      <ThemeProvider theme={theme}>
        <StyledBackground>
          <Header />
          <Navigator />
        </StyledBackground>
      </ThemeProvider>
    </CssVarProvider>
  );
}

const WrapperC = ({ children }) => {
  return (
    <ColorModeProvider>
      <LanguageContextProvider>{children}</LanguageContextProvider>
    </ColorModeProvider>
  );
};

const WrapperApp = () => {
  return (
    <WrapperC>
      <App />
    </WrapperC>
  );
};

export default WrapperApp;
