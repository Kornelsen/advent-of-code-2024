import { isSafe } from "./pt1.ts";

const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

let safe = 0;

for (const line of lines) {
  const puzzle = line.split(" ");
  if (isSafe(puzzle)) safe++;
  else {
    for (let i = 0; i < puzzle.length; i++) {
      const subPuzzle = puzzle.toSpliced(i, 1);
      if (isSafe(subPuzzle)) {
        safe++;
        break;
      }
    }
  }
}

console.log(safe);
