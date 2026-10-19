import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

import type { CLICommand } from "./command.js";

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
    // add more commands here
  };
}
