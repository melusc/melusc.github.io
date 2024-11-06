import {expect, test, vi} from 'vitest';

import {TicTacToe, resolveIndex} from '../tic-tac-toe.ts';

test('#resolveIndex', () => {
	let index = 0;

	for (let z = 0; z < 4; ++z) {
		for (let y = 0; y < 4; ++y) {
			for (let x = 0; x < 4; ++x) {
				expect(resolveIndex(x, y, z)).toStrictEqual(index++);
			}
		}
	}
});

test('#getGroups', () => {
	const t = new TicTacToe();

	const foundGroups: string[] = [];

	for (const group of t.getGroups()) {
		foundGroups.push(group.map(({index}) => index).join(', '));
	}

	// prettier-ignore
	const expectedSize
		= (3 * 4 * 4) // "Flat" groups, like rows, 3 directions, 4 layers, 4 per layer
		+ (2 * 4 * 3) // 2d diagonals, 2 per layer, 4 layers, 3 directiosn
		+ 4; // 3d diagonals

	const deduplicated = new Set(foundGroups.sort());

	expect(deduplicated).toMatchSnapshot();
	// Test if it contains all
	expect(deduplicated.size).toStrictEqual(expectedSize);
	// Test that there are also no duplicates
	expect(foundGroups.length).toStrictEqual(expectedSize);
});

test('Winning', () => {
	const t = new TicTacToe();

	const handler = vi.fn();
	t.on('win', handler);

	for (const move of [0, 4, 1, 5, 2, 6, 3]) {
		t.makeMove(move);
	}

	expect(handler).toHaveBeenCalledOnce();
});
