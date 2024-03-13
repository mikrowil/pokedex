import { createContext, useState } from "react";

export const LanguageContext = createContext();

//Allows the user to set their language preference.
export const LanguageContextProvider = ({ children }) => {
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
