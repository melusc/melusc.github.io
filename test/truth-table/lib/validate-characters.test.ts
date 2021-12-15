import test from 'ava';
import {IndexedError} from '../../../src/truth-table/lib/indexed-error';
import {LogicalSymbolFromName} from '../../../src/truth-table/lib/logical-symbols';
import {replaceMappings} from '../../../src/truth-table/lib/mappings';
import {fromString} from '../../../src/truth-table/lib/string-with-indices';

import {validateCharacters} from '../../../src/truth-table/lib/validate-characters';

const doValidate = (input: string) => {
	validateCharacters(replaceMappings(fromString(input)));
};

test('validateCharacters', t => {
	t.notThrows(() => {
		doValidate('()');
	}, '()');

	t.notThrows(() => {
		doValidate('a AND b');
	}, 'a AND b');

	t.notThrows(() => {
		doValidate('(a) AND (b)');
	}, '(a) AND (b)');

	t.notThrows(() => {
		doValidate('(a IFF b) AND (b)');
	}, '(a IFF b) AND (b)');

	t.throws(
		() => {
			doValidate('???');
		},
		{
			message: 'Unexpected "???" at (0 - 3).',
			instanceOf: IndexedError,
		},
		'???',
	);

	t.throws(
		() => {
			doValidate(`${LogicalSymbolFromName.and}&`);
		},
		{
			message: `Unexpected "${LogicalSymbolFromName.and}&" at (0 - 2).`,
			instanceOf: IndexedError,
		},
		`${LogicalSymbolFromName.and}&`,
	);

	t.throws(
		() => {
			doValidate(`${LogicalSymbolFromName.and}&&`);
		},
		{
			message: `Unexpected "${LogicalSymbolFromName.and}&&" at (0 - 3).`,
			instanceOf: IndexedError,
		},
		`${LogicalSymbolFromName.and}&`,
	);
});
