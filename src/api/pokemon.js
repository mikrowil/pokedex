import pokeapi from "./pokeapi";

export const getPokemonByName = (name) => {
  if (!name) {
    return null;
  }
  try {
    const results = pokeapi.get(`/pokemon/${name}`);

    return results;
  } catch (e) {}
};
