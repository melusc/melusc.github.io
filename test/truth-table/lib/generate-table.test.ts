import test from 'ava';

import {generateTable} from '../../../src/truth-table/lib/generate-table';
import {LogicalSymbolFromName} from '../../../src/truth-table/lib/logical-symbols';

const t1 = 'a OR b';
test(t1, t => {
	t.like(generateTable(t1), {
		columns: ['A', 'B', `A ${LogicalSymbolFromName.or} B`],
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
	t.like(generateTable(t2), {
		columns: [
			'A',
			'B',
			'C',
			`A ${LogicalSymbolFromName.and} B`,
			`(A ${LogicalSymbolFromName.and} B) ${LogicalSymbolFromName.and} C`,
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
	t.like(generateTable(t3), {
		columns: [
			'A',
			'B',
			`A ${LogicalSymbolFromName.and} B`,
			`(A ${LogicalSymbolFromName.and} B) ${LogicalSymbolFromName.or} (A ${LogicalSymbolFromName.and} B)`,
		],
		rows: [
			[true, true, true, true],
			[true, false, false, false],
			[false, true, false, false],
			[false, false, false, false],
		],
	});
});
