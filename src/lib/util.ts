/**
 * Sleep for a given number of milliseconds
 * @param ms time to sleep
 * @returns
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
