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
	import {allFakers} from '@faker-js/faker';

	import ClipboardButton from './clipboard-button.svelte';
	import Redo from './redo.svelte';

	type ModuleKey = $$Generic<keyof Faker>;
	type Module = $$Generic<Faker[ModuleKey]>;
	type MethodKey = $$Generic<keyof Module>;

	export let title: string;
	export let module: ModuleKey;
	export let key: MethodKey;
	export let locale: keyof typeof allFakers;
	let result: string | undefined;

	$: {
		regenerate(locale, module, key);
	}

	function handleClick(): void {
		regenerate(locale, module, key);
	}

	function regenerate(
		locale: keyof typeof allFakers,
		module: ModuleKey,
		key: MethodKey,
	): void {
		// @ts-expect-error Making this work is not worth the effort
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
		result = toString(allFakers[locale][module][key]());
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
		<button class="method-regenerate" type="button" on:click={handleClick}>
			<Redo />
		</button>
	</div>
{/if}

<style lang="scss">
	.method {
		display: grid;
		grid-template-columns:
			minmax(0, 1fr)
			minmax(0, 1fr)
			2em 2em;
		justify-content: center;
		gap: 4px;

		margin: 1em 0;
		font-size: 1.3em;

		input,
		:global(button) {
			border: none;
			outline: none;
			color: inherit;
			background: none;
			font: inherit;
		}

		input {
			border-bottom: currentColor 2px solid;
		}

		:global(button) {
			padding: 0.3em;

			display: grid;
			place-items: center;
		}

		:global(button:active) {
			scale: 0.9;
		}

		:global(button svg) {
			height: 1.3em;
			width: 1.3em;
		}
	}

	.method-title {
		font-size: 1.1em;
	}
</style>
