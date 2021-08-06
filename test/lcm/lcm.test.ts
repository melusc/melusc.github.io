import test from 'ava';

import {lcm, lcmArray, gcd, absBigInt} from '../../src/lcm/functions.js';

test('-1 should return a BigInt', t => {
	t.is(typeof absBigInt(-1), 'bigint');
});

test('-1 should return 1n', t => {
	t.is(absBigInt(-1), 1n);
});

test('-1n should return 1n', t => {
	t.is(absBigInt(-1n), 1n);
});

test('20 should return 20n', t => {
	t.is(absBigInt(20), 20n);
});

test('2, 4 should return a BigInt', t => {
	t.is(typeof gcd(2, 4), 'bigint');
});

test('2, 4 should return 2n', t => {
	t.is(gcd(2, 4), 2n);
});

test('-2, -4 should return 2n', t => {
	t.is(gcd(-2, -4), 2n);
});

test('4, 12 should return 12n', t => {
	t.is(lcm(4, 12), 12n);
});

test('4n, 12n should return 12n', t => {
	t.is(lcm(4n, 12n), 12n);
});

test('lcmArray() should return a function', t => {
	t.is(typeof lcmArray, 'function');
});

test('[] should return { outputValue: "" }', t => {
	t.is(lcmArray([]), '');
});

test('[1] should return { outputValue: "1" }', t => {
	t.is(lcmArray([1]), '1');
});

test('4, 20, 12 should return { outputValue: "60" }', t => {
	t.is(lcmArray([4, 20, 12]), '60');
});

test('1..10 should return { outputValue: "2520" }', t => {
	t.is(lcmArray(Array.from({length: 10}, (_v, index) => index + 1)), '2520');
});
