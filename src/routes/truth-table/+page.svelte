<script lang="ts">
	import {operationToString} from '@lusc/truth-table';

	import IncludeStepsInput from './components/include-steps-input.svelte';
	import Input from './components/input.svelte';
	import RenderError from './components/render-error.svelte';
	import Table from './components/table.svelte';
	import './style.scss';
	import {getHash, tryGenerateTable} from './util.ts';

	import {browser} from '$app/environment';

	let input = 'a & b -> (a | b)';
	let includeSteps = true;
	$: parsed = tryGenerateTable(input, includeSteps);

	function getInputFromHash(): void {
		const hashInput = getHash();
		if (hashInput && hashInput !== input) {
			input = hashInput;
		}
	}
	if (browser) {
		getInputFromHash();
	}

	$: {
		if (browser) {
			const newUrl = new URL(location.href);

			let newHash: string;
			let shouldPush = true;

			if (parsed.valid) {
				newHash = operationToString(parsed.table.ast).replace(
					/^\((.+)\)$/,
					'$1',
				);
			} else {
				newHash = input;

				// If last was valid don't override it, i.e. pushState
				// if last was invalid, it's not very valuable: replaceState
				shouldPush = parsed.valid;
			}

			newHash = newHash.trim();
			const oldHash = getHash();

			if (newHash !== oldHash) {
				newUrl.hash = newHash;

				if (shouldPush) {
					history.pushState({}, '', newUrl);
				} else {
					history.replaceState({}, '', newUrl);
				}
			}
		}
	}
</script>

<svelte:window on:hashchange={getInputFromHash} />
<svelte:head>
	<title>Truth Table Generator</title>
</svelte:head>

<div id="truth-table">
	<Input bind:input />
	<IncludeStepsInput bind:includeSteps />
	{#if parsed.valid}
		<Table table={parsed.table} />
	{:else}
		<RenderError {input} error={parsed.error} />
	{/if}
</div>

<style>
	#truth-table {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
