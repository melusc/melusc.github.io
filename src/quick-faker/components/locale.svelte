<script lang="ts" context="module">
	import type {UsableLocale} from '@faker-js/faker';
	// eslint-disable-next-line n/file-extension-in-import
	import {writable} from 'svelte/store';

	export const locale = writable<UsableLocale>('en');
</script>

<script lang="ts">
	import {faker} from '@faker-js/faker';

	$: faker.setLocale($locale);

	const locales: UsableLocale[] = Object.keys(faker.locales);
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
