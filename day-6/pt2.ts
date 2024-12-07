import {
  changeGuardDirection,
  changeGuardPosition,
  guardHasBeenHere,
  getVisitedMap,
  type Direction,
  getGuardPosition,
} from "././utils.ts";

const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");
const grid = lines.map((line) => line.split(""));
const diversions = new Set<string>();
const path: [number, number][] = [];

let result = 0;

const checkForLoop = (
  position: [number, number],
  direction: Direction,
  grid: string[][]
) => {
  const visited = new Map<string, Direction[]>();
  let cell = grid[position[1]]?.[position[0]];

  while (cell !== undefined) {
    if (guardHasBeenHere(position, direction, visited)) {
      return true;
    }
    const key = position.join(",");
    visited.set(key, [...(visited.get(key) ?? []), direction]);

    const nextPosition = changeGuardPosition(position, direction);
    const nextCell = grid[nextPosition[1]]?.[nextPosition[0]];

    if (nextCell === "#") {
      direction = changeGuardDirection(direction);
    } else {
      position = nextPosition;
      cell = nextCell;
    }
  }

  return false;
};

const guardPosition = getGuardPosition(grid);
getVisitedMap(grid, path);

for (const position of path) {
  if (
    grid[position[1]]?.[position[0]] === "." &&
    !diversions.has(position.join(","))
  ) {
    grid[position[1]][position[0]] = "#";
    if (checkForLoop(guardPosition, "n", grid)) {
      diversions.add(position.join(","));
      result++;
    }
    grid[position[1]][position[0]] = ".";
  }
}

console.log(diversions.size);
