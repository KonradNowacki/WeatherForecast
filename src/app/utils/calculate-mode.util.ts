export function calculateMode(numbers: number[]): number[] {

    const integers = numbers.map(num => Math.round(num));

    const modeMap = new Map<number, number>();
    integers.forEach(int => {
      if (modeMap.has(int)) {
        modeMap.set(int, modeMap.get(int) + 1);
      } else {
        modeMap.set(int, 1);
      }
    });

    const modeOccurences = Math.max(...modeMap.values());

    const modes: number[] = [];
    modeMap.forEach((val, key) => {
      if (val === modeOccurences) {
        modes.push(key);
      }
    });

    return modes;
  }
