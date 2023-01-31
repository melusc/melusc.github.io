<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="Vehicle"
	module={faker.vehicle}
	keys={[
		'bicycle',
		'color',
		'fuel',
		'manufacturer',
		'model',
		'type',
		'vehicle',
		'vin',
		'vrm',
	]}
/>
