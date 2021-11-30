import test from 'ava';

import {groupBrackets} from '../../../src/truth-table/lib/group-brackets';

test('a ((b)) c (d) e', t => {
	t.deepEqual(groupBrackets('a ((b)) c (d) e'), ['a ', '(b)', ' c ', 'd', ' e']);
});

test('a b', t => {
	t.deepEqual(groupBrackets('a b'), ['a b']);
});
