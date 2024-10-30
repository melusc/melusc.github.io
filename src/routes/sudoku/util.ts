import type {Sudoku} from '@lusc/sudoku';

export type Cell = {
	element: string | undefined;
	isValid: boolean;
	key: string;
};

export function getCells(sudoku: Sudoku): readonly Cell[] {
	const result: Cell[] = [];

	for (const cell of sudoku.getCells()) {
		const element = sudoku.getElement(cell);
		const isValid = sudoku.isCellValid(cell);
		result.push({
			element,
			isValid,
			key: [cell.index, element, isValid].join(','),
		});
	}

	return result;
}

export type MetaKeys = {
	ctrl?: boolean;
	alt?: boolean;
	shift?: boolean;
};

export function getNewFocused(
	key: string,
	focused: number,
	{shift, ctrl}: MetaKeys,
): number {
	key = key.toLowerCase();

	switch (key) {
		case 'arrowdown':
		case 'arrowup': {
			// Always wrap around to the *same* column

			const direction = key === 'arrowdown' ? 9 : -9;

			return (focused + direction + 81) % 81;
		}

		case 'arrowright':
		case 'arrowleft': {
			// Always wrap around to the *same* row

			const direction = key === 'arrowright' ? 1 : -1;

			const col = (focused % 9) + direction;

			if (col < 0) {
				return focused + 8;
			}

			if (col > 8) {
				return focused - 8;
			}

			return focused + direction;
		}

		case ' ': {
			return (focused + 1) % 81;
		}

		case 'tab': {
			// If shift, go backwards
			const direction = shift ? -1 : 1;

			return (focused + direction + 81) % 81;
		}

		case 'backspace': {
			// Back one step, wrap around to last cell
			return (focused + 80) % 81;
		}

		default: {
			// Ctrl + 1 takes you to the first tab so ignore those
			if (!ctrl && /^[1-9]$/.test(key)) {
				return (focused + 1) % 81;
			}
		}
	}

	return focused;
}
