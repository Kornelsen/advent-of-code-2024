const input = await Deno.readTextFile("./input.txt");

const getBlocks = (input: string) => {
  const blocks: Array<string>[] = [];
  input.split("").forEach((digit: string, index: number) => {
    if (index % 2 === 0) {
      const id = Math.floor(index / 2);
      const filledSpaces = new Array(+digit).fill(id + "");
      filledSpaces.length && blocks.push(filledSpaces);
    } else {
      const emptySpaces = new Array(+digit).fill(".");
      emptySpaces.length && blocks.push(emptySpaces);
    }
  });
  return blocks;
};

const fragmentDisk = (blocks: Array<string>[]) => {
  for (let i = blocks.length - 1; i >= 0; i--) {
    const block = blocks[i];
    if (block[0] !== ".") {
      const firstEmptyBlock = blocks.findIndex((item) => {
        return item[0] === "." && item.length >= block.length;
      });
      if (firstEmptyBlock > -1 && firstEmptyBlock < i) {
        const remainingSpace = blocks[firstEmptyBlock].length - block.length;
        blocks[firstEmptyBlock] = block;
        blocks[i] = new Array(block.length).fill(".");
        i++;

        if (remainingSpace)
          blocks.splice(
            firstEmptyBlock + 1,
            0,
            new Array(remainingSpace).fill(".")
          );
      }
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
  const checksum = calculateChecksum(blocks.flat());
  return checksum;
};

const result = getFragmentedDiskChecksum(input);
console.log(result);
