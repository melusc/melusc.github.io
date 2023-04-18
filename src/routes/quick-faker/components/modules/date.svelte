<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="Date"
	module={faker.date}
	keys={[
		'birthdate',
		'future',
		'month',
		'past',
		'recent',
		'soon',
		'weekday',

		// Not included due to incompatible types
		// 'between',
		// 'betweens',
	]}
/>
