import test from 'ava';

import {
	LogicalSymbolFromName,
	NameFromLogicalSymbol,
} from '../../../src/truth-table/lib/logical-symbols';

test('operators', t => {
	t.is(NameFromLogicalSymbol[LogicalSymbolFromName.iff], 'iff');
	t.is(NameFromLogicalSymbol[LogicalSymbolFromName['if-then']], 'if-then');
	t.is(NameFromLogicalSymbol[LogicalSymbolFromName.not], 'not');
	t.is(NameFromLogicalSymbol[LogicalSymbolFromName.and], 'and');
	t.is(NameFromLogicalSymbol[LogicalSymbolFromName.xor], 'xor');
	t.is(NameFromLogicalSymbol[LogicalSymbolFromName.or], 'or');
});
