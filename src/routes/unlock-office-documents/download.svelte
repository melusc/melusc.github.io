<script lang="ts">
	import DownloadIcon from './icons/download.svelte';

	const {file, name}: {file: Blob; name: string} = $props();

	let url = $state<string>();

	$effect(() => {
		if (url !== undefined) {
			URL.revokeObjectURL(url);
		}

		url = URL.createObjectURL(file);
	});
</script>

<a href={url} download={name}>
	<DownloadIcon /> Download unlocked file
</a>

<style>
	a {
		margin-top: 2em;

		display: block;
		padding: 10px;
		text-align: center;
		border-radius: 5px;
		text-decoration: none;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;

		font-size: 1.4em;
	}

	a :global(svg) {
		height: 1.1em;
	}
</style>
