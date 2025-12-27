import { useContext, useEffect, useState } from "react";
import pokedex from "../assets/pokedex.json";
import {
  LanguageContext,
  useLanguageContext,
} from "../context/language-context";
import { Pokemon } from "../api/pokeapi";

//Allows the user to search for a Pokémon by name
const useSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<Pokemon[]>(
    pokedex as unknown as Pokemon[]
  );
  const { language } = useLanguageContext();

  useEffect(() => {
    if (inputValue.length > 0) {
      setResult(
        pokedex.filter((pokemon) =>
          // @ts-ignore
          pokemon.name[language]
            .toLowerCase()
            .startsWith(inputValue.toLowerCase())
        ) as unknown as Pokemon[]
      );
    } else {
      setResult(pokedex as unknown as Pokemon[]);
    }
  }, [inputValue, language]);

  return { inputValue, result, setInputValue };
};

export default useSearch;
