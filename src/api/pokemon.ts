import pokeapi from "./pokeapi";

export const getPokemonByName = async (name: string) => {
  return pokeapi.get(`/pokemon/${name}`);
};
