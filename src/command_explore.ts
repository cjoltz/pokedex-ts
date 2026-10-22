import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("usage: explore <location-name>. Use help for details.");
  }
  const name = args[0];
  console.log(`Exploring ${name}`);
  const pokemons = await state.pokeAPI.fetchPokemonInLocation(name);
  console.log("Found Pokemon:");
  for (const pokemon of pokemons) {
    console.log(` - ${pokemon}`);
  }
}
