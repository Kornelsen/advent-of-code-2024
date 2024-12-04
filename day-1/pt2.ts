const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

const left: number[] = [];
const rightOccurences = new Map();

let result = 0;

for (const line of lines) {
  const split = line.trim().split(" ");
  left.push(parseInt(split[0]));
  const rightItem = parseInt(split[3]);

  rightOccurences.set(rightItem, (rightOccurences.get(rightItem) || 0) + 1);
}

for (const item of left) {
  const product = item * (rightOccurences.get(item) || 0);
  result += product;
}

console.log(result);
