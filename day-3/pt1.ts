const regex = /mul\(\d+,\d+\)/gm;
const input = await Deno.readTextFile("./sample.txt");
let m;

let result = 0;

export const multiply = (match: string) => {
  const pattern = /\d+,\d+/;
  const numberStr = pattern.exec(match);
  if (!numberStr) throw new Error("Invalid match string");
  const numbers = numberStr[0].split(",");
  const product = +numbers[0] * +numbers[1];
  return product;
};

while ((m = regex.exec(input)) !== null) {
  if (m.index === regex.lastIndex) {
    regex.lastIndex++;
  }

  m.forEach((match) => {
    const product = multiply(match);
    result += product;
  });
}

console.log(result);
