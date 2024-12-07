const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

let result = 0;

for (const line of lines) {
  const puzzle = line.split(": ");
  const target = +puzzle[0];
  const values = puzzle[1].split(" ");

  let valid = false;

  const backtrack = (curr: number, target: number, index: number) => {
    if (valid) return;
    if (curr > target) return;

    const value = +values[index];
    if (!value) {
      if (curr === target) valid = true;
      return;
    }

    backtrack(curr * value, target, index + 1);
    backtrack(curr + value, target, index + 1);
    backtrack(+(curr + "" + value), target, index + 1);
  };

  backtrack(+values[0], target, 1);
  if (valid) result += target;
}

console.log(result);
