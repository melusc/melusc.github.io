import test from 'ava';

import {Sudoku} from '../../../src/sudoku/sudoku';

import type {SudokuInterface} from '../../../src/sudoku/sudoku.d';
import {nakedPairs} from '../../../src/sudoku/plugins/naked-pairs';

const _ = undefined;

type ComparableCell = {
	possible: Set<string>;
	content: string | undefined;
};

const getComparableCells = (sudoku: SudokuInterface): ComparableCell[] =>
	sudoku
		.getCells()
		.map(cell => ({content: cell.content, possible: cell.possible}));

test('nakedPairs should not change an empty sudoku.', t => {
	const originalSudoku = new Sudoku();
	const modifiedSudoku = new Sudoku();

	const anyChanged = nakedPairs(modifiedSudoku);
	t.false(anyChanged);

	t.deepEqual(
		getComparableCells(modifiedSudoku),
		getComparableCells(originalSudoku),
	);
});

test('nakedPairs should correctly find the pairs of "1" and "6".', t => {
	const s = new Sudoku();

	const possibles: Array<string | string[]> = [
		'4',
		['1', '6'],
		['1', '6'],
		['7', '8'],
		'3',
		'2',
		['1', '7', '8'],
		'9',
		'5',
	];

	const block = s.getBlock(0);

	for (const [index, possible] of possibles.entries()) {
		if (typeof possible === 'string') {
			block[index]!.setContent(possible);
		} else {
			block[index]!.possible = new Set(possible);
		}
	}

	t.true(nakedPairs(s));

	t.deepEqual([...s.getCell(2 * 9).possible], ['7', '8']);
});

test('nakedPairs should not change anything upon finding ("1", "2", "5") across two cells', t => {
	const s = new Sudoku();

	const possibles = [
		['1', '2', '5'], // #1
		['6', '7', '8'],
		['1', '4', '6'],
		['1', '2', '5'], // #2
		['1', '2', '5', '6'],
		['4', '5', '9'],
		['1', '5', '7', '8'],
		['3', '5', '7'],
		['1', '4', '8'],
	];

	const row = s.getRow(3);

	for (let index = 0; index < 9; ++index) {
		row[index]!.possible = new Set(possibles[index]);
	}

	t.false(nakedPairs(s));

	for (let index = 0; index < 9; ++index) {
		t.deepEqual([...row[index]!.possible], possibles[index]);
	}
});

// Copied from remove-duplicates

test('nakedPairs should solve [[1, 2, 3], [4, 5, 6], [_, 8, 9] (block) correctly.', t => {
	const s = new Sudoku([
		[1, 2, 3],
		[4, 5, 6],
		[_, 8, 9],
	]);

	nakedPairs(s);

	const cell = s.getCell(2 * 9);

	t.is(cell.possible.size, 1);

	t.is(cell.possible.values().next().value, '7');
});

test('nakedPairs should nearly solve [[1, 2, 3], [_, _, 6], [7, 8, 9]] (block).', t => {
	const sudoku = new Sudoku([
		[1, 2, 3],
		[_, _, 6],
		[7, 8, 9],
	]);

	nakedPairs(sudoku);

	const cell1 = sudoku.getCell(1 * 9);
	const cell2 = sudoku.getCell(1 * 9 + 1);

	t.deepEqual(cell1.possible, new Set(['4', '5']));

	t.deepEqual(cell2.possible, new Set(['4', '5']));
});

test('nakedPairs should solve [_, 2, 5, 3, 8, 9, 4, 7, 6] (col) correctly.', t => {
	const sudoku = new Sudoku([_, 2, 5, 3, 8, 9, 4, 7, 6].map(item => [item]));

	nakedPairs(sudoku);

	const cell = sudoku.getCell(0);

	t.is(cell.possible.size, 1);

	t.is(cell.possible.values().next().value, '1');
});

test('nakedPairs should nearly solve [_, 5, 4, 3, 2, 7, 1, 8, _] (row).', t => {
	const sudoku = new Sudoku([_, 5, 4, 3, 2, 7, 1, 8, _].map(item => [item]));

	nakedPairs(sudoku);

	const cell1 = sudoku.getCell(0);
	const cell2 = sudoku.getCell(8 * 9);

	t.deepEqual(cell1.possible, new Set(['6', '9']));

	t.deepEqual(cell2.possible, new Set(['6', '9']));
});

test('nakedPairs should solve [1, 2, 3, _, 5, 6, 7, 8, 9] (row) correctly.', t => {
	const sudoku = new Sudoku([[1, 2, 3, _, 5, 6, 7, 8, 9]]);

	nakedPairs(sudoku);

	const cell = sudoku.getCell(3);

	t.is(cell.possible.size, 1);

	t.deepEqual(cell.possible, new Set(['4']));
});

test('nakedPairs should nearly solve [5, 7, 8, 1, 2, _, 3, _, 6].', t => {
	const sudoku = new Sudoku([[5, 7, 8, 1, 2, _, 3, _, 6]]);

	nakedPairs(sudoku);

	const cell1 = sudoku.getCell(5);
	const cell2 = sudoku.getCell(7);

	t.deepEqual(cell1.possible, new Set(['4', '9']));

	t.deepEqual(cell2.possible, new Set(['4', '9']));
});
