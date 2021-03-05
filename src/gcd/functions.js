const knownGCD = {};

const gcd = (
  a_, b_
) => {
  const bothNegative = a_ < 0 && b_ < 0;

  const a = Math.abs( a_ );
  const b = Math.abs( b_ );

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

  let leftover = 1;

  while ( leftover !== 0 ) {
    leftover = dividend % divisor;
    if ( leftover !== 0 ) {
      dividend = divisor;
      divisor = leftover;
    }
  }

  if ( bothNegative ) {
    divisor *= -1;
  }

  knownGCD[ key ] = divisor;

  return divisor;
};

const calculateArrayGCD = setState => numbers => {
  const copiedNumbers = [ ...numbers ];
  while ( copiedNumbers.length > 1 ) {
    copiedNumbers[ 0 ] = gcd(
      copiedNumbers[ 0 ],
      copiedNumbers[ 1 ]
    );
    copiedNumbers.splice(
      1,
      1
    );
  }

  setState( { outputValue: copiedNumbers[ 0 ] } );
};

module.exports = {
  calculateArrayGCD,
  gcd,
};
