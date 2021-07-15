import {assert} from 'chai';

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

describe('naked-pairs.ts', () => {
	let emptySudoku = new Sudoku();

	beforeEach(() => {
		emptySudoku = new Sudoku();
	});

	describe('nakedPairs()', () => {
		it('should not change an empty sudoku.', () => {
			const originalSudoku = new Sudoku();
			const modifiedSudoku = new Sudoku();

			const anyChanged = nakedPairs(modifiedSudoku);
			assert.isFalse(anyChanged);

			assert.deepStrictEqual(
				getComparableCells(modifiedSudoku),
				getComparableCells(originalSudoku),
			);
		});

		it('should correctly find the pairs of "1" and "6".', () => {
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

			const block = emptySudoku.getBlock(0);

			for (const [index, possible] of possibles.entries()) {
				if (typeof possible === 'string') {
					block[index].setContent(possible);
				} else {
					block[index].possible = new Set(possible);
				}
			}

			assert.isTrue(nakedPairs(emptySudoku));

			assert.deepStrictEqual(
				[...emptySudoku.getCell(2 * 9).possible],
				['7', '8'],
			);
		});

		it('should not change anything upon finding ("1", "2", "5") across two cells', () => {
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

			const row = emptySudoku.getRow(3);

			for (let index = 0; index < 9; ++index) {
				row[index].possible = new Set(possibles[index]);
			}

			assert.isFalse(nakedPairs(emptySudoku));

			for (let index = 0; index < 9; ++index) {
				assert.deepStrictEqual([...row[index].possible], possibles[index]);
			}
		});

		// Copied from remove-duplicates

		it('should solve [[1, 2, 3], [4, 5, 6], [_, 8, 9] (block) correctly.', () => {
			const sudoku = new Sudoku([
				[1, 2, 3],
				[4, 5, 6],
				[_, 8, 9],
			]);

			nakedPairs(sudoku);

			const cell = sudoku.getCell(2 * 9);

			assert.strictEqual(cell.possible.size, 1);

			assert.strictEqual(cell.possible.values().next().value, '7');
		});

		it('should nearly solve [[1, 2, 3], [_, _, 6], [7, 8, 9]] (block).', () => {
			const sudoku = new Sudoku([
				[1, 2, 3],
				[_, _, 6],
				[7, 8, 9],
			]);

			nakedPairs(sudoku);

			const cell1 = sudoku.getCell(1 * 9);
			const cell2 = sudoku.getCell(1 * 9 + 1);

			assert.deepStrictEqual(cell1.possible, new Set(['4', '5']));

			assert.deepStrictEqual(cell2.possible, new Set(['4', '5']));
		});

		it('should solve [_, 2, 5, 3, 8, 9, 4, 7, 6] (col) correctly.', () => {
			const sudoku = new Sudoku(
				[_, 2, 5, 3, 8, 9, 4, 7, 6].map(item => [item]),
			);

			nakedPairs(sudoku);

			const cell = sudoku.getCell(0);

			assert.strictEqual(cell.possible.size, 1);

			assert.strictEqual(cell.possible.values().next().value, '1');
		});

		it('should nearly solve [_, 5, 4, 3, 2, 7, 1, 8, _] (row).', () => {
			const sudoku = new Sudoku(
				[_, 5, 4, 3, 2, 7, 1, 8, _].map(item => [item]),
			);

			nakedPairs(sudoku);

			const cell1 = sudoku.getCell(0);
			const cell2 = sudoku.getCell(8 * 9);

			assert.deepStrictEqual(cell1.possible, new Set(['6', '9']));

			assert.deepStrictEqual(cell2.possible, new Set(['6', '9']));
		});

		it('should solve [1, 2, 3, _, 5, 6, 7, 8, 9] (row) correctly.', () => {
			const sudoku = new Sudoku([[1, 2, 3, _, 5, 6, 7, 8, 9]]);

			nakedPairs(sudoku);

			const cell = sudoku.getCell(3);

			assert.strictEqual(cell.possible.size, 1);

			assert.deepStrictEqual(cell.possible, new Set(['4']));
		});

		it('should nearly solve [5, 7, 8, 1, 2, _, 3, _, 6].', () => {
			const sudoku = new Sudoku([[5, 7, 8, 1, 2, _, 3, _, 6]]);

			nakedPairs(sudoku);

			const cell1 = sudoku.getCell(5);
			const cell2 = sudoku.getCell(7);

			assert.deepStrictEqual(cell1.possible, new Set(['4', '9']));

			assert.deepStrictEqual(cell2.possible, new Set(['4', '9']));
		});
	});
});
