import {test, expect} from 'vitest';

import {gcd, gcdArray} from '../math.js';

test('gcd 150, 100 should return 50', () => {
	expect(gcd(150, 100)).toBe(50n);
});

test('gcd -5, -10 should return -5', () => {
	expect(gcd(-5, -10)).toBe(-5n);
});

test('gcd -5, -6 should return -1', () => {
	expect(gcd(-5, -6)).toBe(-1n);
});

test('gcd 50, 100 should return 50', () => {
	expect(gcd(50, 100)).toBe(50n);
});

test('gcd 13, 17 should return 1', () => {
	expect(gcd(13, 17)).toBe(1n);
});

test('gcdArray [15, 150, 45] should return "15"', () => {
	expect(gcdArray([15, 150, 45])).toBe('15');
});
