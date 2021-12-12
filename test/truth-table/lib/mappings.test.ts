import test from 'ava';

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
				from: 0,
				to: 3,
			},
			'ABC',
		),
	);
});

const replaceMappingsIndices = (input: string) =>
	replaceMappings(fromString(input))
		.map(({characters}) => characters)
		.join('');

test('replace to ⟷', t => {
	t.is(replaceMappingsIndices('A ⇔ B'), 'A ⟷ B', 'A ⇔ B');
	t.is(replaceMappingsIndices('A ≡ B'), 'A ⟷ B', 'A ≡ B');
	t.is(replaceMappingsIndices('A iff B'), 'A ⟷ B', 'A iff B');
	t.is(replaceMappingsIndices('A <-> B'), 'A ⟷ B', 'A <-> B');
	t.is(replaceMappingsIndices('A <=> B'), 'A ⟷ B', 'A <=> B');
	t.is(replaceMappingsIndices('A = B'), 'A ⟷ B', 'A = B');
	t.is(replaceMappingsIndices('A == B'), 'A ⟷ B', 'A == B');
	t.is(replaceMappingsIndices('A === B'), 'A ⟷ B', 'A === B');
});

test('replace to →', t => {
	t.is(replaceMappingsIndices('A ⇒ B'), 'A → B', 'A ⇒ B');
	t.is(replaceMappingsIndices('A ⊃ B'), 'A → B', 'A ⊃ B');
	t.is(replaceMappingsIndices('A -> B'), 'A → B', 'A -> B');
	t.is(replaceMappingsIndices('A => B'), 'A → B', 'A => B');
});

test('replace to ¬', t => {
	t.is(replaceMappingsIndices('NOT A'), '¬ A', 'NOT A');
	t.is(replaceMappingsIndices('!A'), '¬A', '!A');
	t.is(replaceMappingsIndices('~A'), '¬A', '~A');
});

test('replace to ∧', t => {
	t.is(replaceMappingsIndices('A && B'), 'A ∧ B', 'A && B');
	t.is(replaceMappingsIndices('A & B'), 'A ∧ B', 'A & B');
	t.is(replaceMappingsIndices('A AND B'), 'A ∧ B', 'A AND B');
});

test('replace to ↮', t => {
	t.is(replaceMappingsIndices('A ⊕ B'), 'A ↮ B', 'A ⊕ B');
	t.is(replaceMappingsIndices('A ⊻ B'), 'A ↮ B', 'A ⊻ B');
	t.is(replaceMappingsIndices('A ≢ B'), 'A ↮ B', 'A ≢ B');
	t.is(replaceMappingsIndices('A XOR B'), 'A ↮ B', 'A XOR B');
	t.is(replaceMappingsIndices('A >=< B'), 'A ↮ B', 'A >=< B');
	t.is(replaceMappingsIndices('A >-< B'), 'A ↮ B', 'A >-< B');
	t.is(replaceMappingsIndices('A != B'), 'A ↮ B', 'A != B');
	t.is(replaceMappingsIndices('A !== B'), 'A ↮ B', 'A !== B');
	t.is(replaceMappingsIndices('A ~= B'), 'A ↮ B', 'A ~= B');
});

test('replace to ∨', t => {
	t.is(replaceMappingsIndices('A || B'), 'A ∨ B', 'A || B');
	t.is(replaceMappingsIndices('A | B'), 'A ∨ B', 'A | B');
	t.is(replaceMappingsIndices('A OR B'), 'A ∨ B', 'A OR B');
});

test('Replacing strings with weird behaviour on upperCase', t => {
	// 'ß'.toUpperCase() === 'SS'
	t.is(replaceMappingsIndices('ß || B'), 'ß ∨ B', 'ß || B');
});

test('(a and b) or (c xor not d)', t => {
	t.is(
		replaceMappingsIndices('(a and b) or (c xor not d)'),
		'(a ∧ b) ∨ (c ↮ ¬ d)',
		'(a and b) or (c xor not d)',
	);
});

test('Forbidden characters', t => {
	t.throws(
		() => {
			// Caret
			replaceMappingsIndices('A ^ B');
		},
		{
			message: 'Unexpected ambiguous caret (^) at position 2.',
		},
	);
});
