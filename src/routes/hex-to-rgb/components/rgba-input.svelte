<script lang="ts">
	import Alpha from './alpha.svelte';
	import Rgb from './rgb.svelte';

	let {
		red = $bindable(),
		blue = $bindable(),
		green = $bindable(),
		alpha = $bindable(),
	}: {
		red: number;
		green: number;
		blue: number;
		alpha: number | undefined;
	} = $props();
</script>

<Rgb bind:value={red} name="red" />
<Rgb bind:value={green} name="green" />
<Rgb bind:value={blue} name="blue" />
<Alpha bind:value={alpha} />
