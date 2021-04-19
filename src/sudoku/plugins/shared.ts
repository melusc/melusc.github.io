// Stolen shamelessly from
// https://web.archive.org/web/20190223113747/https://stackoverflow.com/questions/43122082/efficiently-count-the-number-of-bits-in-an-integer-in-javascript#43122214
export const bitCount = ( n: number ): number => {
  n -= ( n >> 1 ) & 0x55555555;
  n = ( n & 0x33333333 ) + ( ( n >> 2 ) & 0x33333333 );
  return ( ( ( n + ( n >> 4 ) ) & 0xF0F0F0F ) * 0x1010101 ) >> 24;
};

export const getterFunctionNames = [ 'getRow', 'getCol', 'getBlock' ] as const;
