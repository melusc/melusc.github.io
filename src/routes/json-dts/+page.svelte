<script lang="ts">
	import {jsonDts} from '@lusc/json-dts';
	import type {JsonValue} from 'type-fest';

	import './style.scss';

	let input = $state(
		JSON.stringify(
			{
				id: 0,
				data: {
					age: 20,
					name: 'Bob Smith',
				},
			},
			undefined,
			2,
		),
	);

	function tryJsonDts(input: string) {
		try {
			const json = JSON.parse(input) as JsonValue;
			return {invalid: false, output: jsonDts(json)};
		} catch {
			return {invalid: true, output: ''};
		}
	}

	const {invalid, output} = $derived(tryJsonDts(input));
</script>

<svelte:head>
	<title>JSON Dts</title>
</svelte:head>

<div id="json-dts">
	<textarea bind:value={input} class:invalid></textarea>
	<textarea readonly value={output}></textarea>
</div>
