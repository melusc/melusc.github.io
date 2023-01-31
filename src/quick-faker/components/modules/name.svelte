<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="Name"
	module={faker.name}
	keys={[
		'firstName',
		'fullName',
		'gender',
		'jobArea',
		'jobDescriptor',
		'jobTitle',
		'jobType',
		'lastName',
		'middleName',
		'prefix',
		'sex',
		'sexType',
		'suffix',

		// Deprecated
		// 'findName'
	]}
/>
