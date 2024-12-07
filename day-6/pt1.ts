import { getVisitedMap } from "./utils.ts";

const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");
const grid = lines.map((line) => line.split(""));

const visitedMap = getVisitedMap(grid);
console.log(visitedMap.size);
