const { assert } = require( 'chai' );

const { gcd, calculateArrayGCD } = require( '../../src/gcd/functions.js' );

describe( 'gcd/script.js', () => {
  describe( 'gcd()', () => {
    it( 'gcd(150, 100) should return 50', () => {
      assert.strictEqual( gcd( 150, 100 ), 50 );
    } );

    it( 'gcd(-5, -10) should return -5', () => {
      assert.strictEqual( gcd( -5, -10 ), -5 );
    } );

    it( 'gcd(-5, -6) should return -1', () => {
      assert.strictEqual( gcd( -5, -6 ), -1 );
    } );

    it( 'gcd(50, 100) should return 50', () => {
      assert.strictEqual( gcd( 50, 100 ), 50 );
    } );

    it( 'gcd(13, 17) should return 1', () => {
      assert.strictEqual( gcd( 13, 17 ), 1 );
    } );
  } );

  describe( 'calculateArrayGCD()', () => {
    it( 'calculateArrayGCD() should return a function', () => {
      assert.isFunction( calculateArrayGCD() );
    } );

    it( 'calculateArrayGCD(...)([15, 150, 45]) should return { outputValue: 15 }', () => {
      calculateArrayGCD( state => {
        assert.deepStrictEqual( state, { outputValue: 15 } );
      } )( [ 15, 150, 45 ] );
    } );
  } );
} );
