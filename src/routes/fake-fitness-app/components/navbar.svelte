<script lang="ts">
	import AngleLeft from './icons/angle-left.svelte';
	import DotsVertical from './icons/dots-vertical.svelte';
</script>

<div class="navbar">
	<AngleLeft class="navbar-angle-left" />
	<span>Running</span>
	<DotsVertical class="navbar-dots-vertical" />
</div>

<style>
	.navbar {
		color: var(--text-white);

		display: grid;
		align-items: center;

		margin: 0 6.5%;

		grid-template-columns: auto repeat(3, 1fr);
	}

	.navbar :global(svg) {
		height: 1.5em;
	}

	.navbar :global(.navbar-angle-left) {
		justify-self: start;

		margin-right: 1em;
	}

	.navbar :global(.navbar-dots-vertical) {
		grid-column: 4 / 5;

		justify-self: end;
	}
</style>
