import { multiply } from "./pt1.ts";

const input = await Deno.readTextFile("./input.txt");
const regex = /((mul\(\d+,\d+\))|(don\'t)|(do))/gm;

let m;
let result = 0;
let DO_NOT = false;

while ((m = regex.exec(input)) !== null) {
  if (m.index === regex.lastIndex) {
    regex.lastIndex++;
  }

  const str = m[0];

  switch (str) {
    case "do":
      DO_NOT = false;
      break;
    case "don't":
      DO_NOT = true;
      break;
    default:
      if (!DO_NOT) {
        const product = multiply(str);
        result += product;
      }
      break;
  }
}

console.log(result);
