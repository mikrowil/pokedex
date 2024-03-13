import { useContext, useEffect, useState } from "react";
import pokedex from "../assets/pokedex.json";
import { LanguageContext } from "../contex/LanguageContext";

//Allows the user to search for a Pokémon by name
const useSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(pokedex);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    if (inputValue.length > 0) {
      setResult(
        pokedex.filter((pokemon) =>
          pokemon.name[language]
            .toLowerCase()
            .startsWith(inputValue.toLowerCase())
        )
      );
    } else {
      setResult(pokedex);
    }
  }, [inputValue, language]);

  return { inputValue, result, setInputValue };
};

export default useSearch;
