<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="Database"
	module={faker.database}
	keys={['collation', 'column', 'engine', 'mongodbObjectId', 'type']}
/>
