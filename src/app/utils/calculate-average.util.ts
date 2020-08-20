export function calculateAverage(list: number[]): number {
    return list.reduce((sum, i) => sum + i, 0) / list.length;
  }