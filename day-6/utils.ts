export type Direction = "n" | "e" | "s" | "w";

export const guardHasBeenHere = (
  position: [number, number],
  direction: Direction,
  visitedMap: Map<string, Direction[]>
): boolean => {
  const key = position.join(",");
  const visited = visitedMap.get(key);
  if (visited) {
    return visited.includes(direction);
  }
  return false;
};

export const getGuardPosition = (grid: string[][]): [number, number] => {
  let y = 0;
  for (const row of grid) {
    const x = row.findIndex((cell) => cell === "^");
    if (x !== -1) return [x, y];
    y++;
  }
  return [-1, -1];
};

export const changeGuardPosition = (
  position: [number, number],
  guardDirection: Direction
) => {
  switch (guardDirection) {
    case "n":
      position = [position[0], position[1] - 1];
      break;
    case "e":
      position = [position[0] + 1, position[1]];
      break;
    case "s":
      position = [position[0], position[1] + 1];
      break;
    case "w":
      position = [position[0] - 1, position[1]];
      break;
  }
  return position;
};

export const changeGuardDirection = (direction: Direction): Direction => {
  const directions: Direction[] = ["n", "e", "s", "w"];
  let newDirection = directions.findIndex((d) => d === direction);
  newDirection += 1;
  if (newDirection === directions.length) newDirection = 0;
  return directions[newDirection];
};

export const getVisitedMap = (grid: string[][], path?: [number, number][]) => {
  const visitedMap = new Map<string, Direction[]>();
  let guardPosition = getGuardPosition(grid);
  let guardDirection: Direction = "n";

  const updateVisitedMap = (
    position: [number, number],
    direction: Direction
  ) => {
    const key = position.join(",");
    visitedMap.set(key, [...(visitedMap.get(key) ?? []), direction]);
    return visitedMap;
  };

  while (!guardHasBeenHere(guardPosition, guardDirection, visitedMap)) {
    updateVisitedMap(guardPosition, guardDirection);
    if (path) path.push(guardPosition);
    const nextPosition = changeGuardPosition(guardPosition, guardDirection);

    const nextCell = grid[nextPosition[1]]?.[nextPosition[0]];

    if (!nextCell) break;

    if (nextCell === "#") {
      guardDirection = changeGuardDirection(guardDirection);
    } else {
      guardPosition = nextPosition;
    }
  }
  return visitedMap;
};
