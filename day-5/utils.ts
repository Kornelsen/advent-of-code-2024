export type Rule = string[];

export const buildRules = (input: string[]) => {
  const rules = new Map<string, Rule>();

  const addRule = (key: string, value: string) => {
    rules.set(key, [...(rules.get(key) ?? []), value]);
  };

  for (const rule of input) {
    const values = rule.split("|");
    addRule(values[0], values[1]);
  }

  return rules;
};

const validatePage = (rule: Rule | undefined, exists: Set<string>) => {
  if (!rule) return true;

  for (const page of rule || []) {
    if (exists.has(page)) return false;
  }

  return true;
};

export const validatePages = (pages: string[], rules: Map<string, Rule>) => {
  const exists = new Set<string>();
  for (const page of pages) {
    if (validatePage(rules.get(page), exists)) {
      exists.add(page);
    } else {
      return false;
    }
  }
  return true;
};

export const sumMiddlePages = (protocols: string[][]) => {
  return protocols.reduce((acc, curr) => {
    const middle = Math.floor(curr.length / 2);
    const value = +curr[middle];
    return acc + value;
  }, 0);
};
