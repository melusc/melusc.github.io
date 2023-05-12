<script lang="ts" context="module">
	import SingleMethod, {type AcceptedTypes} from './single-method.svelte';

	type FakerModule<Keys extends string> = Record<Keys, () => AcceptedTypes>;
</script>

<script lang="ts">
	import type {Faker} from '@faker-js/faker';

	import {locale} from './locale.svelte';

	type ModuleKey = $$Generic<
		keyof {
			[K in keyof Faker]: Faker[K] extends FakerModule<Keys> ? Faker[K] : never;
		}
	>;
	type Module = $$Generic<Faker[ModuleKey]>;
	type Keys = $$Generic<keyof Module & string>;

	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
	export let module: ModuleKey & string;
	export let keys: Keys[];

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-unsafe-call
	$: title = module.charAt(0).toUpperCase() + module.slice(1).toLowerCase();
	let isOpen = false;
</script>

<details class="module" bind:open={isOpen}>
	<summary>
		<h2 class="module-title">{title}</h2>
	</summary>
	{#if isOpen}
		{#each keys as key (key)}
			<!--  eslint-disable-next-line unicorn/prefer-module -->
			<SingleMethod locale={$locale} {module} {key} />
		{/each}
	{/if}
</details>

<style>
	summary > h2 {
		display: inline;
		font-size: 2em;
	}
</style>
