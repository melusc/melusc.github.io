import test from 'ava';
import {LogicalSymbolFromName} from '../../../src/truth-table/lib/logical-symbols';
import {replaceMappings} from '../../../src/truth-table/lib/mappings';
import {splitOperators} from '../../../src/truth-table/lib/split-operators';
import {fromString} from '../../../src/truth-table/lib/string-with-indices';

import {validateOperators} from '../../../src/truth-table/lib/validate-operators';

const doValidate = (input: string) => {
	validateOperators(replaceMappings(splitOperators(fromString(input))));
};

test('validateOperators', t => {
	t.notThrows(() => {
		doValidate(
			`a${LogicalSymbolFromName.and}${LogicalSymbolFromName.not.repeat(2)}b`,
		);
	}, `a${LogicalSymbolFromName.and}${LogicalSymbolFromName.not.repeat(2)}b`);

	t.throws(
		() => {
			doValidate(`a ${LogicalSymbolFromName.not} && b`);
		},
		{
			message: 'Unexpected operator "&&" at (4 - 6).',
		},
		`a ${LogicalSymbolFromName.not} && b`,
	);

	t.throws(
		() => {
			doValidate(`a ${LogicalSymbolFromName.not} & b`);
		},
		{
			message: 'Unexpected operator "&" at (4 - 5).',
		},
		`a ${LogicalSymbolFromName.not} & b`,
	);

	t.throws(
		() => {
			doValidate(`a ${LogicalSymbolFromName.and.repeat(2)} b`);
		},
		{
			message: `Unexpected operator "${LogicalSymbolFromName.and}" at (3 - 4).`,
		},
		`a${LogicalSymbolFromName.and.repeat(2)}b`,
	);
});
