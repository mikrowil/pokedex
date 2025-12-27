import { useEffect, useState } from "react";
import pokeapi, { PokemonDetails, Species } from "../api/pokeapi";

//Fetches and stores the necessary data for a Pokémon.
const usePokemonDetails = (name: string) => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

  const [species, setSpecies] = useState<Species | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setIsLoading(true);

      const results = (await pokeapi.get(`/pokemon/${name}`)).data;
      const speciesRes = (await pokeapi.get(`/pokemon-species/${name}`)).data;

      setPokemon(results);
      setSpecies(speciesRes);

      setIsLoading(false);
    };
    fetchPokemonDetails().then();
  }, [name]);

  return { pokemon, species, isLoading };
};

export default usePokemonDetails;
