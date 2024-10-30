<script lang="ts">
	let {includeSteps = $bindable()}: {includeSteps: boolean} = $props();
</script>

<label>
	<input type="checkbox" bind:checked={includeSteps} /> Include steps
</label>

<style>
	label {
		display: flex;
		gap: 1ch;
		align-items: center;
	}
</style>
