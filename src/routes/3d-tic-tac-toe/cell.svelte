<script lang="ts">
	import {createEventDispatcher} from 'svelte';

	import {Player, type Cell as CellType} from './tic-tac-toe.ts';
	import X from './icons/x.svelte';
	import O from './icons/o.svelte';

	const dispatch = createEventDispatcher<{
		choice: number;
	}>();

	export let cell: CellType;
	export let animationDelays: Map<number, number>;

	$: content = cell.content;
	$: index = cell.index;

	$: console.log($content);

	function onClick(): void {
		if ($content === undefined) {
			dispatch('choice', index);
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
	on:keydown={onKeydown}
	on:click={onClick}
	class="cell"
	class:p1={$content === Player.p1}
	class:p2={$content === Player.p2}
	class:isWinning={animationDelays.has(index)}
	style:--delay={`${400 * (animationDelays.get(index) ?? 0)}ms`}
	role="button"
>
	{#if $content === Player.p1}
		<X/>
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
	}

	.p1 {
		background: var(--blue);
	}
	.p2 {
		background: var(--red);
	}

	.cell:focus-visible {
		outline: 4px dotted var(--border);
	}

	.isWinning {
		animation: winning-green 100ms ease-in-out var(--delay) forwards;
	}

	.cell :global(svg) {
		height: 1em;
		width: 1em;
	}

	@keyframes winning-green {
		0% {}

		100% {
			background-color: var(--green);
		}
	}
</style>
