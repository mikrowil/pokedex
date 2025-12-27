import { createContext, useContext, useState } from "react";
import { Mode } from "../interfaces/app-settings";

type ColorModeContextType = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};

export const ColorModeContext = createContext<ColorModeContextType | null>(
  null
);

export const ColorModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? ("dark" as Mode)
      : ("light" as Mode)
  );

  const context = {
    mode,
    setMode,
  };

  return (
    <ColorModeContext.Provider value={context}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
};
