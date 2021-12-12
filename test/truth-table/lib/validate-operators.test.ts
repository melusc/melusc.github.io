import test from 'ava';
import {LogicalSymbolFromName} from '../../../src/truth-table/lib/logical-symbols';
import {splitOperators} from '../../../src/truth-table/lib/split-operators';
import {fromString} from '../../../src/truth-table/lib/string-with-indices';

import {validateOperators} from '../../../src/truth-table/lib/validate-operators';

const doValidate = (input: string) => {
	validateOperators(splitOperators(fromString(input)));
};

test('validateOperators', t => {
	t.notThrows(() => {
		doValidate(
			`a${LogicalSymbolFromName.and}${LogicalSymbolFromName.not.repeat(2)}b`,
		);
	}, `a${LogicalSymbolFromName.and}${LogicalSymbolFromName.not.repeat(2)}b`);

	t.throws(
		() => {
			doValidate(`a${LogicalSymbolFromName.not}${LogicalSymbolFromName.and}b`);
		},
		{
			message: `Unexpected operator "${LogicalSymbolFromName.and}" at (2 - 3).`,
		},
		`a${LogicalSymbolFromName.not}${LogicalSymbolFromName.and}b`,
	);

	t.throws(
		() => {
			doValidate(`a${LogicalSymbolFromName.and.repeat(2)}b`);
		},
		{
			message: `Unexpected operator "${LogicalSymbolFromName.and}" at (2 - 3).`,
		},
		`a${LogicalSymbolFromName.and.repeat(2)}b`,
	);
});
