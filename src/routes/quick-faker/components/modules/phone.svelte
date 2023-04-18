<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="Phone"
	module={faker.phone}
	keys={[
		'imei',
		'number',

		// Deprecated
		// 'phoneFormats',
		// 'phoneNumber',
		// 'phoneNumberFormat',
	]}
/>
