//Transforms the pokemons name so the api can search by it.
export const cleanPokemonName = (name: string) => {
  let cleanedValue = name.replace(
    /[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi,
    ""
  );

  return cleanedValue.split(" ").join("-");
};
