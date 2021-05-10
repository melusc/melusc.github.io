// Stolen shamelessly from
// https://web.archive.org/web/20190223113747/https://stackoverflow.com/questions/43122082/efficiently-count-the-number-of-bits-in-an-integer-in-javascript#43122214
export const bitCount = ( n: number ): number => {
  n -= ( n >> 1 ) & 0x55_55_55_55;
  n = ( n & 0x33_33_33_33 ) + ( ( n >> 2 ) & 0x33_33_33_33 );
  return ( ( ( n + ( n >> 4 ) ) & 0xF_0F_0F_0F ) * 0x1_01_01_01 ) >> 24;
};

export const getterFunctionNames = [ 'getRow', 'getCol', 'getBlock' ] as const;

export const bitIndex = ( n: number ): number => {
  if ( bitCount( n ) !== 1 ) {
    throw new TypeError( `${ n } doesn't have exactly one bit.` );
  }

  let index = 0;

  while ( ( n & 1 ) === 0 ) {
    ++index;
    n >>= 1;
  }

  return index;
};
