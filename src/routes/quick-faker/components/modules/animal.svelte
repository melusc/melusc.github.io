<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="Animal"
	module={faker.animal}
	keys={[
		'bear',
		'bird',
		'cat',
		'cetacean',
		'cow',
		'crocodilia',
		'dog',
		'fish',
		'horse',
		'insect',
		'lion',
		'rabbit',
		'rodent',
		'snake',
		'type',
	]}
/>
