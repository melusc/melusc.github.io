<script>
	import Game from './game.svelte';
</script>

<svelte:head>
	<title>3D Tic Tac Toe</title>
</svelte:head>

<div class="App">
	<Game />
</div>

<style>
	.App {
		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 1em;

		height: 100vh;
		width: 100vw;

		font-size: 1.4em;
	}
</style>
