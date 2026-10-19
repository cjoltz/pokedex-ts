import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./commands.js";

export function startREPL() {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  });
  rl.prompt();
  rl.on("line", (input) => {
    if (!input) {
      rl.prompt();
      return;
    }

    const inputs = cleanInput(input);
    const commandName = inputs[0];
    const commands = getCommands();
    const cmd = commands[commandName];
    if (!cmd) {
      console.log(
        `Unknown command: ${commandName}. Type "help" for a list of commands`,
      );
      rl.prompt();
      return;
    }

    try {
      cmd.callback(commands);
    } catch (e) {
      console.log(e);
    }

    rl.prompt();
  });
}

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}
