const input = await Deno.readTextFile("./input.txt");
const stones = input.split(" ");

const map = new Map<string, number>();

const getStoneCount = (stone: string, blinks: number): number => {
  if (blinks === 0) return 1;

  const previousResult = map.get(stone + "-" + blinks);
  if (previousResult) return previousResult;

  let result = null;

  if (stone === "0") {
    result = getStoneCount("1", blinks - 1);
  } else if (stone.length % 2 === 0) {
    const middle = stone.length / 2;
    const leftStone = stone.substring(0, middle);
    const rightStone = (+stone.substring(middle, stone.length)).toString();
    result =
      getStoneCount(leftStone, blinks - 1) +
      getStoneCount(rightStone, blinks - 1);
  } else {
    result = getStoneCount((+stone * 2024).toString(), blinks - 1);
  }

  map.set(stone + "-" + blinks, result);
  return result;
};

const counts = stones.map((stone) => getStoneCount(stone, 75));
const result = counts.reduce((prev, curr) => (prev += curr), 0);

console.log(result);
