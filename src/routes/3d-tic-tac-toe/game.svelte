<script lang="ts">
	import Layer from './layer.svelte';
	import {TicTacToe, type Group, type Player} from './tic-tac-toe.ts';
	import PlayerColor from './player-color.svelte';

	let game = new TicTacToe();
	let winner: undefined | Player;
	let animationDelays = new Map<number, number>();

	$: turn = game.turn;
	$: layers = game.getLayers();

	$: console.log($turn);
	$: console.log(layers);
	$: console.log(game);

	function onMove(event: CustomEvent<number>): void {
		if (!game.isFinished) {
			game.makeMove(event.detail);
		}
	}

	function setAnimationDelays(groups: readonly Group[]): void {
		let delay = 0;

		const delays = new Map<number, number>();

		for (const group of groups) {
			for (const cell of group) {
				if (!delays.has(cell.index)) {
					delays.set(cell.index, delay);
					++delay;
				}
			}
		}

		animationDelays = delays;
	}

	function onWin(event: CustomEvent<{
		winner: Player;
		winningGroups: readonly Group[];
	}>): void {
		winner = event.detail.winner;
		setAnimationDelays(event.detail.winningGroups);
	}

	function newGame(): void {
		game = new TicTacToe();
		winner = undefined;
		game.off('win', onWin);
		animationDelays = new Map();
	}

	$: game.on('win', onWin);

</script>

<h1>3d Tic Tac Toe</h1>
<div class:win-info={winner !== undefined} class:turn-info={winner === undefined} class="player-info">
	{#if winner !== undefined}
		<div>
			<PlayerColor player={winner} /> has won!
		</div>
	{:else}
		<div>
			<PlayerColor player={$turn} />&rsquo;s turn
		</div>
	{/if}
	<button on:click={newGame}>New Game</button>
</div>
<div class="board">
	{#each layers as layer, i (i)}
		<Layer {layer} {animationDelays} on:choice={onMove} />
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

	h1 {
		margin: 0;
		font-size: 1.5em;
		margin-bottom: 0.5em;
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
				// Taking too long makes it seem laggy
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
