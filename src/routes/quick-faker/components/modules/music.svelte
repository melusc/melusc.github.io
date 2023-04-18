<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module title="Music" module={faker.music} keys={['genre', 'songName']} />
