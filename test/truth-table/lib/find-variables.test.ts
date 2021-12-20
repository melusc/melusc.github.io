import test from 'ava';

import {findVariables} from '../../../src/truth-table/lib/find-variables';
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

	t.deepEqual(findVariables(parsed), new Set(['A', 'B', 'C', 'D', 'E', 'F']));
});
