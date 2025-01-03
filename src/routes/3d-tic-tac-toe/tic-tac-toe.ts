import {get, writable, type Readable, type Writable} from 'svelte/store';

import {TypedEventTarget} from './typed-event-target.ts';

export const enum Player {
	p1 = 1,
	p2 = 2,
}

export type Cell = {
	readonly index: number;
	readonly content: Readable<undefined | Player>;
};
type InternalCell = {
	readonly index: number;
	readonly content: Writable<undefined | Player>;
};

export type Layer = readonly Cell[];

export type Group = readonly Cell[];

function* getStart(direction: -1 | 0 | 1): Iterable<number> {
	if (direction === 1) {
		yield 0;
	} else if (direction === -1) {
		yield 3;
	} else {
		yield 0;
		yield 1;
		yield 2;
		yield 3;
	}
}

// x is left right
// y is front back
// z is top bottom
export function resolveIndex(x: number, y: number, z: number): number {
	// prettier-ignore
	return x + (y * 4) + (z * 16);
}

function createTurnStore() {
	const {subscribe, update} = writable(Player.p1);

	return {
		subscribe,
		toggle(): void {
			update(player => (player === Player.p1 ? Player.p2 : Player.p1));
		},
	};
}

export class TicTacToe extends TypedEventTarget<{
	win: {
		winner: Player;
		winningGroups: readonly Group[];
	};
}> {
	isFinished = false;
	turn = createTurnStore();

	readonly #cells: readonly InternalCell[] = Array.from(
		{length: 4 ** 3},
		// eslint-disable-next-line unicorn/consistent-function-scoping
		(_v, index) => ({
			index,
			content: writable(),
			_content: undefined,
		}),
	);

	*getGroups(): Iterable<Group> {
		yield* this.getGroupByDir({x: 1});
		yield* this.getGroupByDir({y: 1});
		yield* this.getGroupByDir({z: 1});

		yield* this.get2dDiagonals();
		yield* this.get3dDiagonals();
	}

	getLayers(): readonly Layer[] {
		const layers: Layer[] = [];
		for (let index = 0; index < 4; ++index) {
			layers.push(this.#cells.slice(index * 16, (index + 1) * 16));
		}

		return layers;
	}

	makeMove(index: number): void {
		const cells = [...this.#cells];
		const cell = cells[index];

		if (!cell) {
			throw new Error('Index out of bounds.');
		}

		if (get(cell.content) !== undefined) {
			throw new Error('Cell is already filled.');
		}

		this.#cells[index]!.content.set(get(this.turn));

		this.turn.toggle();

		this.emitOnWinner();
	}

	protected *getGroupByDir(direction: {
		x?: 1 | -1;
		y?: 1 | -1;
		z?: 1 | -1;
	}): Iterable<Group> {
		const directionX = direction.x ?? 0;
		const directionY = direction.y ?? 0;
		const directionZ = direction.z ?? 0;

		if (directionX === 0 && directionY === 0 && directionZ === 0) {
			throw new Error('Expected at least on of directions to be non-null.');
		}

		for (const x of getStart(directionX)) {
			for (const y of getStart(directionY)) {
				for (const z of getStart(directionZ)) {
					const result: Cell[] = [];
					for (let index = 0; index < 4; ++index) {
						result.push(
							this.#cells[
								// prettier-ignore
								resolveIndex(x + (directionX * index), y + (directionY * index), z + (directionZ * index))
							]!,
						);
					}

					yield [...result] as const as Group;
				}
			}
		}
	}

	// There are four diagonals, ignoring direction
	// Always go top to bottom, so z = 1
	protected *get3dDiagonals(): Iterable<Group> {
		const directions = [1, -1] as const;

		for (const x of directions) {
			for (const y of directions) {
				yield* this.getGroupByDir({x, y, z: 1});
			}
		}
	}

	protected *get2dDiagonals(): Iterable<Group> {
		yield* this.getGroupByDir({x: 1, y: 1});
		yield* this.getGroupByDir({x: -1, y: 1});

		yield* this.getGroupByDir({x: 1, z: 1});
		yield* this.getGroupByDir({x: -1, z: 1});
		yield* this.getGroupByDir({y: 1, z: 1});
		yield* this.getGroupByDir({y: -1, z: 1});
	}

	protected isGroupWinning(group: Group): false | Player {
		let lastPlayer: Player | undefined;

		for (const cell of group) {
			const content = get<Player | undefined>(cell.content);

			if (content === undefined) {
				return false;
			}

			if (lastPlayer !== undefined && lastPlayer !== content) {
				return false;
			}

			lastPlayer = content;
		}

		return lastPlayer!;
	}

	protected emitOnWinner(): void {
		if (this.isFinished) {
			throw new Error('Game is already over.');
		}

		const groups: Group[] = [];
		let winningPlayer: Player | undefined;
		for (const group of this.getGroups()) {
			const groupWinner = this.isGroupWinning(group);
			if (groupWinner !== false) {
				if (winningPlayer !== undefined && winningPlayer !== groupWinner) {
					// This should be impossible, because it doesn't get here if `isFinished === true`
					throw new Error('Got two winners.');
				}

				winningPlayer = groupWinner;
				groups.push(group);
			}
		}

		if (winningPlayer === undefined) {
			return;
		}

		this.isFinished = true;

		this.emit('win', {
			winner: winningPlayer,
			winningGroups: groups,
		});
	}
}
