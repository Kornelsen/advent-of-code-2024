const binarySearch = (arr: number[], value: number): number => {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = arr[mid];

    if (midVal === value) {
      return mid;
    }

    if (midVal < value) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return low;
};

export { binarySearch };
