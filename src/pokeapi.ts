import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor(cache: Cache) {
    this.#cache = cache;
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    return this.#fetchAndCache(url, `locations ${url}`);
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    return this.#fetchAndCache(url, `location ${locationName}`);
  }

  async fetchPokemonInLocation(locationName: string): Promise<Array<string>> {
    const location = await this.fetchLocation(locationName);
    const pokemons: string[] = [];
    for (const pokemon of location.pokemon_encounters) {
      pokemons.push(pokemon.pokemon.name);
    }
    return pokemons;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    return this.#fetchAndCache(url, `pokemon ${pokemonName}`);
  }

  async fetchPokemonProperty<K extends keyof Pokemon>(
    pokemonName: string,
    property: K,
  ) {
    const pokemon: Pokemon = await this.fetchPokemon(pokemonName);
    if (!(property in pokemon)) {
      throw new Error(`${property} is not a valid property in Pokemon`);
    }
    return pokemon[property]; // I want this to be pokemon[property]
  }

  async #fetchAndCache<T>(url: string, errorContext: string): Promise<T> {
    const cached = this.#cache.get<T>(url);

    if (cached) {
      return cached;
    }
    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const respJSON: T = await resp.json();
      this.#cache.add<T>(url, respJSON);
      return respJSON;
    } catch (e) {
      throw new Error(
        `Error fetching ${errorContext}: ${(e as Error).message}`,
      );
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Array<{
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }>;
  past_abilities: Array<{
    generation: {
      name: string;
      url: string;
    };
    abilities: Array<{
      is_hidden: boolean;
      slot: number;
      ability: any;
    }>;
  }>;
  forms: Array<{
    name: string;
    url: string;
  }>;
  game_indices: Array<{
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }>;
  held_items: Array<any>;
  location_area_encounters: string;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      version_group: {
        name: string;
        url: string;
      };
      move_learn_method: {
        name: string;
        url: string;
      };
      order?: number;
    }>;
  }>;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    other: {
      home: {
        front_shiny: string;
        front_female: any;
        front_default: string;
        front_shiny_female: any;
      };
      showdown: {
        back_shiny: string;
        back_female: any;
        front_shiny: string;
        back_default: string;
        front_female: any;
        front_default: string;
        back_shiny_female: any;
        front_shiny_female: any;
      };
      dream_world: {
        front_female: any;
        front_default: string;
      };
      "official-artwork": {
        versions: {
          "generation-i": {
            "red-and-blue": {
              front_default: string;
            };
            "red-and-green": {
              front_default: string;
            };
          };
          "generation-ii": {
            "gold-and-silver": {
              front_default: any;
            };
          };
        };
        front_shiny: string;
        front_default: string;
      };
    };
    versions: {
      "generation-i": {
        yellow: {
          back_gbc: string;
          back_gray: string;
          front_gbc: string;
          front_gray: string;
          back_default: string;
          front_default: string;
          back_transparent: string;
          front_transparent: string;
          back_transparent_gray: string;
          front_transparent_gray: string;
        };
        "red-blue": {
          back_gray: string;
          front_gray: string;
          back_default: string;
          front_default: string;
          back_transparent: string;
          front_transparent: string;
          back_transparent_gray: string;
          front_transparent_gray: string;
        };
        "red-green-japan": {
          back_gray: string;
          front_gray: string;
          back_default: string;
          front_default: string;
        };
      };
      "generation-v": {
        icons: {
          animated: {
            front_default: string;
          };
          front_default: string;
        };
        "black-white": {
          animated: {
            back_shiny: string;
            back_female: any;
            front_shiny: string;
            back_default: string;
            front_female: any;
            front_default: string;
            back_shiny_female: any;
            front_shiny_female: any;
          };
          back_shiny: string;
          back_female: any;
          front_shiny: string;
          back_default: string;
          front_female: any;
          front_default: string;
          back_shiny_female: any;
          front_shiny_female: any;
        };
      };
      "generation-ii": {
        gold: {
          back_shiny: string;
          front_shiny: string;
          back_default: string;
          front_default: string;
          back_transparent: string;
          front_transparent: string;
          back_shiny_transparent: string;
          front_shiny_transparent: string;
        };
        silver: {
          back_shiny: string;
          front_shiny: string;
          back_default: string;
          front_default: string;
          back_transparent: string;
          front_transparent: string;
          back_shiny_transparent: string;
          front_shiny_transparent: string;
        };
        crystal: {
          animated: {
            front_shiny: string;
            front_default: string;
          };
          back_shiny: string;
          front_shiny: string;
          back_default: string;
          front_default: string;
          back_transparent: string;
          front_transparent: string;
          back_shiny_transparent: string;
          front_shiny_transparent: string;
        };
      };
      "generation-iv": {
        icons: {
          front_default: string;
        };
        platinum: {
          animated: {
            front_shiny: string;
            front_female: any;
            front_default: string;
            front_shiny_female: any;
          };
          back_shiny: string;
          back_female: any;
          front_shiny: string;
          back_default: string;
          front_female: any;
          front_default: string;
          back_shiny_female: any;
          front_shiny_female: any;
        };
        "diamond-pearl": {
          animated: {
            front_shiny: string;
            front_female: any;
            front_default: string;
            front_shiny_female: any;
          };
          back_shiny: string;
          back_female: any;
          front_shiny: string;
          back_default: string;
          front_female: any;
          front_default: string;
          back_shiny_female: any;
          front_shiny_female: any;
        };
        "heartgold-soulsilver": {
          animated: {
            front_shiny: string;
            front_female: any;
            front_default: string;
            front_shiny_female: any;
          };
          back_shiny: string;
          back_female: any;
          front_shiny: string;
          back_default: string;
          front_female: any;
          front_default: string;
          back_shiny_female: any;
          front_shiny_female: any;
        };
      };
      "generation-ix": {
        champions: {
          icons: {
            front_shiny: any;
            front_default: any;
          };
          back_shiny: any;
          back_female: any;
          front_shiny: any;
          back_default: any;
          front_female: any;
          front_default: any;
          back_shiny_female: any;
          front_shiny_female: any;
        };
        "legends-za": {
          icons: {
            front_shiny: string;
            front_female: any;
            front_default: string;
            front_shiny_female: any;
          };
          back_shiny: string;
          back_female: any;
          front_shiny: string;
          back_default: string;
          front_female: any;
          front_default: string;
          back_shiny_female: any;
          front_shiny_female: any;
        };
        "scarlet-violet": {
          icons: {
            front_female: any;
            front_default: string;
          };
          back_shiny: string;
          back_female: any;
          front_shiny: string;
          back_default: string;
          front_female: any;
          front_default: string;
          back_shiny_female: any;
          front_shiny_female: any;
        };
      };
      "generation-vi": {
        "x-y": {
          back_shiny: string;
          back_female: any;
          front_shiny: string;
          back_default: string;
          front_female: any;
          front_default: string;
          back_shiny_female: any;
          front_shiny_female: any;
        };
        icons: {
          front_female: any;
          front_default: string;
        };
        "omega-ruby-alpha-sapphire": {
          back_shiny: string;
          back_female: any;
          front_shiny: string;
          back_default: string;
          front_female: any;
          front_default: string;
          back_shiny_female: any;
          front_shiny_female: any;
        };
      };
      "generation-iii": {
        icons: {
          front_default: string;
        };
        emerald: {
          animated: {
            back_shiny: string;
            front_shiny: string;
            back_default: string;
            front_default: string;
          };
          back_shiny: string;
          front_shiny: string;
          back_default: string;
          front_default: string;
        };
        "ruby-sapphire": {
          back_shiny: string;
          front_shiny: string;
          back_default: string;
          front_default: string;
        };
        "firered-leafgreen": {
          back_shiny: string;
          front_shiny: string;
          back_default: string;
          front_default: string;
        };
      };
      "generation-vii": {
        icons: {
          front_female: any;
          front_default: string;
        };
        "ultra-sun-ultra-moon": {
          back_shiny: string;
          back_female: any;
          front_shiny: string;
          back_default: string;
          front_female: any;
          front_default: string;
          back_shiny_female: any;
          front_shiny_female: any;
        };
        "lets-go-pikachu-lets-go-eevee": {
          icons: {
            front_default: string;
          };
          back_shiny: string;
          back_female: any;
          front_shiny: string;
          back_default: string;
          front_female: any;
          front_default: string;
          back_shiny_female: any;
          front_shiny_female: any;
        };
      };
      "generation-viii": {
        "sword-shield": {
          icons: {
            front_female: any;
            front_default: string;
          };
          back_shiny: string;
          back_female: any;
          front_shiny: string;
          back_default: string;
          front_female: any;
          front_default: string;
          back_shiny_female: any;
          front_shiny_female: any;
        };
        "legends-arceus": {
          icons: {
            front_shiny: any;
            front_female: any;
            front_default: any;
            front_shiny_female: any;
          };
          back_shiny: any;
          back_female: any;
          front_shiny: any;
          back_default: any;
          front_female: any;
          front_default: any;
          back_shiny_female: any;
          front_shiny_female: any;
        };
        "brilliant-diamond-shining-pearl": {
          icons: {
            front_default: string;
          };
          back_shiny: string;
          back_female: any;
          front_shiny: string;
          back_default: string;
          front_female: any;
          front_default: string;
          back_shiny_female: any;
          front_shiny_female: any;
        };
      };
    };
    back_shiny: string;
    back_female: any;
    front_shiny: string;
    back_default: string;
    front_female: any;
    front_default: string;
    back_shiny_female: any;
    front_shiny_female: any;
  };
  cries: {
    latest: string;
    legacy: string;
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  past_stats: Array<{
    generation: {
      name: string;
      url: string;
    };
    stats: Array<{
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    }>;
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  past_types: Array<any>;
};
