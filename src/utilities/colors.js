import {
  BUG,
  DARK,
  DRAGON,
  ELECTRIC,
  FAIRY,
  FIGHTING,
  FIRE,
  FLYING,
  GHOST,
  GRASS,
  GROUND,
  ICE,
  NORMAL,
  POISON,
  PSYCHIC,
  ROCK,
  STEEL,
  WATER,
} from "../theme/typeColors";

/**
 * Returns the color hex for a specific pokémon type
 * @param type
 * @returns {string|null}
 */
export const getColor = (type) => {
  if (!type) return null;
  const lower = type.toLowerCase();

  switch (lower) {
    case "bug":
      return BUG;
    case "dark":
      return DARK;
    case "dragon":
      return DRAGON;
    case "electric":
      return ELECTRIC;
    case "fairy":
      return FAIRY;
    case "fighting":
      return FIGHTING;
    case "fire":
      return FIRE;
    case "flying":
      return FLYING;
    case "ghost":
      return GHOST;
    case "grass":
      return GRASS;
    case "ground":
      return GROUND;
    case "ice":
      return ICE;
    case "normal":
      return NORMAL;
    case "poison":
      return POISON;
    case "psychic":
      return PSYCHIC;
    case "rock":
      return ROCK;
    case "steel":
      return STEEL;
    case "water":
      return WATER;
    default:
      return null;
  }
};
