const knownGCD = {};

const absBigInt = n => BigInt( n < 0
  ? -n
  : n );

const gcd = (
  a_, b_
) => {
  const a = absBigInt( a_ );

  const b = absBigInt( b_ );

  let dividend = a > b
    ? a
    : b;
  let divisor = a > b
    ? b
    : a;

  const key = `${ dividend },${ divisor }`;

  if ( key in knownGCD ) {
    return knownGCD[ key ];
  }

  let leftover = 1n;

  while ( leftover !== 0n ) {
    leftover = dividend % divisor;
    if ( leftover !== 0n ) {
      dividend = divisor;
      divisor = leftover;
    }
  }

  knownGCD[ key ] = divisor;

  return divisor;
};

const lcm = (
  a, b
) => ( absBigInt( a ) * absBigInt( b ) ) / gcd(
  a,
  b
);

const lcmArray = setState => array => {
  switch ( array.length ) {
    case 0: {
      setState( { outputValue: '' } );
      break;
    }

    case 1: {
      setState( { outputValue: array[ 0 ].toString() } );
      break;
    }

    default: {
      let result = 1n;

      for ( const element of array ) {
        result = lcm(
          result,
          element
        );
      }

      setState( { outputValue: result.toString() } );
    }
  }
};

module.exports = {
  lcm,
  lcmArray,
  gcd,
  absBigInt,
};
