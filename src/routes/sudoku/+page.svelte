<script lang="ts">
	import {Sudoku} from '@lusc/sudoku';

	import Cell from './components/cell.svelte';
	import KeyboardlessInput from './components/keyboardless-input.svelte';
	import * as sudokuExamples from './sudoku-examples.ts';
	import {getNewFocused, type MetaKeys} from './util.ts';
	import './style.scss';
	import {makeSudokuState} from './sudoku-state';

	const sudokuState = makeSudokuState(
		Sudoku.fromPrefilled(sudokuExamples.sudokuExpert, 9),
	);
	const {cells, focused, error} = $derived($sudokuState);

	function handleInput(key: string, metaKeys: MetaKeys = {}): void {
		if (metaKeys.alt) {
			return;
		}

		key = key.toLowerCase();

		if (key === ' ' || key === 'delete' || key === 'backspace') {
			sudokuState.clearCell();
		}

		if (!metaKeys.ctrl && /^[1-9]$/.test(key)) {
			sudokuState.setElement(key);
		}

		sudokuState.setFocus(getNewFocused(key, focused, metaKeys));
	}

	function clearSudoku(): void {
		sudokuState.clearCell();
	}

	function solve(): void {
		sudokuState.solve();
	}

	function onFocus(index: number): () => void {
		return (): void => {
			sudokuState.setFocus(index);
		};
	}
</script>

<svelte:head>
	<title>Sudoku solver</title>
</svelte:head>

<div id="sudoku">
	<div class="sudoku">
		{#each cells as {element, key, isValid}, index (`${key},${focused === index}`)}
			<Cell
				{element}
				{isValid}
				isFocused={focused === index}
				onfocus={onFocus(index)}
				oninput={handleInput}
			/>
		{/each}
	</div>
	{#if typeof error !== 'undefined'}<div class="error">{error}</div>{/if}
	<button type="button" title="Solve sudoku" class="solve" onclick={solve}>
		Solve
	</button>
	<button
		type="button"
		title="Clear sudoku"
		class="clear"
		onclick={clearSudoku}
	>
		Clear
	</button>
	<KeyboardlessInput oninput={handleInput} />
</div>

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

		transition:
			var(--transition-properties) transform,
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
