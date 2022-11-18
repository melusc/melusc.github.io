import {Sudoku, type SubscriptionCallback} from '@lusc/sudoku';
import React from 'react';
import {createRoot} from 'react-dom/client.js';

import {Cell} from './components/cell';
import {KeyboardlessInput} from './components/keyboardless-input';
import * as sudokuExamples from './sudoku-examples';

type StateCell = {
	element: string | undefined;
	isValid: boolean;
	key: number;
};

const toStateCells = (s: Sudoku): readonly StateCell[] => {
	const result: StateCell[] = [];

	for (const cell of s.getCells()) {
		result.push({
			element: s.getElement(cell),
			isValid: s.isCellValid(cell),
			key: cell.index,
		});
	}

	return result;
};

type MetaKeys = {
	ctrl?: boolean;
	alt?: boolean;
	shift?: boolean;
};

const getNewFocused = (
	key: string,
	focused: number,
	{shift, ctrl}: MetaKeys,
): number => {
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
};

const handleSudokuInput = (
	sudoku: Sudoku,
	key: string,
	focused: number,
	{ctrl}: MetaKeys,
): void => {
	key = key.toLowerCase();

	if (key === ' ' || key === 'delete' || key === 'backspace') {
		sudoku.clearCell(focused);
		return;
	}

	if (!ctrl && /^[1-9]$/.test(key)) {
		sudoku.setElement(focused, key);
	}
};

type AppState = {
	cells: readonly StateCell[];
	error: undefined | string;
	focused: number;
};

class App extends React.Component<Record<string, unknown>, AppState> {
	#sudoku = Sudoku.fromPrefilled(sudokuExamples.sudokuExpert, 9);

	override state: AppState = {
		cells: toStateCells(this.#sudoku),
		error: undefined,
		focused: 0,
	};

	override componentDidMount(): void {
		Object.assign(window, {
			fromString: this.fromString,
		});
		this.init();
	}

	override componentWillUnmount(): void {
		this.clean();
	}

	init(): void {
		document.addEventListener('keydown', this.handleKeyDown);
		this.#sudoku.subscribe(this.sudokuCallback);
	}

	clean(): void {
		document.removeEventListener('keydown', this.handleKeyDown);
		this.#sudoku.unsubscribe(this.sudokuCallback);
	}

	sudokuCallback: SubscriptionCallback = async (sudoku, type) => {
		switch (type) {
			case 'change': {
				this.setState({
					cells: toStateCells(sudoku),
					error: undefined,
				});

				break;
			}

			case 'finish': {
				const isSolved = sudoku.isSolved();

				this.setState({
					cells: toStateCells(sudoku),
					error: isSolved ? undefined : "Sudoku wasn't solved completely.",
				});

				break;
			}

			case 'error': {
				this.setState({
					cells: toStateCells(sudoku),
					error: 'Sudoku is invalid!',
				});

				break;
			}

			default:
			// Do nothing
			// Shouldn't be reachable
		}
	};

	override render(): JSX.Element {
		const {cells, error, focused} = this.state;

		return (
			<div className='App'>
				<div className='sudoku'>
					{cells.map(({element, key, isValid}, index) => (
						<Cell
							key={key}
							element={element}
							isValid={isValid}
							isFocused={focused === index}
							onClick={this.handleCellClick(index)}
						/>
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
				<KeyboardlessInput onClick={this.handleInput} />
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
			alt: event_.altKey,
		});
	};

	handleInput = (key: string, metaKeys: MetaKeys = {}): void => {
		if (metaKeys.alt) {
			return;
		}

		handleSudokuInput(this.#sudoku, key, this.state.focused, metaKeys);

		this.setState(
			(state: AppState): Pick<AppState, 'focused'> => ({
				focused: getNewFocused(key, state.focused, metaKeys),
			}),
		);
	};

	fromString = (input: string): void => {
		this.clean();
		const s = Sudoku.fromString(input, 9);
		this.#sudoku = s;
		this.init();
		this.setState({
			focused: 0,
			cells: toStateCells(s),
		});
	};
}

const container = document.querySelector('#App');

if (container) {
	const root = createRoot(container);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
}
