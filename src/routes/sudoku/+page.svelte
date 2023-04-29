<script lang="ts">
	import {Sudoku, type SubscriptionCallback} from '@lusc/sudoku';

	import Cell from './components/cell.svelte';
	import KeyboardlessInput from './components/keyboardless-input.svelte';
	import * as sudokuExamples from './sudoku-examples';
	import {getCells, getNewFocused, type MetaKeys} from './util';
	import './style.scss';

	import {browser} from '$app/environment';

	let sudoku = Sudoku.fromPrefilled(sudokuExamples.sudokuExpert, 9);
	$: cells = getCells(sudoku);
	let error: undefined | string;
	let focused = 0;

	$: {
		// Unfortunately I haven't found a way to easily cleanup
		// when sudoku changes
		// but `sudoku` shouldn't change often anyway, sometimes never
		sudoku.subscribe(sudokuHandler);
	}

	const sudokuHandler: SubscriptionCallback = async (
		sudoku_,
		type,
	): Promise<void> => {
		sudoku = sudoku_;

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

			default:
			// Do nothing
			// Shouldn't be reachable
		}
	};

	function handleKeyDown(event_: KeyboardEvent): void {
		if (event_.key.toLowerCase() === 'tab') {
			// Otherwise it starts going around and focusing the buttons, the tab, the url bar
			event_.preventDefault();
		}

		handleInput(event_.key, {
			shift: event_.shiftKey,
			ctrl: event_.ctrlKey,
			alt: event_.altKey,
		});
	}

	function handleInput(key: string, metaKeys: MetaKeys = {}): void {
		if (metaKeys.alt) {
			return;
		}

		key = key.toLowerCase();

		if (key === ' ' || key === 'delete' || key === 'backspace') {
			sudoku.clearCell(focused);
			return;
		}

		if (!metaKeys.ctrl && /^[1-9]$/.test(key)) {
			sudoku.setElement(focused, key);
		}

		focused = getNewFocused(key, focused, metaKeys);
	}

	function clearSudoku(): void {
		sudoku.clearAllCells();
	}

	function solve(): void {
		sudoku.solve();
	}

	function onFocus(index: number): () => void {
		return (): void => {
			focused = index;
		};
	}

	function onKeyboardlessInput(event: {detail: string}): void {
		handleInput(event.detail);
	}

	if (browser) {
		Object.assign(window, {
			fromString(input: string) {
				sudoku = Sudoku.fromString(input, 9);
				focused = 0;
				error = undefined;
			},
		});
	}
</script>

<svelte:window on:keydown={handleKeyDown} />
<svelte:head>
	<title>Sudoku solver</title>
</svelte:head>

<div class="sudoku">
	{#each cells as {element, key, isValid}, index (key)}
		<Cell
			{element}
			{isValid}
			isFocused={focused === index}
			on:focus={onFocus(index)}
		/>
	{/each}
</div>
{#if typeof error !== 'undefined'}<div class="error">{error}</div>{/if}
<button type="button" title="Solve sudoku" class="solve" on:click={solve}>
	Solve
</button>
<button type="button" title="Clear sudoku" class="clear" on:click={clearSudoku}>
	Clear
</button>
<KeyboardlessInput on:input={onKeyboardlessInput} />

<style lang="scss">
	.sudoku {
		grid-area: sudoku;

		display: grid;
		grid-template: repeat(9, 1fr) / repeat(9, 1fr);

		width: 80vmin;
		min-height: 80vmin;

		border: var(--thick-border);
		border-width: 1px;
		border-radius: 2px;
	}

	.error {
		margin-top: 0.3em;
		text-align: center;

		grid-area: error;
		justify-self: center;
		margin-left: 5px;

		font-size: 0.9em;

		color: var(--invalid);

		cursor: text;
		user-select: text;
	}

	.solve {
		border: 2px solid var(--info);
		color: var(--info);

		grid-area: solve;

		&:hover {
			color: var(--white);
			background-color: var(--info);
		}
	}

	.clear {
		border: 2px solid var(--invalid);
		color: var(--invalid);

		grid-area: clear;

		&:hover {
			color: var(--white);
			background-color: var(--invalid);
		}
	}

	.solve,
	.clear {
		font: inherit;

		border-radius: 5px;
		background: none;
		margin-top: 10px;
		width: 100%;
		outline: none;

		cursor: pointer;

		transition: var(--transition-properties) transform,
			var(--transition-properties) background-color,
			var(--transition-properties) color;

		&:active {
			transform: scale(0.98, 0.98);
		}
	}

	@media (max-width: 600px) {
		.clear,
		.solve {
			font-size: 30px;
		}
	}
</style>
