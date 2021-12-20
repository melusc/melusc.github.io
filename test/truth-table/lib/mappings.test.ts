/* eslint-disable ava/assertion-arguments */

import test from 'ava';
import {IndexedError} from '../../../src/truth-table/lib/indexed-error';

import {
	replaceMappings,
	stringWithIndicesMatches,
} from '../../../src/truth-table/lib/mappings';
import {
	CharacterTypes,
	fromString,
} from '../../../src/truth-table/lib/string-with-indices';

test('stringWithIndicesMatches', t => {
	t.true(
		stringWithIndicesMatches(
			{
				characters: 'abc',
				type: CharacterTypes.variable,
				originalCharacters: 'abc',
				from: 0,
				to: 3,
			},
			'ABC',
		),
	);

	t.false(
		stringWithIndicesMatches(
			{
				characters: 'abc',
				type: CharacterTypes.space,
				originalCharacters: 'abc',
				from: 0,
				to: 3,
			},
			'ABC',
		),
	);

	t.false(
		stringWithIndicesMatches(
			{
				characters: 'abd',
				type: CharacterTypes.variable,
				originalCharacters: 'abd',
				from: 0,
				to: 3,
			},
			'ABC',
		),
	);
});

const replaceMappingsIndices = (input: string): string =>
	replaceMappings(fromString(input))
		.map(({characters}) => characters)
		.join('');

const makeTest = (
	operatorName: string,
	expected: string,
	items: string[],
): void => {
	test(`replace to ${operatorName}`, t => {
		for (const item of items) {
			t.is(replaceMappingsIndices(item), expected, item);
		}
	});
};

makeTest('iff', 'A iff B', [
	'A iff B',
	'A ⇔ B',
	'A ≡ B',
	'A <-> B',
	'A <=> B',
	'A = B',
	'A == B',
	'A === B',
	'A ⟷ B',
]);

makeTest('ifthen', 'A ifthen B', [
	'A ⇒ B',
	'A ⊃ B',
	'A -> B',
	'A => B',
	'A → B',
]);

makeTest('not', 'not A', ['NOT A', '! A', '~ A', '¬ A']);

makeTest('and', 'A and B', ['A && B', 'A & B', 'A AND B', 'A ∧ B']);

makeTest('xor', 'A xor B', [
	'A ⊕ B',
	'A ⊻ B',
	'A ≢ B',
	'A >=< B',
	'A >-< B',
	'A != B',
	'A !== B',
	'A ~= B',
	'A <> B',
	'A XOR B',
	'A ↮ B',
]);

makeTest('or', 'A or B', ['A || B', 'A | B', 'A OR B', 'A ∨ B']);

const t1 = '(a && b) || (c !== ! d)';
test(t1, t => {
	t.is(replaceMappingsIndices(t1), '(A and B) or (C xor not D)', t1);
});

test('Forbidden characters', t => {
	t.throws(
		() => {
			// Caret
			replaceMappingsIndices('A ^ B');
		},
		{
			message: 'Unexpected ambiguous caret (^) at position 2.',
			instanceOf: IndexedError,
		},
	);
});
