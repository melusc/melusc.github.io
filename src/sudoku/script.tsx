// eslint-disable-next-line import/no-unassigned-import
import 'preact/devtools';

import {render, h, Component} from 'preact';
import {produce} from 'immer';

import {Sudoku} from './sudoku';
import type {Cells} from './sudoku.d';

interface AppState {
	cells: Cells;
	error: undefined | string;
	focused: number;
}

const SvgEraser = () => (
	<svg
		width="16"
		height="16"
		fill="currentColor"
		class="svg-eraser-fill"
		viewBox="0 0 16 16"
	>
		<path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
	</svg>
);

const _ = undefined; // Looks better, than loads of `undefined`

const sudokus = {
	easy: [
		[5, _, 3, _, 9, 4],
		[_, 9, _, _, 3, 6, 2, 5, 8],
		[_, _, _, _, _, _, 3],
		[_, _, 8, 9, 5, _, 6, 7],
		[],
		[_, 7, 2, _, 6, 1, 4],
		[_, _, 4],
		[6, 5, 9, 8, 2, _, _, 1],
		[_, _, _, 1, 4, _, 5, _, 6],
	],
	evil: [
		[6, _, 4, _, _, _, _, _, 3],
		[_, _, _, _, 3, 7, 8],
		[_, _, _, 5, _, _, 7],
		[8, 9, _, 1],
		[3, _, _, _, _, _, _, _, 2],
		[_, _, _, _, _, 3, _, 1, 9],
		[_, _, 5, _, _, 9],
		[_, _, 1, 8, 6],
		[9, _, _, _, _, _, 4, _, 8],
	],
	expert: [
		[_, _, _, _, _, 4, _, _, 2],
		[_, 6, _, 2, _, _, _, 3],
		[_, 8, _, _, _, 3, 5, _, 9],
		[_, 4, _, _, _, _, 1],
		[1, _, _, 7, _, 5],
		[5, _, 3],
		[_, 9, _, 3],
		[_, _, 4, _, 6, 1],
		[_, _, 5, _, _, _, 7],
	],
	invalid1: [
		// Here both 5 and 6 would have to be in the middle/middle cell
		// which is not possible, since only one number can be in each cell
		[],
		[_, _, _, 6],
		[_, _, _, 5],
		[_, _, _, _, _, _, 5, 6],
		[],
		[_, 6, 5],
		[_, _, _, _, _, 5],
		[_, _, _, _, _, 6],
	],
	invalid2: [
		// Here 1,2,3 have to be in the third column of the middle/middle block
		// And 4,5,6 have to be in the first row of the middle/middle block
		// Since those two overlap this is an invalid sudoku
		[_, _, _, _, 1],
		[_, _, _, _, 2],
		[_, _, _, _, 3],
		[],
		[4, 5, 6],
		[_, _, _, _, _, _, 4, 5, 6],
		[_, _, _, 1],
		[_, _, _, 2],
		[_, _, _, 3],
	],
} as const;

class App extends Component<Record<string, unknown>, AppState> {
	#sudokuClass = new Sudoku(sudokus.expert);

	state: AppState = {
		cells: this.#sudokuClass.getCells(),
		error: undefined,
		focused: 0,
	};

	constructor(...a: Array<Record<string, unknown>>) {
		super(...a);

		this.#sudokuClass.subscribe((sudoku, type) => {
			switch (type) {
				case 'change': {
					this.setState({
						cells: sudoku.getCells(),
						error: undefined,
					});

					break;
				}

				case 'finish': {
					const isSolved = sudoku.isSolved();

					this.setState({
						cells: sudoku.getCells(),
						error: isSolved ? undefined : "Sudoku wasn't solved completely.",
					});

					break;
				}

				case 'error': {
					this.setState({
						error: 'Sudoku is invalid',
					});

					break;
				}

				default: {
					// Do nothing
					// Shouldn't be reachable
				}
			}
		});
	}

	componentDidMount = () => {
		document.addEventListener('keydown', this.handleKeyDown);
	};

	componentWillUnmount = () => {
		document.removeEventListener('keydown', this.handleKeyDown);
	};

	render = () => {
		const {cells, error, focused} = this.state;

		return (
			<div class="App">
				<div class="sudoku">
					{cells.map(({content, key, valid}, index) => (
						<div
							key={key}
							class={`cell${valid ? '' : ' invalid-input'}${
								focused === index ? ' focused-cell' : ''
							}`}
							data-index={index}
							onMouseDown={this.handleCellClick(index)}
							onTouchStart={event_ => {
								// If this fires preventDefault because otherwise onMouseDown will fire a bit later
								// and cause some flickering if onTouchStart, onTouchStart, onMouseDown, onMouseDown (in that order) fires
								// if the user switches between cells too quickly
								event_.preventDefault();
								this.handleCellClick(index)();
							}}
						>
							{content}
						</div>
					))}
				</div>
				{typeof error !== undefined && <div class="error">{error}</div>}
				<button
					type="button"
					title="Solve sudoku"
					class="solve"
					onClick={this.solve}
				>
					Solve
				</button>
				<button
					type="button"
					title="Clear sudoku"
					class="clear"
					onClick={this.clear}
				>
					Clear
				</button>
				<div class="keyboardless-inputs">
					{Array.from({length: 9}, (_v, index) => (
						<div
							key={index}
							class="keyboardless-input"
							title={`${index + 1}`}
							onClick={this.handleKeyboardlessClick(`${index + 1}`)}
						>
							{index + 1}
						</div>
					))}
					<div
						class="keyboardless-input input-eraser"
						title="Clear cell"
						onClick={this.handleKeyboardlessClick(' ')}
					>
						<SvgEraser />
					</div>
				</div>
			</div>
		);
	};

	solve = () => {
		this.#sudokuClass.solve();
	};

	clear = () => {
		this.#sudokuClass.clearAllCells();
	};

	handleCellClick = (index: number) => (): void => {
		this.setState({
			focused: index,
		});
	};

	handleKeyDown = (event_: KeyboardEvent) => {
		this.setState(
			produce((state: AppState): void => {
				const key = event_.key.toLowerCase();

				switch (key) {
					case 'arrowdown':
					case 'arrowup': {
						// Wrapping around seems better

						const direction = key === 'arrowdown' ? 9 : -9;
						let newFocused = state.focused + direction;

						if (newFocused < 0) {
							newFocused += 81;
						} else if (newFocused > 80) {
							newFocused -= 81;
						}

						state.focused = newFocused;

						break;
					}

					case 'arrowright':
					case 'arrowleft': {
						const direction = key === 'arrowright' ? 1 : -1;

						const col = (state.focused % 9) + direction;

						if (col < 0) {
							state.focused += 8;
						} else if (col > 8) {
							state.focused -= 8;
						} else {
							state.focused += direction;
						}

						break;
					}

					case ' ': {
						// Space

						this.#sudokuClass.clearCell(state.focused);

						state.focused = (state.focused + 1) % 81;

						break;
					}

					case 'tab': {
						event_.preventDefault();

						const {shiftKey} = event_;

						const direction = shiftKey ? -1 : 1;

						state.focused = (state.focused + direction + 81) % 81;
						break;
					}

					case 'delete':
					case 'backspace': {
						this.#sudokuClass.clearCell(state.focused);

						break;
					}

					default: {
						if (/^[1-9]$/.test(key)) {
							this.#sudokuClass.setContent(state.focused, key);

							state.focused = (state.focused + 1) % 81;
						}
					}
				}
			}),
		);
	};

	handleKeyboardlessClick = (number: string) => (): void => {
		if (number === ' ') {
			this.#sudokuClass.clearCell(this.state.focused);
		} else {
			this.#sudokuClass.setContent(this.state.focused, number);

			this.setState(
				produce((state: AppState) => {
					state.focused = (state.focused + 1) % 81;
				}),
			);
		}
	};
}

render(<App />, document.body);
