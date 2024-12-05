import { buildRules, sumMiddlePages, validatePages } from "./utils.ts";

const input = await Deno.readTextFile("./input.txt");
const sections = input.split("\n\n");

const rules = buildRules(sections[0].split("\n"));
const protocols = sections[1].split("\n");
const invalid = [];

const isValidChoice = (value: string, options: string[]) => {
  for (const option of options) {
    if (rules.get(option)?.includes(value)) return false;
  }
  return true;
};

for (const protocol of protocols) {
  const pages = protocol.split(",");

  const validProtocol = validatePages(pages, rules);
  if (!validProtocol) invalid.push(pages);
}

const fixedProtocols = [];

for (const protocol of invalid) {
  const valid: string[] = [];
  const options = [...protocol];

  while (options.length) {
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (isValidChoice(option, options.toSpliced(i, 1))) {
        options.splice(i, 1);
        valid.push(option);
        i--;
      }
    }
  }
  fixedProtocols.push(valid);
}

const result = sumMiddlePages(fixedProtocols);
console.log("RESULT", result);
