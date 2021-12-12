import test from 'ava';
import {LogicalSymbolFromName} from '../../../src/truth-table/lib/logical-symbols';
import {
	CharacterTypes,
	fromString,
	removeWhitespace,
} from '../../../src/truth-table/lib/string-with-indices';

test('fromString', t => {
	t.deepEqual(
		fromString('äöü'),
		[
			{
				characters: 'äöü',
				type: CharacterTypes.operator,
				from: 0,
				to: 3,
			},
		],
		'äöü',
	);

	t.deepEqual(
		fromString('abcd'),
		[
			{
				characters: 'abcd',
				type: CharacterTypes.variable,
				from: 0,
				to: 4,
			},
		],
		'abcd',
	);

	// Doesn't validate brackets
	t.deepEqual(
		fromString(')((()())))'),
		[
			{
				characters: ')((()())))',
				type: CharacterTypes.bracket,
				from: 0,
				to: 10,
			},
		],
		')((()())))',
	);

	t.deepEqual(
		fromString('(A)&(B)'),
		[
			{
				characters: '(',
				type: CharacterTypes.bracket,
				from: 0,
				to: 1,
			},
			{
				characters: 'A',
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
			{
				characters: '&',
				type: CharacterTypes.operator,
				from: 3,
				to: 4,
			},
			{
				characters: '(',
				type: CharacterTypes.bracket,
				from: 4,
				to: 5,
			},
			{
				characters: 'B',
				type: CharacterTypes.variable,
				from: 5,
				to: 6,
			},
			{
				characters: ')',
				type: CharacterTypes.bracket,
				from: 6,
				to: 7,
			},
		],
		'(A)&(B)',
	);

	t.deepEqual(
		fromString('a AND b'),
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
				characters: 'AND',
				type: CharacterTypes.variable,
				from: 2,
				to: 5,
			},
			{
				characters: ' ',
				type: CharacterTypes.space,
				from: 5,
				to: 6,
			},
			{
				characters: 'b',
				type: CharacterTypes.variable,
				from: 6,
				to: 7,
			},
		],
		'a AND b',
	);

	t.deepEqual(fromString(`a ${LogicalSymbolFromName.and}?&? b`), [
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
			characters: `${LogicalSymbolFromName.and}?&?`,
			type: CharacterTypes.operator,
			from: 2,
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
	]);

	t.deepEqual(
		fromString(
			`a ${LogicalSymbolFromName.and} ${LogicalSymbolFromName.not.repeat(4)} b`,
		),
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
				characters: LogicalSymbolFromName.and,
				type: CharacterTypes.operator,
				from: 2,
				to: 3,
			},
			{
				characters: ' ',
				type: CharacterTypes.space,
				from: 3,
				to: 4,
			},
			{
				characters: LogicalSymbolFromName.not.repeat(4),
				type: CharacterTypes.operator,
				from: 4,
				to: 8,
			},
			{
				characters: ' ',
				type: CharacterTypes.space,
				from: 8,
				to: 9,
			},
			{
				characters: 'b',
				type: CharacterTypes.variable,
				from: 9,
				to: 10,
			},
		],
	);

	t.deepEqual(
		fromString('((((a) & (b))))'),
		[
			{
				characters: '((((',
				type: CharacterTypes.bracket,
				from: 0,
				to: 4,
			},
			{
				characters: 'a',
				type: CharacterTypes.variable,
				from: 4,
				to: 5,
			},
			{
				characters: ')',
				type: CharacterTypes.bracket,
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
				characters: '&',
				type: CharacterTypes.operator,
				from: 7,
				to: 8,
			},
			{
				characters: ' ',
				type: CharacterTypes.space,
				from: 8,
				to: 9,
			},
			{
				characters: '(',
				type: CharacterTypes.bracket,
				from: 9,
				to: 10,
			},
			{
				characters: 'b',
				type: CharacterTypes.variable,
				from: 10,
				to: 11,
			},
			{
				characters: '))))',
				type: CharacterTypes.bracket,
				from: 11,
				to: 15,
			},
		],
		'((((a) & (b))))',
	);
});

test('removeWhitespace', t => {
	t.deepEqual(
		removeWhitespace(fromString('a b c d')),
		[
			{
				characters: 'a',
				type: CharacterTypes.variable,
				from: 0,
				to: 1,
			},
			// Space
			{
				characters: 'b',
				type: CharacterTypes.variable,
				from: 2,
				to: 3,
			},
			// Space
			{
				characters: 'c',
				type: CharacterTypes.variable,
				from: 4,
				to: 5,
			},
			// Space
			{
				characters: 'd',
				type: CharacterTypes.variable,
				from: 6,
				to: 7,
			},
		],
		'a b c d',
	);

	t.deepEqual(
		removeWhitespace(fromString('a\nb\tc\rd\uFEFFe')),
		[
			{
				characters: 'a',
				type: CharacterTypes.variable,
				from: 0,
				to: 1,
			},
			// Newline
			{
				characters: 'b',
				type: CharacterTypes.variable,
				from: 2,
				to: 3,
			},
			// Tab
			{
				characters: 'c',
				type: CharacterTypes.variable,
				from: 4,
				to: 5,
			},
			// Carriage return
			{
				characters: 'd',
				type: CharacterTypes.variable,
				from: 6,
				to: 7,
			},
			// Zero width space
			{
				characters: 'e',
				type: CharacterTypes.variable,
				from: 8,
				to: 9,
			},
		],
		'a\\nb\\tc\\rd\\uFEFFe',
	);
});
