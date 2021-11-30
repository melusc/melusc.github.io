import test from 'ava';

import {replaceMappings} from '../../../src/truth-table/lib/mappings';

test('replace to ⟷', t => {
	t.is(replaceMappings('A ⇔ B'), 'A ⟷ B', 'A ⇔ B');
	t.is(replaceMappings('A ≡ B'), 'A ⟷ B', 'A ≡ B');
	t.is(replaceMappings('A iff B'), 'A ⟷ B', 'A iff B');
	t.is(replaceMappings('A if and only if B'), 'A ⟷ B', 'A if and only if B');
	t.is(replaceMappings('A same as B'), 'A ⟷ B', 'A same as B');
	t.is(replaceMappings('A equal B'), 'A ⟷ B', 'A equal B');
	t.is(replaceMappings('A <-> B'), 'A ⟷ B', 'A <-> B');
	t.is(replaceMappings('A <=> B'), 'A ⟷ B', 'A <=> B');
	t.is(replaceMappings('A = B'), 'A ⟷ B', 'A = B');
	t.is(replaceMappings('A == B'), 'A ⟷ B', 'A == B');
	t.is(replaceMappings('A === B'), 'A ⟷ B', 'A === B');
});

test('replace to →', t => {
	t.is(replaceMappings('A if then B'), 'A → B', 'A if then B');
	t.is(replaceMappings('A IF THEN B'), 'A → B', 'A IF THEN B');
	t.is(replaceMappings('A IMPLIeS B'), 'A → B', 'A IMPLIeS B');
	t.is(replaceMappings('A ⇒ B'), 'A → B', 'A ⇒ B');
	t.is(replaceMappings('A ⊃ B'), 'A → B', 'A ⊃ B');
	t.is(replaceMappings('A -> B'), 'A → B', 'A -> B');
	t.is(replaceMappings('A => B'), 'A → B', 'A => B');
});

test('replace to ¬', t => {
	t.is(replaceMappings('NOT A'), '¬ A', 'NOT A');
	t.is(replaceMappings('!A'), '¬A', '!A');
	t.is(replaceMappings('~A'), '¬A', '~A');
});

test('replace to ∧', t => {
	t.is(replaceMappings('A && B'), 'A ∧ B', 'A && B');
	t.is(replaceMappings('A & B'), 'A ∧ B', 'A & B');
	t.is(replaceMappings('A AND B'), 'A ∧ B', 'A AND B');
});

test('replace to ↮', t => {
	t.is(replaceMappings('A ⊕ B'), 'A ↮ B', 'A ⊕ B');
	t.is(replaceMappings('A ⊻ B'), 'A ↮ B', 'A ⊻ B');
	t.is(replaceMappings('A ≢ B'), 'A ↮ B', 'A ≢ B');
	t.is(replaceMappings('A XOR B'), 'A ↮ B', 'A XOR B');
	t.is(replaceMappings('A either or B'), 'A ↮ B', 'A either or B');
	t.is(replaceMappings('A >=< B'), 'A ↮ B', 'A >=< B');
	t.is(replaceMappings('A >-< B'), 'A ↮ B', 'A >-< B');
	t.is(replaceMappings('A != B'), 'A ↮ B', 'A != B');
	t.is(replaceMappings('A !== B'), 'A ↮ B', 'A !== B');
	t.is(replaceMappings('A ~= B'), 'A ↮ B', 'A ~= B');
});

test('replace to ∨', t => {
	t.is(replaceMappings('A || B'), 'A ∨ B', 'A || B');
	t.is(replaceMappings('A | B'), 'A ∨ B', 'A | B');
	t.is(replaceMappings('A OR B'), 'A ∨ B', 'A OR B');
});

test('Replacing strings with weird behaviour on upperCase', t => {
	// 'ß'.toUpperCase() === 'SS'
	t.is(replaceMappings('ß || B'), 'ß ∨ B', 'ß || B');
});

test('Forbidden characters', t => {
	t.throws(
		() => {
			// Caret
			replaceMappings('A ^ B');
		},
		{
			message: /ambiguity/i,
		},
	);
});
