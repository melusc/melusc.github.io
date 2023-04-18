<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="Color"
	module={faker.color}
	keys={[
		'cmyk',
		'colorByCSSColorSpace',
		'cssSupportedFunction',
		'cssSupportedSpace',
		'hsl',
		'human',
		'hwb',
		'lab',
		'lch',
		'rgb',
		'space',
	]}
/>
