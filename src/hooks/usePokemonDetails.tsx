import { useEffect, useState } from "react";
import pokeapi from "../api/pokeapi";

//Fetches and stores the necessary data for a Pokémon.
const usePokemonDetails = (name: string) => {
  const [pokemon, setPokemon] = useState({
    abilities: [],
    base_experience: 0,
    forms: [],
    game_indices: [],
    height: 0,
    held_items: [],
    id: 0,
    is_default: true,
    location_area_encounters: "",
    moves: [],
    name: "",
    order: 0,
    past_types: [],
    species: {},
    sprites: {},
    stats: [],
    types: [],
    weight: 0,
  });

  const [species, setSpecies] = useState({});

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
