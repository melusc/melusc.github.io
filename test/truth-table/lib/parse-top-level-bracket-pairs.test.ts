import test from 'ava';
import {parseTopLevelBracketPairs} from '../../../src/truth-table/lib/parse-top-level-bracket-pairs';

test('ff (f) (f)', t => {
	t.deepEqual(parseTopLevelBracketPairs('ff (f) (f)'), [
		[3, 5],
		[7, 9],
	]);
});

test('ff ((((f)))) (f)', t => {
	t.deepEqual(parseTopLevelBracketPairs('ff ((((f)))) ((f))'), [
		[3, 11],
		[13, 17],
	]);
});

test('(()())', t => {
	t.deepEqual(parseTopLevelBracketPairs('(()())'), [[0, 5]]);
});

test('f () f', t => {
	t.deepEqual(parseTopLevelBracketPairs('f () f'), [[2, 3]]);
});

test('ff (f', t => {
	t.throws(
		() => {
			parseTopLevelBracketPairs('ff (f');
		},
		{
			message: /index 3: \(f/,
			instanceOf: SyntaxError,
		},
	);
});

test('ff )))', t => {
	t.throws(
		() => {
			parseTopLevelBracketPairs('ff )))');
		},
		{
			message: /unmatched brackets/,
		},
	);
});
