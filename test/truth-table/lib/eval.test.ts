import test from 'ava';

import {evalOperation} from '../../../src/truth-table/lib/eval';
import {parseOperation} from '../../../src/truth-table/lib/parse-operation';

const t1 = `
(
	a && (b || c)
	xor
	(
		(d -> c) <-> e
	)
) && (e || c) -> f`;
test(t1, t => {
	const parsed = parseOperation(t1);
	t.is(
		evalOperation(parsed, {
			a: true,
			b: false,
			c: true,
			d: true,
			e: false,
			f: false,
		}),
		false,
	);

	t.is(
		evalOperation(parsed, {
			a: false,
			b: false,
			c: true,
			d: false,
			e: true,
			f: true,
		}),
		true,
	);
});
