<script lang="ts">
	export let includeSteps: boolean;
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
