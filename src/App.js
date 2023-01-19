import "./App.css";
import Header from "./components/Header/Header";
import { ThemeProvider } from "@mui/material";
import Navigator from "./components/Navigator";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "./theme/theme";
import StyledBackground from "./layout/StyledBackground/StyledBackground";
import { LanguageContextProvider } from "./contex/LanguageContext";

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
  const [mode, setMode] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  const [theme, setTheme] = useState(getTheme(mode));

  useEffect(() => {
    setTheme(getTheme(mode));
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <LanguageContextProvider>
        <StyledBackground>
          <Header mode={mode} setMode={setMode} />
          <Navigator />
        </StyledBackground>
      </LanguageContextProvider>
    </ThemeProvider>
  );
}

export default App;
