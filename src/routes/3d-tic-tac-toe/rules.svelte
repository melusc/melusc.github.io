<script lang="ts">
	import CircleQuestion from './icons/circle-question.svelte';
</script>

<div class="rules">
	<span class="icon">
		<CircleQuestion />
	</span>

	<div class="tooltip">
		<h2>Rules</h2>
		<p>
			Whoever can place four markers in one row, column, vertical, or diagonal
			first wins.
		</p>
		<p>Players take turns placing markers.</p>
	</div>
</div>

<style>
	.icon :global(svg) {
		width: 1em;
		height: 1em;
	}

	.tooltip {
		position: absolute;
		left: 0;
		right: 0;
		visibility: hidden;
		margin: 0 auto;
		margin-top: 0.5em;
		max-width: 80%;

		background: var(--card);
		z-index: 2;
		padding: 0.5em 1em;
		border-radius: 10px;
		border: 1px solid var(--border);
		box-shadow: 0px 7px 8px -3px rgba(255, 255, 255, 0.1);
	}

	h2 {
		margin-top: 0;
	}

	.icon:hover ~ .tooltip,
	.icon:focus ~ .tooltip {
		visibility: visible;
	}
</style>
