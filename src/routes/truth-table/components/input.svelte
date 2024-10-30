<script lang="ts">
	let {input = $bindable()}: {input: string} = $props();
</script>

<input type="text" bind:value={input} />

<style>
	input {
		font: inherit;
		background: none;
		border: none;
		outline: none;
		color: inherit;

		border-bottom: var(--table-border);
		padding: 0.3em;

		width: 100%;
	}
</style>
