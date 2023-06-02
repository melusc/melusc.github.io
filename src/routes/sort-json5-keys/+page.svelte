<script lang="ts">
	import json5 from 'json5';

	import {sortJson} from './sort.ts';
	import './style.scss';

	let input = '{}';
	let output = '';
	let errorMessage: undefined | string;

	$: try {
		errorMessage = undefined;

		const json = sortJson(json5.parse(input));

		output = JSON.stringify(json, undefined, '\t');
	} catch (error: unknown) {
		errorMessage = error instanceof Error ? error.message : String(error);
	}
</script>

<svelte:head>
	<title>Sort json5 by its keys</title>
</svelte:head>

<div id="sort-json5-keys">
	<textarea placeholder="Paste JSON5 here" bind:value={input} />
	<div class="error">{errorMessage ?? ''}</div>
	<textarea readonly value={output} />
</div>
