import test from 'ava';

import {groupBrackets} from '../../../src/truth-table/lib/group-brackets';

test('a ((b)) c (d) e', t => {
	t.deepEqual(groupBrackets('a ((b)) c (d) e'), [
		'a',
		'((b))',
		'c',
		'(d)',
		'e',
	]);
});

test('a b', t => {
	t.deepEqual(groupBrackets('a b'), ['a b']);
});

test('(a) & ( b )', t => {
	t.deepEqual(groupBrackets('(a) & ( b )'), ['(a)', '&', '( b )']);
});

test('(a) (b)', t => {
	t.throws(
		() => {
			groupBrackets('(a) (b)');
		},
		{
			message: /index 4/,
		},
	);
});

test('(()) & (())', t => {
	t.notThrows(() => {
		t.deepEqual(groupBrackets('(()) & (())'), ['(())', '&', '(())']);
	});
});

test('a () b', t => {
	t.throws(
		() => {
			groupBrackets('a () b');
		},
		{
			message: /empty/,
		},
	);
});
