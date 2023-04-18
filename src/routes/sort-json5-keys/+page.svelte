<script lang="ts">
	import json5 from 'json5';

	import {sortJson} from './sort';
	import './style.scss';

	let input = '{}';
	let output: string = '';
	let errorMsg: undefined | string;

	$: try {
		errorMsg = undefined;

		const json = sortJson(json5.parse(input));

		output = JSON.stringify(json, undefined, '\t');
	} catch (error: unknown) {
		errorMsg = error instanceof Error ? error.message : String(error);
	}
</script>

<svelte:head>
	<title>Sort json5 by its keys</title>
</svelte:head>

<textarea placeholder="Paste JSON5 here" bind:value={input} />
<div class="error">{errorMsg ?? ''}</div>
<textarea readonly value={output} />
