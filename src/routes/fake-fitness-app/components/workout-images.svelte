<script lang="ts">
	import Photo from './icons/photo.svelte';
</script>

<div class="workout-images">
	<div class="workout-images-title">Images</div>
	<Photo class="workout-image-preview" />
</div>

<style>
	.workout-images {
		background-color: var(--card-background);
		color: var(--text-white);
		border-radius: var(--card-border-radius);

		display: grid;
		grid-template-columns: 1fr auto 1fr;
		grid-template-rows: 1fr auto 1fr;

		margin-top: 2.8vmin;
		padding: 2.5vmin 3.4vmin;
	}

	.workout-images :global(.workout-image-preview) {
		align-self: center;
		justify-self: center;
		grid-area: 2 / 2 / 3 / 3;

		background-color: var(--photo-icon-background);
		border-radius: 50%;
		margin-top: 1em;

		--height: 1.5em;

		width: var(--height);
		height: var(--height);
		padding: calc(var(--height) * 0.5);
	}
</style>
