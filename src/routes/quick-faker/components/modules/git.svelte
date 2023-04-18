<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="Git"
	module={faker.git}
	keys={['branch', 'commitEntry', 'commitMessage', 'commitSha', 'shortSha']}
/>
