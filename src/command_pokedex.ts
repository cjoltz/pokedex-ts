import { fileURLToPath } from "node:url";
import { State } from "./state.js";

export async function commandPokedex(state: State) {
  if (Object.keys(state.pokedex).length === 0) {
    console.log("Your Pokedex is empty. Go catch some Pokemon!");
    return;
  }
  for (const pokemon in state.pokedex) {
    console.log(`  - ${pokemon}`);
  }
}
