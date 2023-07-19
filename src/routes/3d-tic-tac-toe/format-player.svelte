<script lang="ts">
	import {Player} from './tic-tac-toe.ts';

	export let player: Player;
</script>

<span class:p1={player === Player.p1} class:p2={player === Player.p2}
	>{player === Player.p1 ? 'Player 1' : 'Player 2'}</span
>

<style>
	.p1 {
		color: var(--blue);
	}

	.p2 {
		color: var(--red);
	}
</style>
