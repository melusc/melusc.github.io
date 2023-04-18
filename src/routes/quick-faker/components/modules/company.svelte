<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="Company"
	module={faker.company}
	keys={[
		'bs',
		'bsAdjective',
		'bsBuzz',
		'bsNoun',
		'catchPhrase',
		'catchPhraseAdjective',
		'catchPhraseDescriptor',
		'catchPhraseNoun',
		'companySuffix',
		'name',

		// Returns all suffixes
		// 'suffixes',

		// Deprecated
		// 'companyName',
	]}
/>
