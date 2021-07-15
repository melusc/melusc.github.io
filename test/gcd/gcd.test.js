const {assert} = require('chai');

const {gcd, gcdArray} = require('../../src/gcd/functions.js');

describe('gcd/functions.js', () => {
	describe('gcd()', () => {
		it('should be a function', () => {
			assert.isFunction(gcd);
		});

		it('150, 100 should return 50', () => {
			assert.strictEqual(gcd(150, 100), 50);
		});

		it('-5, -10 should return -5', () => {
			assert.strictEqual(gcd(-5, -10), -5);
		});

		it('-5, -6 should return -1', () => {
			assert.strictEqual(gcd(-5, -6), -1);
		});

		it('50, 100 should return 50', () => {
			assert.strictEqual(gcd(50, 100), 50);
		});

		it('13, 17 should return 1', () => {
			assert.strictEqual(gcd(13, 17), 1);
		});
	});

	describe('gcdArray()', () => {
		it('should be a function', () => {
			assert.isFunction(gcdArray);
		});

		it('gcdArray() should return a function', () => {
			assert.isFunction(gcdArray());
		});

		it('[15, 150, 45] should return { outputValue: 15 }', () => {
			gcdArray(state => {
				assert.deepStrictEqual(state, {outputValue: 15});
			})([15, 150, 45]);
		});
	});
});
