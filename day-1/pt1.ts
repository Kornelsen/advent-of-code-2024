import { binarySearch } from "../utils.ts";

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const leftNumbers: number[] = [];
const rightNumbers: number[] = [];

let distance = 0;

for (const line of lines) {
  const split = line.split("   ");
  const left = parseInt(split[0]);
  const right = parseInt(split[1]);

  const leftInsertIndex = binarySearch(leftNumbers, left);
  const rightInsertIndex = binarySearch(rightNumbers, right);

  leftNumbers.splice(leftInsertIndex, 0, left);
  rightNumbers.splice(rightInsertIndex, 0, right);
}

for (let i = 0; i < leftNumbers.length; i++) {
  const diff = Math.abs(leftNumbers[i] - rightNumbers[i]);
  distance += diff;
}

console.log(distance);
