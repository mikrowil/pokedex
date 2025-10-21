import pokeapi from "./pokeapi";

export const getPokemonByName = (name) => {
  if (!name) {
    return null;
  }
  return pokeapi.get(`/pokemon/${name}`);
};
