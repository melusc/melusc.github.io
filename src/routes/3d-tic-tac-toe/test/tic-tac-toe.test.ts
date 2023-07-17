import {expect, test, vi} from 'vitest';

import {TicTacToe, resolveIndex} from '../tic-tac-toe.ts';

test('#resolveIndex', () => {
	let i = 0;

	for (let z = 0; z < 4; ++z) {
		for (let y = 0; y < 4; ++y) {
			for (let x = 0; x < 4; ++x) {
				expect(resolveIndex(x, y, z)).toStrictEqual(i++);
			}
		}
	}
});

test('#getGroups', () => {
	const t = new TicTacToe();

	const foundGroups = new Set<string>();

	for (const group of t.getGroups()) {
		foundGroups.add(group.map(({index}) => index).join(', '));
	}

	// prettier-ignore
	const expectedSize
		= (3 * 4 * 4) // "Flat" groups, like rows, 3 directions, 4 layers, 4 per layer
		+ (2 * 4 * 3) // 2d diagonals, 2 per layer, 4 layers, 3 directiosn
		+ 4; // 3d diagonals

	expect(foundGroups.size).toStrictEqual(expectedSize);

	expect(foundGroups).toMatchSnapshot();
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
