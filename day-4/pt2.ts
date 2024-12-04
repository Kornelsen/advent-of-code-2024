const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");
const grid = lines.map((line) => line.split(""));

const TARGET = "MAS";

enum Direction {
  SE = "SE",
  SW = "SW",
  NE = "NE",
}

const search = (x: number, y: number, char: "M" | "S") => {
  const firstSegmentValid = traverse(x, y, Direction.SE, char === "M");

  if (!firstSegmentValid) {
    return 0;
  }

  let secondSegmentValid = false;

  const eastX = x + 2;
  const eastY = y;
  const southX = x;
  const southY = y + 2;

  const east = grid[eastY][eastX];
  const south = grid[southY]?.[southX];

  if (east === "S" || east === "M") {
    secondSegmentValid = traverse(eastX, eastY, Direction.SW, east === "M");
  } else if (south === "S" || south === "M") {
    secondSegmentValid = traverse(southX, southY, Direction.NE, south === "M");
  }

  return secondSegmentValid ? 1 : 0;
};

const traverse = (
  x: number,
  y: number,
  direction: Direction,
  isForwards: boolean
): boolean => {
  const start = isForwards ? 1 : TARGET.length - 2;
  const end = isForwards ? TARGET.length : -1;
  const step = isForwards ? 1 : -1;

  for (let i = start; i !== end; i += step) {
    switch (direction) {
      case "NE":
        x += 1;
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
    if (TARGET[i] !== char) return false;
  }
  return true;
};

let result = 0;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid.length; x++) {
    const char = grid[y][x];
    if (char === "M") {
      const z = search(x, y, char);
      result += z;
    }
    if (char === "S") {
      const z = search(x, y, char);
      result += z;
    }
  }
}

console.log(result);
