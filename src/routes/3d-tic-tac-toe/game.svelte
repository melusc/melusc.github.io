<script lang="ts">
	import FormatPlayer from './format-player.svelte';
	import Layer from './layer.svelte';
	import Rules from './rules.svelte';
	import {TicTacToe, type Group, type Player} from './tic-tac-toe.ts';

	let game = $state(new TicTacToe());
	let winner = $state<Player>();
	let winningCells = $state(new Set<number>());

	const turn = $derived(game.turn);
	const layers = $derived(game.getLayers());

	function onMove(choice: number): void {
		if (!game.isFinished) {
			game.makeMove(choice);
		}
	}

	function setWinningCells(groups: readonly Group[]): void {
		const cells = new Set<number>();

		for (const group of groups) {
			for (const cell of group) {
				cells.add(cell.index);
			}
		}

		winningCells = cells;
	}

	function onWin(
		event: CustomEvent<{
			winner: Player;
			winningGroups: readonly Group[];
		}>,
	): void {
		winner = event.detail.winner;
		setWinningCells(event.detail.winningGroups);
	}

	function newGame(): void {
		game.off('win', onWin);
		game = new TicTacToe();
		winner = undefined;
		winningCells = new Set();
	}

	$effect(() => {
		game.on('win', onWin);
	});
</script>

<div class="title-rules">
	<h1>3d Tic Tac Toe</h1>
	<Rules />
</div>
<div
	class:win-info={winner !== undefined}
	class:turn-info={winner === undefined}
	class="player-info"
>
	<div class="play-state">
		{#if winner !== undefined}
			<FormatPlayer player={winner} /> has won!
		{:else}
			<FormatPlayer player={$turn} />&rsquo;s turn
		{/if}
	</div>
	<button onclick={newGame}>New Game</button>
</div>
<div class="board">
	{#each layers as layer, index (index)}
		<Layer {layer} {winningCells} onchoice={onMove} />
	{/each}
</div>

<style lang="scss">
	.board {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 80%;
		width: 80%;
		max-width: 100vh;
	}

	.play-state {
		font-size: 1.1em;
	}

	h1 {
		margin: 0;
		font-size: 1.5em;
	}

	.title-rules {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 0.5em;
		gap: 1ch;
	}

	.player-info {
		display: flex;
		font-size: 1.1em;
		flex-direction: column;
		justify-content: center;
		flex-direction: column-reverse;
		align-items: center;
		margin-bottom: 1em;

		button {
			background: none;
			outline: none;
			border: none;
			font: inherit;
			color: inherit;
			border: 2px solid var(--text);
			border-radius: 10px;
			cursor: pointer;
			margin-top: 5px;
			padding: 0 10px;
			transition: transform ease-in-out 100ms;

			&:active {
				/* Taking too long makes it seem laggy */
				transition-duration: 20ms;
				transform: scale(0.95);
			}
		}
	}

	@media (min-width: 600px) {
		.player-info {
			gap: 3em;
			flex-direction: row;

			button: {
				margin-top: 0;
			}
		}
	}
</style>
