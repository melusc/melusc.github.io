<script lang="ts">
	import {Player, type Cell as CellType} from './tic-tac-toe.ts';
	import X from './icons/x.svelte';
	import O from './icons/o.svelte';

	const {
		cell,
		winningCells,
		onchoice,
	}: {
		cell: CellType;
		winningCells: Set<number>;
		onchoice: (choice: number) => void;
	} = $props();

	const content = $derived(cell.content);
	const index = $derived(cell.index);

	function onClick(): void {
		if ($content === undefined) {
			onchoice(index);
		}
	}

	function onKeydown(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			onClick();
		}
	}
</script>

<div
	tabindex={0}
	onkeydown={onKeydown}
	onclick={onClick}
	class="cell"
	class:p1={$content === Player.p1}
	class:p2={$content === Player.p2}
	class:winning={winningCells.has(index)}
	role="button"
>
	{#if $content === Player.p1}
		<X />
	{:else if $content === Player.p2}
		<O />
	{:else}
		&nbsp;
	{/if}
</div>

<style lang="scss">
	.cell {
		border: 1px solid var(--border);
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		user-select: none;
		background-color: var(--background);
	}

	.p1 {
		--background: var(--blue);
	}
	.p2 {
		--background: var(--red);
	}

	.cell:focus-visible {
		outline: 4px dotted var(--border);
	}

	.winning {
		animation-name: winning-green;
		animation-delay: 300ms;
		animation-duration: 500ms;
		animation-timing-function: ease-out;
		animation-direction: alternate;
		animation-iteration-count: infinite;
	}

	.cell :global(svg) {
		height: 1em;
		width: 1em;
	}

	@keyframes winning-green {
		0% {
		}

		100% {
			background-color: transparent;
		}
	}
</style>
