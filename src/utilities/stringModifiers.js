export const cleanPokemonName = (name) => {
  let cleanedValue = name.replace(
    /[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi,
    ""
  );

  return cleanedValue.split(" ").join("-");
};
