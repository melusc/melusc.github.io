<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="Lorem"
	module={faker.lorem}
	keys={[
		'lines',
		'paragraph',
		'paragraphs',
		'sentence',
		'slug',
		'text',
		'word',
		'words',
	]}
/>
