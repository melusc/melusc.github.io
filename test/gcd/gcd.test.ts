import test from 'ava';
import {gcd, gcdArray} from '../../src/gcd/functions.js';

test('gcd 150, 100 should return 50', t => {
	t.is(gcd(150, 100), 50);
});

test('gcd -5, -10 should return -5', t => {
	t.is(gcd(-5, -10), -5);
});

test('gcd -5, -6 should return -1', t => {
	t.is(gcd(-5, -6), -1);
});

test('gcd 50, 100 should return 50', t => {
	t.is(gcd(50, 100), 50);
});

test('gcd 13, 17 should return 1', t => {
	t.is(gcd(13, 17), 1);
});

test('gcdArray [15, 150, 45] should return "15"', t => {
	t.is(gcdArray([15, 150, 45]), '15');
});
