<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="Word"
	module={faker.word}
	keys={[
		'adjective',
		'adverb',
		'conjunction',
		'interjection',
		'noun',
		'preposition',
		'verb',
	]}
/>
