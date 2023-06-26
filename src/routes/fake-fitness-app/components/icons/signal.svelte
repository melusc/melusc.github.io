<script lang="ts">
	let bars = 5;

	function changeBars(): void {
		bars = ((bars - 1) % 4) + 2;
	}
</script>

<svg
	fill="currentColor"
	viewBox="0 0 20 20"
	class="icon-reception icon-interactive"
	on:click={changeBars}
	on:keydown={changeBars}
	role="button"
	tabindex="0"
>
	<path
		d="M3.684 14H2.421c-.233 0-.421.224-.421.5v3c0 .276.188.5.421.5h1.263c.233 0 .421-.224.421-.5v-3c0-.276-.188-.5-.42-.5z"
	/>
	{#if bars > 1}
		<path
			d="M7.158 11H5.895c-.233 0-.421.224-.421.5v6c0 .276.188.5.42.5h1.264c.233 0 .42-.224.42-.5v-6c0-.276-.187-.5-.42-.5z"
		/>
	{/if}
	{#if bars > 2}
		<path
			d="M10.632 8H9.368c-.232 0-.42.224-.42.5v9c0 .276.188.5.42.5h1.264c.232 0 .42-.224.42-.5v-9c0-.276-.188-.5-.42-.5z"
		/>
	{/if}
	{#if bars > 3}
		<path
			d="M14.105 5h-1.263c-.233 0-.42.224-.42.5v12c0 .276.187.5.42.5h1.263c.233 0 .421-.224.421-.5v-12c0-.276-.188-.5-.42-.5z"
		/>
	{/if}
	{#if bars > 4}
		<path
			d="M17.579 2h-1.263c-.233 0-.421.224-.421.5v15c0 .276.188.5.42.5h1.264c.233 0 .421-.224.421-.5v-15c0-.276-.188-.5-.421-.5z"
		/>
	{/if}
</svg>
