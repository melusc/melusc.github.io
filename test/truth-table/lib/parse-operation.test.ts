import test from 'ava';

import {parseOperation} from '../../../src/truth-table/lib/parse-operation';

const t1 = '(a) && (b)';
test(t1, t => {
	t.deepEqual(parseOperation(t1), {
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
	});
});

const t2 = '!A';
test(t2, t => {
	t.deepEqual(parseOperation(t2), {
		type: 'not',
		values: [
			{
				type: 'variable',
				variable: 'A',
			},
		],
	});
});

const t3 = 'not A and not B';
test(t3, t => {
	t.deepEqual(parseOperation(t3), {
		type: 'and',
		values: [
			{
				type: 'not',
				values: [
					{
						type: 'variable',
						variable: 'A',
					},
				],
			},
			{
				type: 'not',
				values: [
					{
						type: 'variable',
						variable: 'B',
					},
				],
			},
		],
	});
});

const t4 = 'a and b xor c';
test(t4, t => {
	t.deepEqual(parseOperation(t4), {
		type: 'xor',
		values: [
			{
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
			},
			{
				type: 'variable',
				variable: 'c',
			},
		],
	});
});

const t5 = '(a and b) or (c xor not d)';
test(t5, t => {
	t.deepEqual(parseOperation(t5), {
		type: 'or',
		values: [
			{
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
			},
			{
				type: 'xor',
				values: [
					{
						type: 'variable',
						variable: 'c',
					},
					{
						type: 'not',
						values: [
							{
								type: 'variable',
								variable: 'd',
							},
						],
					},
				],
			},
		],
	});
});

const t6 = '(((a)))';
test(t6, t => {
	t.deepEqual(parseOperation(t6), {
		type: 'variable',
		variable: 'a',
	});
});

const t7 = `
	(
		a && (b || c)
		xor
		(
			(d -> c) <-> e
		)
	) && (e || c) -> f`;
test(t7, t => {
	t.deepEqual(parseOperation(t7), {
		type: 'if-then',
		values: [
			{
				type: 'and',
				values: [
					{
						type: 'xor',
						values: [
							{
								type: 'and',
								values: [
									{
										type: 'variable',
										variable: 'a',
									},
									{
										type: 'or',
										values: [
											{
												type: 'variable',
												variable: 'b',
											},
											{
												type: 'variable',
												variable: 'c',
											},
										],
									},
								],
							},
							{
								type: 'iff',
								values: [
									{
										type: 'if-then',
										values: [
											{
												type: 'variable',
												variable: 'd',
											},
											{
												type: 'variable',
												variable: 'c',
											},
										],
									},
									{
										type: 'variable',
										variable: 'e',
									},
								],
							},
						],
					},
					{
						type: 'or',
						values: [
							{
								type: 'variable',
								variable: 'e',
							},
							{
								type: 'variable',
								variable: 'c',
							},
						],
					},
				],
			},
			{
				type: 'variable',
				variable: 'f',
			},
		],
	});
});
