import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandPokedex } from "./command_pokedex.js";

import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Prints welcome message and list of available commands",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    map: {
      name: "map",
      description: "Displays the next 20 location areas in the Pokedex",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous 20 location areas in the Pokedex",
      callback: commandMapB,
    },
    explore: {
      name: "explore",
      description: "Displays all Pokemon found in a given area",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Catch a pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Inspect a caught pokemon",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "See Pokemon registered in Pokedex",
      callback: commandPokedex,
    },
    // add more commands here
  };
}
