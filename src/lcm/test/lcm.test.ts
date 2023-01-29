import {test, expect} from 'vitest';

import {absBigInt, gcd, lcm, lcmArray} from '../functions.js';

test('-1 should return 1n', () => {
	expect(absBigInt(-1)).toBe(1n);
});

test('-1n should return 1n', () => {
	expect(absBigInt(-1n)).toBe(1n);
});

test('20 should return 20n', () => {
	expect(absBigInt(20)).toBe(20n);
});

test('2, 4 should return 2n', () => {
	expect(gcd(2, 4)).toBe(2n);
});

test('-2, -4 should return 2n', () => {
	expect(gcd(-2, -4)).toBe(2n);
});

test('4, 12 should return 12n', () => {
	expect(lcm(4, 12)).toBe(12n);
});

test('4n, 12n should return 12n', () => {
	expect(lcm(4n, 12n)).toBe(12n);
});

test('[] should return ""', () => {
	expect(lcmArray([])).toBe('');
});

test('[1] should return "1"', () => {
	expect(lcmArray([1])).toBe('1');
});

test('4, 20, 12 should return "60"', () => {
	expect(lcmArray([4, 20, 12])).toBe('60');
});

test('1..10 should return "2520"', () => {
	expect(lcmArray(Array.from({length: 10}, (_v, index) => index + 1))).toBe(
		'2520',
	);
});
