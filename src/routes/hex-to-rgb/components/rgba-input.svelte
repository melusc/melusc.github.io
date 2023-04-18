<script lang="ts">
	import Alpha from './alpha.svelte';
	import Rgb from './rgb.svelte';

	export let red: number;
	export let green: number;
	export let blue: number;
	export let alpha: number | undefined;
</script>

<Rgb bind:value={red} name="red" />
<Rgb bind:value={green} name="green" />
<Rgb bind:value={blue} name="blue" />
<Alpha bind:value={alpha} />
