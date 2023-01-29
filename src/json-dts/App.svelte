<script lang="ts">
	import {jsonDts} from '@lusc/json-dts';
	import type {JsonValue} from 'type-fest';

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

<textarea id="in" bind:value={input} class:invalid />
<textarea id="out" readonly value={output} />
