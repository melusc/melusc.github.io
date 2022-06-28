import React from 'react';
import ReactDOM from 'react-dom';
import {
	type SubscriptionCallback,
	Sudoku,
	type ReadonlyCells,
} from '@lusc/sudoku';
import clsx from 'clsx';

import * as sudokuExamples from './sudoku-examples';

interface AppState {
	cells: ReadonlyCells;
	error: undefined | string;
	focused: number;
}

const SvgEraser: React.FC = () => (
	<svg
		width='16'
		height='16'
		fill='currentColor'
		className='svg-eraser-fill'
		viewBox='0 0 16 16'
	>
		<path d='M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z' />
	</svg>
);

class App extends React.Component<Record<string, unknown>, AppState> {
	#sudoku = Sudoku.fromPrefilled(sudokuExamples.sudokuExpert, 9);

	override state: AppState = {
		cells: this.#sudoku.getCells(),
		error: undefined,
		focused: 0,
	};

	override componentDidMount(): void {
		document.addEventListener('keydown', this.handleKeyDown);
		this.#sudoku.subscribe(this.sudokuCallback);
	}

	override componentWillUnmount(): void {
		document.removeEventListener('keydown', this.handleKeyDown);
		this.#sudoku.unsubscribe(this.sudokuCallback);
	}

	sudokuCallback: SubscriptionCallback = async (sudoku, type) => {
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
		const sudoku = this.#sudoku;

		return (
			<div className='App'>
				<div className='sudoku'>
					{cells.map((cell, index) => (
						<div
							key={cell.index}
							className={clsx('cell', {
								'invalid-input': !sudoku.isCellValid(cell),
								'focused-cell': focused === index,
							})}
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
							{sudoku.getElement(cell)}
						</div>
					))}
				</div>
				{typeof error !== 'undefined' && <div className='error'>{error}</div>}
				<button
					type='button'
					title='Solve sudoku'
					className='solve'
					onClick={this.solve}
				>
					Solve
				</button>
				<button
					type='button'
					title='Clear sudoku'
					className='clear'
					onClick={this.clear}
				>
					Clear
				</button>
				<div className='keyboardless-inputs'>
					{Array.from({length: 9}, (_v, index) => (
						<div
							key={index}
							className='keyboardless-input'
							title={`${index + 1}`}
							onClick={this.handleKeyboardlessClick(`${index + 1}`)}
						>
							{index + 1}
						</div>
					))}
					<div
						className='keyboardless-input input-eraser'
						title='Clear cell'
						onClick={this.handleKeyboardlessClick(' ')}
					>
						<SvgEraser />
					</div>
				</div>
			</div>
		);
	}

	solve = (): void => {
		this.#sudoku.solve();
	};

	clear = (): void => {
		this.#sudoku.clearAllCells();
	};

	handleCellClick = (index: number) => (): void => {
		this.setState({
			focused: index,
		});
	};

	handleKeyDown = (event_: KeyboardEvent): void => {
		if (event_.key.toLowerCase() === 'tab') {
			// Otherwise it starts going around and focusing the buttons, the tab, the url bar
			event_.preventDefault();
		}

		this.handleInput(event_.key, {
			shift: event_.shiftKey,
			ctrl: event_.ctrlKey,
		});
	};

	handleInput = (
		key: string,
		{
			shift,
			ctrl,
		}: {
			shift?: boolean;
			ctrl?: boolean;
		} = {},
	): void => {
		key = key.toLowerCase();
		shift ??= false;
		ctrl ??= false;

		this.setState((state: AppState): Pick<AppState, 'focused'> => {
			let focused = state.focused;

			switch (key) {
				case 'arrowdown':
				case 'arrowup': {
					// Always wrap around to the *same* column

					const direction = key === 'arrowdown' ? 9 : -9;

					focused = (state.focused + direction + 81) % 81;

					break;
				}

				case 'arrowright':
				case 'arrowleft': {
					// Always wrap around to the *same* row

					const direction = key === 'arrowright' ? 1 : -1;

					const col = (state.focused % 9) + direction;

					if (col < 0) {
						focused += 8;
					} else if (col > 8) {
						focused -= 8;
					} else {
						focused += direction;
					}

					break;
				}

				case ' ': {
					// Clear cell but also go to next cell

					this.#sudoku.clearCell(state.focused);

					focused = (state.focused + 1) % 81;

					break;
				}

				case 'tab': {
					// If shift, go backwards
					const direction = shift ? -1 : 1;

					focused = (state.focused + direction + 81) % 81;
					break;
				}

				case 'delete': {
					// Clear cell without changing focused cell

					this.#sudoku.clearCell(state.focused);

					break;
				}

				case 'backspace': {
					// Clear cell and change focused cell

					this.#sudoku.clearCell(state.focused);

					// Back one step, wrap around to last cell
					focused = (state.focused + 80) % 81;
					break;
				}

				default: {
					// Ctrl + 1 takes you to the first tab so ignore those
					if (!ctrl && /^[1-9]$/.test(key)) {
						this.#sudoku.setElement(state.focused, key);

						focused = (state.focused + 1) % 81;
					}
				}
			}

			return {focused};
		});
	};

	handleKeyboardlessClick = (number: string) => (): void => {
		this.handleInput(number);
	};
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.querySelector('#App'),
);
