import test from 'ava';

import {validateMatchedBrackets} from '../../../src/truth-table/lib/validate-matched-brackets';
import {fromString} from '../../../src/truth-table/lib/string-with-indices';
import {IndexedError} from '../../../src/truth-table/lib/indexed-error';

const doValidate = (input: string) => {
	validateMatchedBrackets(fromString(input));
};

test('findUnmatchedBrackets', t => {
	t.notThrows(() => {
		doValidate('((((a) & (b))))');
	}, '((((a) & (b))))');

	t.throws(
		() => {
			doValidate(')');
		},
		{
			message: 'Unmatched closing bracket at position 0.',
			instanceOf: IndexedError,
		},
		')',
	);

	t.throws(
		() => {
			doValidate('((()');
		},
		{
			message: 'Unmatched opening bracket at position 1.',
			instanceOf: IndexedError,
		},
		'((()',
	);

	t.throws(
		() => {
			doValidate('((())))');
		},
		{
			message: 'Unmatched closing bracket at position 6.',
			instanceOf: IndexedError,
		},
		'((())))',
	);
});
