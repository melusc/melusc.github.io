<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="Hacker"
	module={faker.hacker}
	keys={['abbreviation', 'adjective', 'ingverb', 'noun', 'phrase', 'verb']}
/>
