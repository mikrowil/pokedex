import axios from "axios";

export default axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export interface Name {
  name: string;
  language: Language;
}

export interface Language {
  id: number;
  name: string;
  official: boolean;
  iso639: string;
  iso3166: string;
  names: Name[];
}

export interface APIResource {
  url: string;
}

export interface Effect {
  effect: string;
  language: Language;
}

export interface EncounterCondition {
  id: number;
  name: string;
  names: Name[];
  values: EncounterConditionValue[];
}

export interface EncounterConditionValue {
  id: number;
  name: string;
  conditions: {};
  names: Name[];
}

export interface Encouter {
  min_level: number;
  max_level: number;
  condition_values: {
    name: string;
    url: string;
  }[];
  chance: number;
  method: {
    name: string;
    url: string;
  };
}

export interface Description {
  description: string;
  language: Language;
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
}

export interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    move_learn_method: {
      name: string;
      url: string;
    };
    level_learned_at: number;
    version_group: {
      name: string;
      url: string;
    };
  }[];
  level: number;
}

export interface Species {
  name: string;
  url: string;
}

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: any[];
  game_indices: any[];
  height: number;
  weight: number;
  held_items: any[];
  id: number;
  name: {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
  };
  stats: any[];
  types: any[];
  image: {
    sprite: string;
    thumbnail: string;
  };
  sprites: {
    front_default: string;
    front_shiny: string;
    front_female?: string;
    front_shiny_female?: string;
    back_default: string;
    back_shiny: string;
    back_female?: string;
    back_shiny_female?: string;
  };
  moves: Move[];
  species: any[];
  evolution: any[];
}

export interface PokemonDetails {
  abilities: Ability[];
  base_experience: number;
  forms: any[];
  game_indices: any[];
  height: number;
  weight: number;
  held_items: any[];
  id: number;
  name: string;
  stats: any[];
  types: any[];
  sprites: {
    front_default: string;
    front_shiny: string;
    front_female?: string;
    front_shiny_female?: string;
    back_default: string;
    back_shiny: string;
    back_female?: string;
    back_shiny_female?: string;
  };
  moves: Move[];
  species: any[];
  evolution: any[];
}
