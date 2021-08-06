import {ReadonlyDeep} from 'type-fest';
import type {
	Cells,
	CellInterface,
	SudokuInterface,
	SubscriptionCallback,
	DispatchTypes,
	NumberOnlySudoku,
} from './sudoku.d';

import {Cell} from './cell';
import * as plugins from './plugins/plugins';

export const inRangeIncl = (low: number, high: number, n: number): void => {
	if (!Number.isInteger(n)) {
		throw new TypeError(`${n} was not an integer.`);
	}

	if (n < low || n > high) {
		throw new RangeError(`${n} ∉ [${low}, ${high}].`);
	}
};

export class Sudoku implements SudokuInterface {
	_cells: Cells;

	#subscriptions: Set<SubscriptionCallback> = new Set();

	#plugins = Object.values(plugins);

	constructor(array?: ReadonlyDeep<NumberOnlySudoku>) {
		this._cells = Array.from({length: 81}, () => new Cell());

		if (array) {
			for (const [rowIndex, row] of array.entries()) {
				for (const [colIndex, cell] of row.entries()) {
					if (typeof cell === 'number') {
						const rowIndex_ = rowIndex * 9; // Because of prettier and eslint's no-mixed-operators

						this.setContent(rowIndex_ + colIndex, `${cell}`);
					}
				}
			}
		}
	}

	setContent = (index: number, content: string): this => {
		inRangeIncl(0, 80, index);

		const cell = this._cells[index]!; // It's [0,80]

		cell.setContent(content);

		this.cellsIndividuallyValidByStructure();

		return this.#dispatch('change');
	};

	getContent = (index: number): string | undefined => {
		inRangeIncl(0, 80, index);

		// It's [0,80]
		return this._cells[index]!.content;
	};

	clearCell = (index: number): this => {
		this.getCell(index).clear(); // Validate index there

		this.cellsIndividuallyValidByStructure();

		return this.#dispatch('change');
	};

	clearAllCells = (): this => {
		for (const cell of this._cells) {
			cell.clear();
		}

		return this.#dispatch('change');
	};

	getCol = (col: number): CellInterface[] => {
		inRangeIncl(0, 8, col);

		const result: CellInterface[] = [];

		for (let index = col; index < 81; index += 9) {
			result.push(this._cells[index]!);
		}

		return result;
	};

	getRow = (row: number): CellInterface[] => {
		inRangeIncl(0, 8, row);

		row *= 9;

		return this._cells.slice(row, row + 9);
	};

	getBlock = (index: number): CellInterface[] => {
		inRangeIncl(0, 8, index);

		const colOffset = (index % 3) * 3;
		const rowOffset = Math.floor(index / 3) * 3;

		const result = [];

		for (let index_ = 0; index_ < 9; ++index_) {
			let row = rowOffset + Math.floor(index_ / 3);
			const col = colOffset + (index_ % 3);

			row *= 9;

			result.push(this.getCell(row + col));
		}

		return result;
	};

	getCell = (index: number): CellInterface => {
		inRangeIncl(0, 80, index);

		return this._cells[index]!; // It's [0,80]
	};

	getCells = (): Cells => [...this._cells];

	solve = (): this => {
		if (this.isValid()) {
			for (const cell of this._cells) {
				if (cell.content === undefined) {
					cell.clear(); // Reset possibles
				}
			}

			let anyChanged = false;
			let sudokuIsValid = true;

			do {
				anyChanged = false;

				for (const plugin of this.#plugins) {
					try {
						anyChanged = plugin(this) || anyChanged;
					} catch (error: unknown) {
						// eslint-disable-next-line max-depth
						if (process.env['NODE_ENV'] !== 'AVA_TESTING') {
							console.error(error, this._cells);
						}

						sudokuIsValid = false;
						break;
					}
				}

				for (const [index, cell] of this._cells.entries()) {
					if (cell.content === undefined) {
						// eslint-disable-next-line max-depth
						if (cell.possible.size === 1) {
							// We know that the set has one item
							cell.setContent(cell.possible.values().next().value as string);
						} else if (cell.possible.size === 0) {
							// eslint-disable-next-line max-depth
							if (process.env['NODE_ENV'] !== 'AVA_TESTING') {
								console.error('cell.possible.size === 0', [index, cell]);
							}

							sudokuIsValid = false;

							break;
						}
					}
				}

				sudokuIsValid &&= this.isValid();
			} while (anyChanged && sudokuIsValid);

			this.#dispatch(sudokuIsValid ? 'finish' : 'error');
		} else {
			this.#dispatch('error');
		}

		return this;
	};

	subscribe = (callback: SubscriptionCallback): this => {
		this.#subscriptions.add(callback);

		return this;
	};

	unsubscribe = (callback: SubscriptionCallback): this => {
		this.#subscriptions.delete(callback);

		return this;
	};

	#dispatch = (type: DispatchTypes): this => {
		for (const callback of this.#subscriptions) {
			callback(this, type);
		}

		return this;
	};

	cellsIndividuallyValidByStructure = (): boolean => {
		for (const cell of this._cells) {
			cell.setValidity();
		}

		for (let index = 0; index < 9; ++index) {
			for (const structure of [
				this.getCol(index),
				this.getRow(index),
				this.getBlock(index),
			]) {
				this._validateByStructure(structure);
			}
		}

		for (const [index, cell] of this._cells.entries()) {
			if (!cell.valid) {
				if (process.env['NODE_ENV'] !== 'AVA_TESTING') {
					console.error('cell was not valid', [index, cell]);
				}

				return false;
			}
		}

		return true;
	};

	isValid = (): boolean => {
		const keys = ['getRow', 'getBlock', 'getCol'] as const;

		for (const key of keys) {
			for (let index = 0; index < 9; ++index) {
				const structure = this[key](index);

				const dict = new Map<string, number>();

				for (const cell of structure) {
					if (cell.content === undefined) {
						// eslint-disable-next-line max-depth
						for (const possible of cell.possible) {
							dict.set(possible, (dict.get(possible) ?? 0) + 1);
						}
					} else {
						dict.set(cell.content, (dict.get(cell.content) ?? 0) + 1);
					}
				}

				if (dict.size !== 9) {
					if (process.env['NODE_ENV'] !== 'AVA_TESTING') {
						console.error('dict.size !== 9', dict);
					}

					return false;
				}
			}
		}

		return this.cellsIndividuallyValidByStructure();
	};

	_validateByStructure = (structure: Cell[]): this => {
		const found = new Map<string, number>();
		for (const {content} of structure) {
			if (typeof content === 'string') {
				found.set(content, (found.get(content) ?? 0) + 1);
			}
		}

		for (const [key, amount] of found) {
			if (amount === 1) {
				continue;
			}

			for (const [index, cell] of structure.entries()) {
				if (cell.content === key) {
					if (process.env['NODE_ENV'] !== 'AVA_TESTING') {
						console.error('cell.content === key', [index, cell]);
					}

					cell.valid = false;
				}
			}
		}

		return this;
	};

	isSolved = (): boolean => {
		if (!this.cellsIndividuallyValidByStructure()) {
			return false;
		}

		for (const cell of this._cells) {
			if (cell.content === undefined) {
				return false;
			}
		}

		return true;
	};
}
