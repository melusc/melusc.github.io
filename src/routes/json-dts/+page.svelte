<script lang="ts">
	import {jsonDts} from '@lusc/json-dts';
	// @ts-expect-error JsonValue is not resolved correctly??
	import type {JsonValue} from 'type-fest';

	import './style.scss';

	let input = JSON.stringify(
		{
			id: 0,
			data: {
				age: 20,
				name: 'Bob Smith',
			},
		},
		undefined,
		2,
	);
	let invalid = false;
	let output = '';

	$: try {
		const json = JSON.parse(input) as JsonValue;
		invalid = false;

		output = jsonDts(json);
	} catch {
		invalid = true;
	}
</script>

<svelte:head>
	<title>JSON Dts</title>
</svelte:head>

<div id="json-dts">
	<textarea bind:value={input} class:invalid />
	<textarea readonly value={output} />
</div>
