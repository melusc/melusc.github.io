import test from 'ava';

import {generateTable} from '../../../src/truth-table/lib/generate-table';
import {LogicalSymbolFromName} from '../../../src/truth-table/lib/logical-symbols';

const t1 = 'a OR b';
test(t1, t => {
	t.deepEqual(generateTable(t1), {
		columns: ['a', 'b', `(a ${LogicalSymbolFromName.or} b)`],
		rows: [
			[true, true, true],
			[true, false, true],
			[false, true, true],
			[false, false, false],
		],
	});
});

const t2 = '(a and b) and c';
test(t2, t => {
	t.deepEqual(generateTable(t2), {
		columns: [
			'a',
			'b',
			'c',
			`(a ${LogicalSymbolFromName.and} b)`,
			`((a ${LogicalSymbolFromName.and} b) ${LogicalSymbolFromName.and} c)`,
		],
		rows: [
			[true, true, true, true, true],
			[true, true, false, true, false],
			[true, false, true, false, false],
			[true, false, false, false, false],
			[false, true, true, false, false],
			[false, true, false, false, false],
			[false, false, true, false, false],
			[false, false, false, false, false],
		],
	});
});

const t3 = '(a and b) or (a and b)';
test(t3, t => {
	t.deepEqual(generateTable(t3), {
		columns: [
			'a',
			'b',
			`(a ${LogicalSymbolFromName.and} b)`,
			`((a ${LogicalSymbolFromName.and} b) ${LogicalSymbolFromName.or} (a ${LogicalSymbolFromName.and} b))`,
		],
		rows: [
			[true, true, true, true],
			[true, false, false, false],
			[false, true, false, false],
			[false, false, false, false],
		],
	});
});
