import { TYPES } from "../theme/type-colors";

/**
 * Returns the color hex for a specific pokémon type
 * @param type
 * @returns {string|null}
 */
export const getColor = (type: string) => {
  if (!type) return null;
  const lower = type.toLowerCase();

  switch (lower) {
    case "bug":
      return TYPES.BUG.color;
    case "dark":
      return TYPES.DARK.color;
    case "dragon":
      return TYPES.DRAGON.color;
    case "electric":
      return TYPES.ELECTRIC.color;
    case "fairy":
      return TYPES.FAIRY.color;
    case "fighting":
      return TYPES.FIGHTING.color;
    case "fire":
      return TYPES.FIRE.color;
    case "flying":
      return TYPES.FLYING.color;
    case "ghost":
      return TYPES.GHOST.color;
    case "grass":
      return TYPES.GRASS.color;
    case "ground":
      return TYPES.GROUND.color;
    case "ice":
      return TYPES.ICE.color;
    case "normal":
      return TYPES.NORMAL.color;
    case "poison":
      return TYPES.POISON.color;
    case "psychic":
      return TYPES.PSYCHIC.color;
    case "rock":
      return TYPES.ROCK.color;
    case "steel":
      return TYPES.STEEL.color;
    case "water":
      return TYPES.WATER.color;
    default:
      return null;
  }
};
