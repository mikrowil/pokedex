import { createContext, useContext, useState } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

//Allows the user to set their language preference.
export const LanguageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState("english");

  const context = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={context}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);

  if (!context) throw new Error("Can't be used outside of Language Provider.");

  return context;
};
