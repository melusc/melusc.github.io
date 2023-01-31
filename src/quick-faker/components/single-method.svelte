<script context="module" lang="ts">
	export type AcceptedTypes =
		| string
		| number
		| boolean
		| bigint
		| Date
		| Array<string | number>;
</script>

<script lang="ts">
	import ClipboardButton from './clipboard-button.svelte';
	import Redo from './redo.svelte';

	export let title: string;
	export let method: () => AcceptedTypes;
	export let locale: string;
	let result: string | undefined;

	$: {
		// Listen for changes
		locale;
		method;
		// Do this
		regenerate();
	}

	function regenerate() {
		result = toString(method());
	}

	function toString(input: AcceptedTypes): string | undefined {
		// eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
		switch (typeof input) {
			case 'string':
			case 'bigint':
			case 'number':
			case 'boolean': {
				return String(input);
			}

			case 'undefined': {
				return undefined;
			}
			// no default
		}

		if (input instanceof Date) {
			return input.toISOString();
		}

		if (Array.isArray(input)) {
			return input.join(',');
		}

		console.error(`Unexpected input ${typeof input} "${String(input)}"`);
		return undefined;
	}
</script>

{#if result !== undefined}
	<div class="method">
		<div class="method-title">{title}</div>
		<input readOnly class="method-result" value={result} />
		<ClipboardButton value={result} />
		<button class="method-regenerate" type="button" on:click={regenerate}>
			<Redo />
		</button>
	</div>
{/if}
