import {Sudoku, type SubscriptionCallback} from '@lusc/sudoku';
import {get, writable, type Subscriber, type Unsubscriber} from 'svelte/store';

import {getCells, type Cell} from './util';

type SudokuState = {
	cells: readonly Cell[];
	error: undefined | string;
	focused: number;
};

export function makeSudokuState(initialSudoku: Sudoku): {
	subscribe: (
		run: Subscriber<SudokuState>,
		invalidate?: () => void,
	) => Unsubscriber;
	clearCell(): void;
	reset(): void;
	setFocus(index: number): void;
	setElement(value: string): void;
	solve(): void;
} {
	let sudoku = initialSudoku;
	const store = writable<SudokuState>({
		focused: 0,
		error: undefined,
		cells: getCells(sudoku),
	});
	const {subscribe, set, update} = store;

	const sudokuSubscriber: SubscriptionCallback = (sudoku_, type): void => {
		const cells = getCells(sudoku_);
		let error: undefined | string;

		switch (type) {
			case 'change': {
				error = undefined;

				break;
			}

			case 'finish': {
				const isSolved = sudoku_.isSolved();
				error = isSolved ? undefined : "Sudoku wasn't solved completely.";

				break;
			}

			case 'error': {
				error = 'Sudoku is invalid!';

				break;
			}
		}

		update(state => ({...state, error, cells}));
	};

	sudoku.subscribe(sudokuSubscriber);

	return {
		subscribe,
		clearCell() {
			sudoku.clearCell(get(store).focused);
		},
		reset() {
			sudoku.unsubscribe(sudokuSubscriber);
			sudoku = new Sudoku(9);
			sudoku.subscribe(sudokuSubscriber);
			set({
				focused: 0,
				error: undefined,
				cells: getCells(sudoku),
			});
		},
		setFocus(index: number) {
			update(state => ({...state, focused: index}));
		},
		setElement(value: string) {
			sudoku.setElement(get(store).focused, value);
		},
		solve() {
			sudoku.solve();
		},
	};
}
