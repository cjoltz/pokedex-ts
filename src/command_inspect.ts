import console from "node:console";
import { Pokemon } from "./pokeapi.js";
import { State } from "./state.js";
import { kMaxLength } from "node:buffer";
import { skip } from "node:test";

export async function commandInspect(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("usage: inspect <pokemon-name>");
  }
  const name = args[0];
  const pokemon = state.pokedex[name];
  if (!pokemon) {
    console.log("you have not caught that pokemon");
    return;
  }

  const printablePokemon = {
    name: name,
    height: pokemon.height,
    weight: pokemon.weight,
    stats: Object.fromEntries(
      pokemon.stats.map((s) => [s.stat.name, s.base_stat]),
    ),
    types: pokemon.types.map((t) => t.type.name),
    toString(): string {
      return Object.entries(this)
        .filter(([, v]) => typeof v !== "function")
        .map(([k, v]) => {
          if (Array.isArray(v)) {
            return (
              `${capitalize(k)}:\n` + v.map((item) => `\t- ${item}`).join("\n")
            );
          }
          if (typeof v === "object" && v !== null) {
            return (
              `${capitalize(k)}:\n` +
              Object.entries(v)
                .map(([key, val]) => `\t- ${key}: ${val}`)
                .join("\n")
            );
          }
          return `${capitalize(k)}: ${v}`;
        })
        .join("\n");
    },
  };

  const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);
  console.log(printablePokemon.toString());
}
