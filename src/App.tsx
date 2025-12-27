import React, { PropsWithChildren } from "react";
import "./App.css";
import "./declarations.d.ts";
import Header from "./components/header/header";

import Navigator from "./components/Navigator";
import { LanguageContextProvider } from "./context/language-context";
import { ColorModeProvider } from "./context/color-mode-context";
import { AuthProvider } from "./context/auth-context";

function App() {
  return (
    <AuthProvider>
      <div>
        <Header />
        <div className={"max-w-[1280px] mx-auto w-full"}>
          <Navigator />
        </div>
      </div>
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
