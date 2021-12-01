import test from 'ava';

import {Operators} from '../../../src/truth-table/lib/operators';

test('operators', t => {
	t.is(Operators[Operators.iff], 'iff');
	t.is(Operators[Operators['if-then']], 'if-then');
	t.is(Operators[Operators.not], 'not');
	t.is(Operators[Operators.and], 'and');
	t.is(Operators[Operators.xor], 'xor');
	t.is(Operators[Operators.or], 'or');
});
