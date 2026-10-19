import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";

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
    console.log(`Your command was: ${inputs[0]}`);
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
