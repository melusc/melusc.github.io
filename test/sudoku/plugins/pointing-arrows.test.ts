import {assert} from 'chai';
import {pointingArrows} from '../../../src/sudoku/plugins/pointing-arrows';
import {Sudoku} from '../../../src/sudoku/sudoku';
import type {SudokuInterface} from '../../../src/sudoku/sudoku.d';

type ComparableCell = {
	possible: Set<string>;
	content: string | undefined;
};

const getComparableCells = (sudoku: SudokuInterface): ComparableCell[] =>
	sudoku
		.getCells()
		.map(cell => ({content: cell.content, possible: cell.possible}));

describe('pointing-arrows.ts', () => {
	let emptySudoku = new Sudoku();

	beforeEach(() => {
		emptySudoku = new Sudoku();
	});

	describe('pointingArrows()', () => {
		it('should not change an empty sudoku.', () => {
			const unchanged = getComparableCells(emptySudoku);

			assert.isFalse(pointingArrows(emptySudoku));

			assert.deepStrictEqual(getComparableCells(emptySudoku), unchanged);
		});

		it('should find a pointing arrow of 3s.', () => {
			const layout: Array<Array<string | string[]>> = [
				[
					['2', '4', '5', '8'],
					'1',
					'7',
					'9',
					['2', '4', '5'],
					'3',
					'6',
					['4', '8'],
					['2', '4', '8'],
				],
				[
					['2', '3', '4', '5', '6'], // Remove "3" from here
					['2', '3', '4', '5'], // And here
					['3', '6'], // And here
					['1', '2', '5', '7'],
					'8',
					['5', '7'],
					['1', '3', '9'], // Pointing arrow here
					['1', '4', '9'],
					['1', '2', '3', '4', '9'], // And here
				],
				[
					'9',
					['2', '3', '4', '8'],
					['3', '6', '8'],
					['1', '2'],
					['2', '4', '6'],
					['4', '6'],
					'5',
					['1', '4', '8'],
					'7',
				],
			];

			for (const [rowIndex, row] of layout.entries()) {
				for (const [colIndex, wantedCell] of row.entries()) {
					if (Array.isArray(wantedCell)) {
						emptySudoku._cells[rowIndex * 9 + colIndex].possible = new Set(
							wantedCell,
						);
					} else {
						emptySudoku.setContent(rowIndex * 9 + colIndex, wantedCell);
					}
				}
			}

			assert.isTrue(pointingArrows(emptySudoku));

			assert.deepStrictEqual(
				[...emptySudoku.getCell(9).possible],
				['2', '4', '5', '6'],
			);

			assert.deepStrictEqual(
				[...emptySudoku.getCell(10).possible],
				['2', '4', '5'],
			);

			assert.deepStrictEqual([...emptySudoku.getCell(11).possible], ['6']);
		});

		it('should find a pointing arrow of 2s.', () => {
			const layout: Array<Array<string | string[]>> = [
				[
					'7',
					['2', '3', '4', '8', '9'], // Remove "2" from here
					'1',
					['2', '8'], // Pointing arrow here
					['2', '4', '9'], // And here
					['4', '8', '9'],
					['3', '8', '9'],
					'6',
					'5',
				],
				[
					['2', '4', '6', '8'],
					['2', '4', '8', '9'],
					['6', '8', '9'],
					['5', '7'],
					'3',
					['5', '7', '8'],
					['1', '8', '9'],
					['1', '4', '8', '9'],
					['1', '4', '8', '9'],
				],
				[
					['3', '4', '8'],
					['3', '4', '8', '9'],
					'5',
					'6',
					['4', '9'],
					'1',
					'7',
					'2',
					['3', '4', '8', '9'],
				],
			];

			for (const [rowIndex, row] of layout.entries()) {
				for (const [colIndex, wantedCell] of row.entries()) {
					if (Array.isArray(wantedCell)) {
						emptySudoku._cells[rowIndex * 9 + colIndex].possible = new Set(
							wantedCell,
						);
					} else {
						emptySudoku.setContent(rowIndex * 9 + colIndex, wantedCell);
					}
				}
			}

			assert.isTrue(pointingArrows(emptySudoku));

			assert.deepStrictEqual(
				[...emptySudoku.getCell(1).possible],
				['3', '4', '8', '9'],
			);
		});
	});
});
