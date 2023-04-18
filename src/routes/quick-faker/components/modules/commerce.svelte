<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="Commerce"
	module={faker.commerce}
	keys={[
		'department',
		'price',
		'product',
		'productAdjective',
		'productDescription',
		'productMaterial',
		'productName',

		// Deprecated
		// 'color',
	]}
/>
