<script lang="ts">
	import {onMount} from 'svelte';

	import type {Project} from '../project.d.ts';
	import projects_ from '../projects.json';

	import SingleProject from './single-project.svelte';

	const projects = projects_ as readonly Project[];

	onMount(() => {
		if (location.hash) {
			try {
				document.querySelector(location.hash)?.scrollIntoView();
			} catch (error: unknown) {
				console.error(error);
			}
		}
	});
</script>

<main>
	<div class="projects">
		{#each projects as project (project.key)}
			<SingleProject {project} />
		{/each}
	</div>
</main>

<style lang="scss">
	@use 'sass:color';
	@import '../../../common/theme.scss';

	main {
		display: flex !important;
		justify-content: center;
		/* Margin would seem more appropriate but on mobile the background color doesn't apply to that section */
		padding: 2em 0;
	}

	.projects {
		display: flex;
		flex-direction: column;
		gap: 2em;

		width: 50vw;
	}

	@media (max-width: 500px) {
		.projects {
			width: 95vw;
			display: flex;
			flex-direction: column;
		}
	}
</style>
