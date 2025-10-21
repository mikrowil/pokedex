import React, { PropsWithChildren } from "react";
import "./App.css";
import "./declarations.d.ts";
import Header from "./components/Header/Header";
import {
  Experimental_CssVarsProvider as CssVarProvider,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import Navigator from "./components/Navigator";
import { useContext, useEffect, useState } from "react";
import { darkTheme, extendedDarkTheme, lightTheme } from "./theme/theme";
import StyledBackground from "./layout/StyledBackground/StyledBackground";
import { LanguageContextProvider } from "./context/LanguageContext";
import {
  ColorModeContext,
  ColorModeProvider,
} from "./context/ColorModeContext";
import "./assets/styles/variables.scss";
import { AuthProvider } from "./context/AuthContext";

type Mode = "light" | "dark";

const getTheme = (mode: Mode) => {
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
    <AuthProvider>
      <StyledEngineProvider injectFirst={true}>
        <CssVarProvider theme={extendedDarkTheme} defaultMode="dark">
          <ThemeProvider theme={theme}>
            <StyledBackground>
              <Header />
              <div className={"screen_container"}>
                <div className={"inner_container"}>
                  <Navigator />
                </div>
              </div>
            </StyledBackground>
          </ThemeProvider>
        </CssVarProvider>
      </StyledEngineProvider>
    </AuthProvider>
  );
}

const WrapperC = ({ children }: PropsWithChildren) => {
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
