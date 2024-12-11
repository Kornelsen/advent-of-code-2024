const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");
const grid = lines.map((line) => line.split(""));

let result = 0;

const getTrailheadScore = (x: number, y: number, prev: number) => {
  const value = +grid[y]?.[x];
  if (value !== 0 && !value) return;
  if (value - prev !== 1) return;
  if (value === 9) {
    result++;
    return;
  }

  getTrailheadScore(x + 1, y, value);
  getTrailheadScore(x - 1, y, value);
  getTrailheadScore(x, y + 1, value);
  getTrailheadScore(x, y - 1, value);
};

for (let y = 0; y < grid.length; y++) {
  const row = grid[y];
  for (let x = 0; x < row.length; x++) {
    const cell = row[x];
    if (cell === "0") {
      const found = new Set<string>();
      getTrailheadScore(x, y, -1);
      result += found.size;
    }
  }
}

console.log(result);
