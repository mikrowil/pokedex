import { useState } from "react";
import pokeapi from "../api/pokeapi";

const usePokemon = (limit = 40) => {
  const fetchPokemon = async () => {
    setIsLoading(true);

    const response = await pokeapi.get("/pokemon", {
      params: next,
    });

    setNext({
      offset: next.offset + next.limit,
      limit: next.limit,
    });
    setPokemon([...pokemon, ...response.data.results]);

    setIsLoading(false);
  };

  const [pokemon, setPokemon] = useState(fetchPokemon());
  const [next, setNext] = useState({ offset: 0, limit: limit });

  const [isLoading, setIsLoading] = useState(false);

  const showMore = () => {
    fetchPokemon().then();
  };

  return { pokemon, showMore, isLoading };
};

export default usePokemon;
