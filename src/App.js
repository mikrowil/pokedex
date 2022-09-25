import "./App.css";
import Header from "./components/Header/Header";
import { ThemeProvider } from "@mui/material";
import Navigator from "./components/Navigator";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "./theme/theme";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const StyledBackground = styled.div(
  ({ theme }) => css`
    display: flex;
    flex: 1;
    background-color: ${theme.palette.background.default};
    flex-direction: column;
    min-height: 100vh;
    background-size: cover;
    transition: background-color 700ms ease-in-out;
  `
);

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
      <StyledBackground>
        <Header mode={mode} setMode={setMode} />
        <Navigator />
      </StyledBackground>
    </ThemeProvider>
  );
}

export default App;
