<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="Random"
	module={faker.random}
	keys={['alpha', 'alphaNumeric', 'locale', 'numeric', 'word', 'words']}
/>
