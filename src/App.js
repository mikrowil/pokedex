import "./App.css";
import Header from "./components/Header/Header";
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material";
import styled, { ThemeProvider as TP } from "styled-components";
import Navigator from "./components/Navigator";
import { useState } from "react";

const StyledBackground = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  background-size: cover;
  transition: background-color 1000ms ease-in-out;
`;

const theme = createTheme({
  palette: {
    mode: "light",
  },
  bg: {
    main: "#DCE1E9",
    light: "#e9eff5",
  },
  typography: {
    allVariants: {
      fontFamily: "'Poppins', sans-serif",
    },
    h4: {
      color: "#363732",
    },
    h5: {
      color: "#363732",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  bg: {
    main: "#363732",
    light: "#56564f",
  },
  typography: {
    allVariants: {
      fontFamily: "'Poppins', sans-serif",
    },
    h4: {
      color: "#DCE1E9",
    },
    h5: {
      color: "#DCE1E9",
    },
  },
});

function App() {
  const [mode, setMode] = useState("dark");

  const responsiveTheme = responsiveFontSizes(
    mode === "light" ? theme : darkTheme
  );

  return (
    <TP theme={responsiveTheme}>
      <ThemeProvider theme={responsiveTheme}>
        <StyledBackground style={{ backgroundColor: responsiveTheme.bg.main }}>
          <Header mode={mode} setMode={setMode} />
          <Navigator />
        </StyledBackground>
      </ThemeProvider>
    </TP>
  );
}

export default App;
