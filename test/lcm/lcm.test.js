const { assert } = require( 'chai' );

const { lcm, lcmArray, gcd, absBigInt } = require( '../../src/lcm/functions.js' );

describe(
  'lcm/functions.js',
  () => {
    describe(
      'absBigInt()',
      () => {
        it(
          'should be a function',
          () => {
            assert.isFunction( absBigInt );
          }
        );

        it(
          '-1 should return a BigInt',
          () => {
            assert.typeOf(
              absBigInt( -1 ),
              'BigInt'
            );
          }
        );

        it(
          '-1 should return 1n',
          () => {
            assert.strictEqual(
              absBigInt( -1 ),
              1n
            );
          }
        );

        it(
          '-1n should return 1n',
          () => {
            assert.strictEqual(
              absBigInt( -1n ),
              1n
            );
          }
        );

        it(
          '20 should return 20n',
          () => {
            assert.strictEqual(
              absBigInt( 20 ),
              20n
            );
          }
        );
      }
    );

    describe(
      'gcd()',
      () => {
        it(
          'should be a function',
          () => {
            assert.isFunction( gcd );
          }
        );

        it(
          '2, 4 should return a BigInt',
          () => {
            assert.typeOf(
              gcd(
                2,
                4
              ),
              'BigInt'
            );
          }
        );

        it(
          '2, 4 should return 2n',
          () => {
            assert.strictEqual(
              gcd(
                2,
                4
              ),
              2n
            );
          }
        );

        it(
          '-2, -4 should return 2n',
          () => {
            assert.strictEqual(
              gcd(
                -2,
                -4
              ),
              2n
            );
          }
        );
      }
    );

    describe(
      'lcm()',
      () => {
        it(
          'should be a function',
          () => {
            assert.isFunction( lcm );
          }
        );

        it(
          '4, 12 should return 12n',
          () => {
            assert.strictEqual(
              lcm(
                4,
                12
              ),
              12n
            );
          }
        );

        it(
          '4n, 12n should return 12n',
          () => {
            assert.strictEqual(
              lcm(
                4n,
                12n
              ),
              12n
            );
          }
        );
      }
    );

    describe(
      'lcmArray()',
      () => {
        it(
          'should be a function',
          () => {
            assert.isFunction( lcmArray );
          }
        );

        it(
          'lcmArray() should return a function',
          () => {
            assert.isFunction( lcmArray() );
          }
        );

        it(
          '[] should return an object',
          () => {
            lcmArray( state => {
              assert.isObject( state );
            } )( [] );
          }
        );

        it(
          '[] should return { outputValue: "" }',
          () => {
            lcmArray( state => {
              assert.deepStrictEqual(
                state,
                { outputValue: '' }
              );
            } )( [] );
          }
        );

        it(
          '[1] should return an object',
          () => {
            lcmArray( state => {
              assert.isObject( state );
            } )( [ 1 ] );
          }
        );

        it(
          '[1] should return { outputValue: "1" }',
          () => {
            lcmArray( state => {
              assert.deepStrictEqual(
                state,
                { outputValue: '1' }
              );
            } )( [ 1 ] );
          }
        );

        it(
          '4, 20, 12 should return an object',
          () => {
            lcmArray( state => {
              assert.isObject( state );
            } )( [ 4, 20, 12 ] );
          }
        );

        it(
          '4, 20, 12 should return { outputValue: "60" }',
          () => {
            lcmArray( state => {
              assert.deepStrictEqual(
                state,
                { outputValue: '60' }
              );
            } )( [ 4, 20, 12 ] );
          }
        );

        it(
          '1..10 should return { outputValue: "2520" }',
          () => {
            lcmArray( state => {
              assert.deepStrictEqual(
                state,
                { outputValue: '2520' }
              );
            } )( Array.from(
              { length: 10 },
              (
                _value, index
              ) => index + 1
            ) );
          }
        );
      }
    );
  }
);
