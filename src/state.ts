import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { Cache } from "./pokecache.js";

const reapInterval = 20_000; // Cache reap interval in ms

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type Pokedex = Record<string, Pokemon>;

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  cache: Cache;
  pokeAPI: PokeAPI;
  pokedex: Pokedex;
  nextLocationsURL: string;
  prevLocationsURL: string;
};

export function initState(): State {
  const cache = new Cache(reapInterval);
  return {
    readline: createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "Pokedex > ",
    }),
    commands: getCommands(),
    cache: cache,
    pokeAPI: new PokeAPI(cache),
    pokedex: {},
    nextLocationsURL: "",
    prevLocationsURL: "",
  };
}
