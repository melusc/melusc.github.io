<script lang="ts">
	import Download from './download.svelte';
	import {unlock} from './unlock.ts';
	import Upload from './upload.svelte';
	import './style.scss';

	let name = $state<string>();

	let output = $state<Promise<Blob>>();

	function handleUpload(event: CustomEvent<{name: string; file: File}>): void {
		output = unlock(event.detail.file);
		name = event.detail.name;
	}
</script>

<svelte:head>
	<title>Unlock Office Documents</title>
</svelte:head>

<div id="unlock-office-documents">
	<Upload on:input={handleUpload} />

	{#if output}
		{#await output then file}
			<Download {file} name={name!} />
		{:catch error}
			<div class="error">
				{error instanceof Error ? error.message : error}
			</div>
		{/await}
	{/if}

	<div class="report-issue">
		Not working as expected?
		<a
			href="https://github.com/melusc/melusc.github.io/issues"
			target="_blank"
			rel="noopener noreferrer"
		>
			Report an issue
		</a>
	</div>
</div>

<style>
	.error {
		margin-top: 2em;
		font-size: 1.4em;
		color: var(--red);
	}

	.report-issue {
		position: absolute;
		right: 2em;
		bottom: 2em;
	}
</style>
