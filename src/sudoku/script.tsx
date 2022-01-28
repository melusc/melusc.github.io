import React from 'react';
import ReactDOM from 'react-dom';
import {produce} from 'immer';
import {
	type SubscriptionCallback,
	Sudoku,
	type ReadonlyCells,
} from '@lusc/sudoku';

import * as sudokuExamples from './sudoku-examples';

interface AppState {
	cells: ReadonlyCells;
	error: undefined | string;
	focused: number;
}

const SvgEraser: React.FC = () => (
	<svg
		width="16"
		height="16"
		fill="currentColor"
		className="svg-eraser-fill"
		viewBox="0 0 16 16"
	>
		<path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
	</svg>
);

class App extends React.Component<Record<string, unknown>, AppState> {
	#sudokuClass = Sudoku.fromPrefilled(sudokuExamples.sudokuExpert, 9);

	override state: AppState = {
		cells: this.#sudokuClass.getCells(),
		error: undefined,
		focused: 0,
	};

	override componentDidMount(): void {
		document.addEventListener('keydown', this.handleKeyDown);
		this.#sudokuClass.subscribe(this.sudokuCallback);
	}

	override componentWillUnmount(): void {
		document.removeEventListener('keydown', this.handleKeyDown);
		this.#sudokuClass.unsubscribe(this.sudokuCallback);
	}

	sudokuCallback: SubscriptionCallback = (sudoku, type) => {
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
					error: 'Sudoku is invalid!',
				});

				break;
			}

			default: {
				// Do nothing
				// Shouldn't be reachable
			}
		}
	};

	override render(): JSX.Element {
		const {cells, error, focused} = this.state;

		return (
			<div className="App">
				<div className="sudoku">
					{cells.map(({content, key, valid}, index) => (
						<div
							key={key}
							className={`cell${valid ? '' : ' invalid-input'}${
								focused === index ? ' focused-cell' : ''
							}`}
							data-index={index}
							onMouseDown={this.handleCellClick(index)}
							onTouchStart={(event_): void => {
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
				{typeof error !== 'undefined' && <div className="error">{error}</div>}
				<button
					type="button"
					title="Solve sudoku"
					className="solve"
					onClick={this.solve}
				>
					Solve
				</button>
				<button
					type="button"
					title="Clear sudoku"
					className="clear"
					onClick={this.clear}
				>
					Clear
				</button>
				<div className="keyboardless-inputs">
					{Array.from({length: 9}, (_v, index) => (
						<div
							key={index}
							className="keyboardless-input"
							title={`${index + 1}`}
							onClick={this.handleKeyboardlessClick(`${index + 1}`)}
						>
							{index + 1}
						</div>
					))}
					<div
						className="keyboardless-input input-eraser"
						title="Clear cell"
						onClick={this.handleKeyboardlessClick(' ')}
					>
						<SvgEraser />
					</div>
				</div>
			</div>
		);
	}

	solve = (): void => {
		this.#sudokuClass.solve();
	};

	clear = (): void => {
		this.#sudokuClass.clearAllCells();
	};

	handleCellClick = (index: number) => (): void => {
		this.setState({
			focused: index,
		});
	};

	handleKeyDown = (event_: KeyboardEvent): void => {
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

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.body,
);
