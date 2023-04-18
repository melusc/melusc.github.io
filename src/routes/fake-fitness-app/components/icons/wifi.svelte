<script lang="ts">
	let bars = 4;

	function changeBars(): void {
		// Go 4 -> 2 -> 3 -> 4 -> ...
		bars = ((bars - 1) % 3) + 2;
	}
</script>

<svg
	fill="none"
	stroke="currentColor"
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width="1.5"
	viewBox="0 0 24 24"
	class="icon-interactive"
	on:click={changeBars}
	on:keydown={changeBars}
>
	<path d="M12 18h.01" />
	{#if bars > 1}<path d="M9.172 15.172a4 4 0 0 1 5.656 0" />{/if}
	{#if bars > 2}<path d="M6.343 12.343a8 8 0 0 1 11.314 0" />{/if}
	{#if bars > 3}<path d="M3.515 9.515c4.686-4.687 12.284-4.687 17 0" />{/if}
</svg>
