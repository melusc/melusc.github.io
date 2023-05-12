<script lang="ts" context="module">
	import {allFakers} from '@faker-js/faker';
	// eslint-disable-next-line n/file-extension-in-import
	import {writable} from 'svelte/store';

	export const locale = writable<keyof typeof allFakers>('en');

	const locales = Object.keys(allFakers);
</script>

<select class="language-select" bind:value={$locale}>
	<option value="en">en</option>

	{#each locales as locale (locale)}
		<option value={locale}>
			{locale}
		</option>
	{/each}
</select>

<style>
	.language-select {
		align-self: center;
	}
</style>
