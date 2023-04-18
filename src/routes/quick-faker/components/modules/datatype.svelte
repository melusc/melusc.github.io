<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="Datatype"
	module={faker.datatype}
	keys={[
		'array',
		'bigInt',
		'boolean',
		'datetime',
		'float',
		'hexadecimal',
		'json',
		'number',
		'string',
		'uuid',
	]}
/>
