const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

type Direction = "increasing" | "decreasing" | null;

let safe = 0;

export const isSafe = (arr: string[]): boolean => {
  let direction: Direction = null;
  for (let i = 1; i < arr.length; i++) {
    const prev = +arr[i - 1];
    const curr = +arr[i];

    const diff = Math.abs(prev - curr);

    if (diff > 3 || diff < 1) {
      return false;
    }

    const currDirection: Direction =
      prev < curr ? "increasing" : prev > curr ? "decreasing" : null;

    if (!direction) direction = currDirection;
    else if (direction !== currDirection) return false;
  }
  return true;
};

for (const line of lines) {
  const puzzle = line.split(" ");
  if (isSafe(puzzle)) safe++;
}

console.log(safe);
