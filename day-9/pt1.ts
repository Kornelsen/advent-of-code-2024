const input = await Deno.readTextFile("./input.txt");

const getBlocks = (input: string) => {
  const blocks: string[] = [];
  input.split("").forEach((digit: string, index: number) => {
    if (index % 2 === 0) {
      const id = Math.floor(index / 2);
      const filledSpaces = new Array(+digit).fill(id + "");
      blocks.push(...filledSpaces);
    } else {
      const emptySpaces = new Array(+digit).fill(".");
      blocks.push(...emptySpaces);
    }
  });
  return blocks;
};

const fragmentDisk = (blocks: string[]) => {
  for (let i = blocks.length - 1; i >= 0; i--) {
    const block = blocks[i];
    if (block === ".") {
      blocks.pop();
    } else {
      const firstEmptyBlock = blocks.findIndex((item) => item === ".");
      if (firstEmptyBlock === -1) return;
      blocks[firstEmptyBlock] = blocks[i];
      blocks.splice(i, 1);
    }
  }
};

const calculateChecksum = (blocks: string[]) => {
  const checksum = blocks.reduce((sum, block, index) => {
    if (block === ".") return sum + 0;
    return sum + +block * index;
  }, 0);
  return checksum;
};

const getFragmentedDiskChecksum = (input: string) => {
  const blocks = getBlocks(input);
  fragmentDisk(blocks);
  const checksum = calculateChecksum(blocks);
  return checksum;
};

const result = getFragmentedDiskChecksum(input);
console.log(result);
