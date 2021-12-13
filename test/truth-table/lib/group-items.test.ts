import test from 'ava';

import {groupItems} from '../../../src/truth-table/lib/group-items';
import {
	CharacterTypes,
	fromString,
} from '../../../src/truth-table/lib/string-with-indices';

// No validation, input just has to be correct
const groupBracketsString = (input: string) => groupItems(fromString(input));

test('a ((b)) c (d) e', t => {
	t.deepEqual(groupBracketsString('a ((b)) c (d) e'), [
		[
			{
				characters: 'a',
				type: CharacterTypes.variable,
				from: 0,
				to: 1,
			},
			{
				characters: ' ',
				type: CharacterTypes.space,
				from: 1,
				to: 2,
			},
		],
		[
			{
				characters: '((',
				type: CharacterTypes.bracket,
				from: 2,
				to: 4,
			},
			{
				characters: 'b',
				type: CharacterTypes.variable,
				from: 4,
				to: 5,
			},
			{
				characters: '))',
				type: CharacterTypes.bracket,
				from: 5,
				to: 7,
			},
		],
		[
			{
				characters: ' ',
				type: CharacterTypes.space,
				from: 7,
				to: 8,
			},
			{
				characters: 'c',
				type: CharacterTypes.variable,
				from: 8,
				to: 9,
			},
			{
				characters: ' ',
				type: CharacterTypes.space,
				from: 9,
				to: 10,
			},
		],
		[
			{
				characters: '(',
				type: CharacterTypes.bracket,
				from: 10,
				to: 11,
			},
			{
				characters: 'd',
				type: CharacterTypes.variable,
				from: 11,
				to: 12,
			},
			{
				characters: ')',
				type: CharacterTypes.bracket,
				from: 12,
				to: 13,
			},
		],
		[
			{
				characters: ' ',
				type: CharacterTypes.space,
				from: 13,
				to: 14,
			},
			{
				characters: 'e',
				type: CharacterTypes.variable,
				from: 14,
				to: 15,
			},
		],
	]);
});

test('a b', t => {
	t.deepEqual(groupBracketsString('a b'), [
		[
			{
				characters: 'a',
				type: CharacterTypes.variable,
				from: 0,
				to: 1,
			},
			{
				characters: ' ',
				type: CharacterTypes.space,
				from: 1,
				to: 2,
			},
			{
				characters: 'b',
				type: CharacterTypes.variable,
				from: 2,
				to: 3,
			},
		],
	]);
});

test('(a) & ( b )', t => {
	t.deepEqual(groupBracketsString('(a) & ( b )'), [
		[
			{
				characters: '(',
				type: CharacterTypes.bracket,
				from: 0,
				to: 1,
			},
			{
				characters: 'a',
				type: CharacterTypes.variable,
				from: 1,
				to: 2,
			},
			{
				characters: ')',
				type: CharacterTypes.bracket,
				from: 2,
				to: 3,
			},
		],
		[
			{
				characters: ' ',
				type: CharacterTypes.space,
				from: 3,
				to: 4,
			},
		],
		[
			{
				characters: '&',
				type: CharacterTypes.operator,
				originalCharacters: '&',
				from: 4,
				to: 5,
			},
		],
		[
			{
				characters: ' ',
				type: CharacterTypes.space,
				from: 5,
				to: 6,
			},
		],
		[
			{
				characters: '(',
				type: CharacterTypes.bracket,
				from: 6,
				to: 7,
			},
			{
				characters: ' ',
				type: CharacterTypes.space,
				from: 7,
				to: 8,
			},
			{
				characters: 'b',
				type: CharacterTypes.variable,
				from: 8,
				to: 9,
			},
			{
				characters: ' ',
				type: CharacterTypes.space,
				from: 9,
				to: 10,
			},
			{
				characters: ')',
				type: CharacterTypes.bracket,
				from: 10,
				to: 11,
			},
		],
	]);
});

test('((a) & b)', t => {
	t.deepEqual(groupBracketsString('((a) & b)'), [
		[
			{
				characters: '((',
				type: CharacterTypes.bracket,
				from: 0,
				to: 2,
			},
			{
				characters: 'a',
				type: CharacterTypes.variable,
				from: 2,
				to: 3,
			},
			{
				characters: ')',
				type: CharacterTypes.bracket,
				from: 3,
				to: 4,
			},
			{
				characters: ' ',
				type: CharacterTypes.space,
				from: 4,
				to: 5,
			},
			{
				characters: '&',
				type: CharacterTypes.operator,
				originalCharacters: '&',
				from: 5,
				to: 6,
			},
			{
				characters: ' ',
				type: CharacterTypes.space,
				from: 6,
				to: 7,
			},
			{
				characters: 'b',
				type: CharacterTypes.variable,
				from: 7,
				to: 8,
			},
			{
				characters: ')',
				type: CharacterTypes.bracket,
				from: 8,
				to: 9,
			},
		],
	]);
});
