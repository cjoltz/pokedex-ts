import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("usage: catch <pokemon-name>");
  }
  const name = args[0];
  const difficulty = 500; // the lower the harder it is to catch any pokemon
  console.log(`Throwing a Pokeball at ${name}...`);
  const pokemon = await state.pokeAPI.fetchPokemon(name);
  const caught = Math.random() * difficulty > pokemon.base_experience;

  if (!caught) {
    console.log(`${name} escaped`);
  } else {
    console.log(`${name} was caught!`);
    state.pokedex[pokemon.name] = pokemon;
  }
}
