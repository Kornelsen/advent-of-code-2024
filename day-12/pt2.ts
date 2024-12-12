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
  const visited = new Set<string>();
  let edges = 0;
  for (const key of region) {
    const [x, y] = key.split(",").map(Number);
    const right = [x + 1, y];
    const left = [x - 1, y];
    const up = [x, y - 1];
    const down = [x, y + 1];
    if (!region.has(right.join(",")) && !visited.has(key + "r")) {
      traverseEdge(x, y, "r", region, visited);
      edges++;
    }
    if (!region.has(left.join(",")) && !visited.has(key + "l")) {
      traverseEdge(x, y, "l", region, visited);
      edges++;
    }
    if (!region.has(up.join(",")) && !visited.has(key + "u")) {
      traverseEdge(x, y, "u", region, visited);
      edges++;
    }
    if (!region.has(down.join(",")) && !visited.has(key + "d")) {
      traverseEdge(x, y, "d", region, visited);
      edges++;
    }
  }
  return edges;
};

const traverseEdge = (
  x: number,
  y: number,
  side: "r" | "l" | "u" | "d",
  region: Set<string>,
  visited: Set<string>
) => {
  const key = [x, y].join(",") + side;
  if (!region.has([x, y].join(","))) return;
  if (visited.has(key)) return;

  if (side === "r" && region.has([x + 1, y].join(","))) return;
  if (side === "l" && region.has([x - 1, y].join(","))) return;
  if (side === "u" && region.has([x, y - 1].join(","))) return;
  if (side === "d" && region.has([x, y + 1].join(","))) return;

  visited.add(key);

  if (side === "l" || side === "r") {
    traverseEdge(x, y + 1, side, region, visited);
    traverseEdge(x, y - 1, side, region, visited);
  } else {
    traverseEdge(x + 1, y, side, region, visited);
    traverseEdge(x - 1, y, side, region, visited);
  }
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
