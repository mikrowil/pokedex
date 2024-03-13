//Transforms the pokemons name so the api can search by it.
export const cleanPokemonName = (name) => {
  let cleanedValue = name.replace(
    /[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi,
    ""
  );

  return cleanedValue.split(" ").join("-");
};
