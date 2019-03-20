
function pad(n: number, o: number, c: string): string {
  let r = '';
  for (let i = 0; i < o - 1; i++) {
    r = c + r;
  }
  return r + n.toString();
}

export function stringPaddedNumber(n: number, o: number = 2, c: string = '0'): string {
  if (n <= -1) {
    throw new Error(`'n' must be larger than -1`);
  }
  if (o <= 0) {
    throw new Error(`'o' must be larger than 0`);
  }
  if (c.length !== 1) {
    throw new Error(`'c' length isn't 1`);
  }
  for (let i = 0, j = o; ; i++ , j--) {
    if (n < Math.pow(10, (i + 1))) {
      return pad(n, j, c);
    }
  }
}
