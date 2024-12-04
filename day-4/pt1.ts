const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");
const grid = lines.map((line) => line.split(""));

const TARGET = "XMAS";

enum Direction {
  N = "N",
  S = "S",
  W = "W",
  E = "E",
  NE = "NE",
  NW = "NW",
  SE = "SE",
  SW = "SW",
}

const search = (x: number, y: number) => {
  let found = 0;
  Object.keys(Direction).forEach((direction) => {
    if (traverse(x, y, direction as Direction)) {
      found++;
    }
  });
  return found;
};

const traverse = (x: number, y: number, direction: Direction) => {
  for (let i = 1; i < TARGET.length; i++) {
    switch (direction) {
      case "S":
        y += 1;
        break;
      case "N":
        y -= 1;
        break;
      case "W":
        x -= 1;
        break;
      case "E":
        x += 1;
        break;
      case "NE":
        x += 1;
        y -= 1;
        break;
      case "NW":
        x -= 1;
        y -= 1;
        break;
      case "SE":
        x += 1;
        y += 1;
        break;
      case "SW":
        x -= 1;
        y += 1;
        break;
    }
    const char = grid[y]?.[x];
    if (!char) return false;
    if (char !== TARGET[i]) return false;
  }
  return true;
};

let result = 0;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid.length; x++) {
    const char = grid[y][x];
    if (char === TARGET[0]) {
      result += search(x, y);
    }
  }
}

console.log(result);
