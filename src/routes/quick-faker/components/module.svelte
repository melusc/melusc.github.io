<script lang="ts">
	import {locale} from './locale.svelte';
	import SingleMethod, {type AcceptedTypes} from './single-method.svelte';

	type FakerModule<Keys extends string> = Record<Keys, () => AcceptedTypes>;

	type Keys = $$Generic<keyof Module & string>;
	type Module = $$Generic<FakerModule<Keys>>;

	export let module: FakerModule<Keys>;
	export let title: string;
	export let keys: Keys[];

	let isOpen = false;
</script>

<details class="module" bind:open={isOpen}>
	<summary>
		<h2 class="module-title">{title}</h2>
	</summary>
	{#if isOpen}
		{#each keys as key (key)}
			<SingleMethod locale={$locale} title={key} method={module[key]} />
		{/each}
	{/if}
</details>

<style>
	summary > h2 {
		display: inline;
		font-size: 2em;
	}
</style>
