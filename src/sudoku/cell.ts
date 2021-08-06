import {uniqueId} from 'lodash';

import type {CellInterface} from './sudoku.d';

const emptyCellPossibles = (): Set<string> =>
	new Set(Array.from({length: 9}, (_v, index) => `${index + 1}`));

export class Cell implements CellInterface {
	content: string | undefined;

	possible = emptyCellPossibles();

	key = uniqueId('cell-');

	valid = true;

	setValidity = (): this => {
		this.valid
			= typeof this.content === 'undefined'
				? this.possible.size > 0
				: /^[1-9]$/.test(this.content);

		return this;
	};

	setContent = (content: string): this => {
		content = content.trim();

		if (content) {
			this.content = content.trim();
			this.possible.clear();
		} else {
			this.clear();
		}

		return this.setValidity();
	};

	clear = (): this => {
		this.content = undefined;

		this.possible = emptyCellPossibles();

		this.valid = true;

		return this;
	};
}
