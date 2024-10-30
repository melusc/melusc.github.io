<script lang="ts">
	import json5 from 'json5';

	import {sortJson} from './sort.ts';
	import './style.scss';

	let input = $state('{}');

	function trySort(input: string) {
		try {
			const json = sortJson(json5.parse(input));

			return {
				errorMessage: undefined,
				output: JSON.stringify(json, undefined, '\t'),
			};
		} catch (error: unknown) {
			return {
				errorMessage: error instanceof Error ? error.message : String(error),
				output: '',
			};
		}
	}

	const {output, errorMessage} = $derived(trySort(input));
</script>

<svelte:head>
	<title>Sort json5 by its keys</title>
</svelte:head>

<div id="sort-json5-keys">
	<textarea placeholder="Paste JSON5 here" bind:value={input}></textarea>
	<div class="error">{errorMessage ?? ''}</div>
	<textarea readonly value={output}></textarea>
</div>
