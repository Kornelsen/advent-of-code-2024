const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");
const grid = lines.map((line) => line.split(""));

const findAntinodes = (grid: string[][]) => {
  const nodes = new Map<string, [number, number][]>();
  const antinodeLocations = new Set<string>();

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const cell = grid[y][x];
      if (cell !== ".") {
        if (!nodes.has(cell)) {
          nodes.set(cell, []);
        }
        nodes.get(cell)!.push([x, y]);
      }
    }
  }

  for (const [_, antenna] of nodes) {
    for (let i = 0; i < antenna.length; i++) {
      for (let j = i + 1; j < antenna.length; j++) {
        const [x1, y1] = antenna[i];
        const [x2, y2] = antenna[j];

        const antinodes = [
          calculateAntinode(x1, y1, x2, y2),
          calculateAntinode(x2, y2, x1, y1),
        ];

        for (const [ax, ay] of antinodes) {
          if (grid[ay]?.[ax]) {
            antinodeLocations.add([ax, ay].join(","));
          }
        }
      }
    }
  }

  return antinodeLocations.size;
};

const calculateAntinode = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = x2 - x1;
  const dy = y2 - y1;

  return [x1 + 2 * dx, y1 + 2 * dy];
};

const result = findAntinodes(grid);
console.log(result);
