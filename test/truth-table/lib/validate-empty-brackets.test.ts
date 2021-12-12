import test from 'ava';
import {fromString} from '../../../src/truth-table/lib/string-with-indices';

import {validateEmptyBrackets} from '../../../src/truth-table/lib/validate-empty-brackets';

const doValidate = (input: string) => {
	validateEmptyBrackets(fromString(input));
};

test('validateEmptyBrackets', t => {
	t.notThrows(() => {
		doValidate('(a)');
	}, '(a)');

	t.notThrows(() => {
		doValidate('a && b');
	}, 'a && b');

	t.throws(
		() => {
			doValidate('()');
		},
		{
			message: 'Unexpected empty brackets at (0 - 1).',
		},
		'()',
	);

	t.throws(
		() => {
			doValidate('( )');
		},
		{
			message: 'Unexpected empty brackets at (0 - 2).',
		},
		'( )',
	);

	t.throws(
		() => {
			doValidate('((((((()))))))');
		},
		{
			message: 'Unexpected empty brackets at (6 - 7).',
		},
		'((((((()))))))',
	);

	t.throws(
		() => {
			doValidate('(((((((    )))))))');
		},
		{
			message: 'Unexpected empty brackets at (6 - 11).',
		},
		'(((((((    )))))))',
	);

	t.throws(
		() => {
			doValidate('()()()()()');
		},
		{
			message: 'Unexpected empty brackets at (0 - 1).',
		},
		'()()()()()',
	);

	t.throws(
		() => {
			doValidate('( )()()()()');
		},
		{
			message: 'Unexpected opening bracket at position 3.',
		},
		'( )()()()()',
	);

	t.throws(
		() => {
			doValidate(')(');
		},
		{
			message: 'Unexpected opening bracket at position 1.',
		},
		')(',
	);
});
