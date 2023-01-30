<script lang="ts">
	export let to: number;
	export let active: number;
</script>

<div class="clock-row" style:--offset={active}>
	{#each {length: to + 1} as _, index (index)}
		<div class:active={active === index}>
			{index}
		</div>
	{/each}
</div>
