const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");
const grid = lines.map((line) => line.split(""));

const findAntinodes = (grid: string[][]) => {
  const nodes = new Map<string, [number, number][]>();
  const antinodeLocations = new Set<string>();

  const calculateAntinodePositions = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const dx = x2 - x1;
    const dy = y2 - y1;

    let ax = x1 + dx;
    let ay = y1 + dy;

    while (grid[ay]?.[ax]) {
      antinodeLocations.add([ax, ay].join(","));
      ax += dx;
      ay += dy;
    }
  };

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

        calculateAntinodePositions(x1, y1, x2, y2);
        calculateAntinodePositions(x2, y2, x1, y1);
      }
    }
  }

  console.log(antinodeLocations);

  return antinodeLocations.size;
};

const result = findAntinodes(grid);
console.log(result);
