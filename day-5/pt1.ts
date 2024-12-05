import { buildRules, sumMiddlePages, validatePages } from "./utils.ts";

const input = await Deno.readTextFile("./input.txt");
const sections = input.split("\n\n");

const rules = buildRules(sections[0].split("\n"));
const protocols = sections[1].split("\n");
const updates: string[][] = [];

for (const protocol of protocols) {
  const pages = protocol.split(",");

  const validProtocol = validatePages(pages, rules);

  if (validProtocol) updates.push(pages);
}

const result = sumMiddlePages(updates);

console.log("RESULT", result);
