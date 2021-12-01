import test from 'ava';

import {LogicalSymbolFromName} from '../../../src/truth-table/lib/logical-symbols';
import {operationToString} from '../../../src/truth-table/lib/operation-to-string';

test('a AND b', t => {
	t.is(
		operationToString({
			type: 'and',
			values: [
				{
					type: 'variable',
					variable: 'a',
				},
				{
					type: 'variable',
					variable: 'b',
				},
			],
		}),
		`(a ${LogicalSymbolFromName.and} b)`,
	);
});

test('a AND (b XOR (c <=> d))', t => {
	t.is(operationToString({
		type: 'and',
		values: [
			{
				type: 'variable',
				variable: 'a',
			},
			{
				type: 'xor',
				values: [
					{
						type: 'variable',
						variable: 'b',
					},
					{
						type: 'iff',
						values: [
							{
								type: 'variable',
								variable: 'c',
							},
							{
								type: 'variable',
								variable: 'd',
							},
						],
					},
				],
			},
		],
	}), `(a ${LogicalSymbolFromName.and} (b ${LogicalSymbolFromName.xor} (c ${LogicalSymbolFromName.iff} d)))`);
});
