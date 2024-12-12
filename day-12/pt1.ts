const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");
const grid = lines.map((line) => line.split(""));

const visited = new Set<string>();

const findRegion = (
  crop: string,
  x: number,
  y: number,
  region: Set<string>
) => {
  const cell = grid[y]?.[x];
  if (!cell) return;
  if (cell !== crop) return;

  const key = [x, y].join(",");
  if (visited.has(key)) return;
  visited.add(key);
  region.add(key);

  findRegion(crop, x + 1, y, region);
  findRegion(crop, x, y + 1, region);
  findRegion(crop, x - 1, y, region);
  findRegion(crop, x, y - 1, region);
};

const findEdges = (region: Set<string>) => {
  let edges = 0;
  for (const key of region) {
    const [x, y] = key.split(",").map(Number);
    if (!region.has([x + 1, y].join(","))) edges++;
    if (!region.has([x - 1, y].join(","))) edges++;
    if (!region.has([x, y + 1].join(","))) edges++;
    if (!region.has([x, y - 1].join(","))) edges++;
  }
  return edges;
};

const calculateFenceCost = (grid: string[][]) => {
  let cost = 0;
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      const crop = row[x];
      const region = new Set<string>();
      findRegion(crop, x, y, region);
      if (!region.size) continue;
      const edges = findEdges(region);
      cost += region.size * edges;
    }
  }
  return cost;
};

const cost = calculateFenceCost(grid);
console.log(cost);
