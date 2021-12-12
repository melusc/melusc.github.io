import test from 'ava';
import {LogicalSymbolFromName} from '../../../src/truth-table/lib/logical-symbols';
import {fromString} from '../../../src/truth-table/lib/string-with-indices';

import {validateCharacters} from '../../../src/truth-table/lib/validate-characters';

const doValidate = (input: string) => {
	validateCharacters(fromString(input));
};

test('validateCharacters', t => {
	t.notThrows(() => {
		doValidate('()');
	}, '()');

	t.notThrows(() => {
		doValidate(`a ${LogicalSymbolFromName.and} b`);
	}, `a ${LogicalSymbolFromName.and} b`);

	t.notThrows(() => {
		doValidate(`(a) ${LogicalSymbolFromName.and} (b)`);
	}, `(a) ${LogicalSymbolFromName.and} (b)`);

	t.notThrows(() => {
		doValidate(
			`(a ${LogicalSymbolFromName.iff} b) ${LogicalSymbolFromName.and} (b)`,
		);
	}, `(a ${LogicalSymbolFromName.iff} b) ${LogicalSymbolFromName.and} (b)`);

	t.throws(
		() => {
			doValidate('???');
		},
		{
			message: 'Unexpected "???" at (0 - 3).',
		},
		'???',
	);

	t.throws(
		() => {
			doValidate(`${LogicalSymbolFromName.and}&`);
		},
		{
			message: 'Unexpected character "&" at position 1.',
		},
		`${LogicalSymbolFromName.and}&`,
	);

	t.throws(
		() => {
			doValidate(`${LogicalSymbolFromName.and}&&`);
		},
		{
			message: 'Unexpected "&&" at (1 - 3).',
		},
		`${LogicalSymbolFromName.and}&`,
	);
});
