<script lang="ts">
	import {createEventDispatcher} from 'svelte';
	import Eraser from './icons/eraser.svelte';

	const dispatch = createEventDispatcher<{
		input: string;
	}>();

	function dispatchSpace() {
		dispatch('input', ' ');
	}
	function dispatchIndex(index: number): () => void {
		return (): void => {
			dispatch('input', `${index + 1}`);
		};
	}
</script>

<div class="keyboardless-inputs">
	{#each {length: 9} as _, index (index)}
		<div
			class="keyboardless-input"
			title={`${index + 1}`}
			on:click={dispatchIndex(index)}
			on:keydown={dispatchIndex(index)}
		>
			{index + 1}
		</div>
	{/each}
	<div
		class="keyboardless-input input-eraser"
		title="Clear cell"
		on:click={dispatchSpace}
		on:keydown={dispatchSpace}
	>
		<Eraser />
	</div>
</div>

<style lang="scss">
	.keyboardless-inputs {
		grid-area: inputs;
		margin-left: 4px;
		border-radius: 3px;
		border: var(--thick-border);
	}

	.keyboardless-input {
		text-align: center;

		width: 1.5em;
		height: 1.5em;

		display: flex;
		align-items: center;
		justify-content: center;

		cursor: pointer;

		transition: var(--transition-properties) background-color;

		border-bottom: var(--thick-border);

		&:last-child {
			border-bottom: none;
		}

		&:hover {
			background-color: #e9ecef;
		}
	}

	@media (max-width: 600px) {
		.keyboardless-inputs {
			margin-top: 10px;
			border-radius: 5px;
			justify-self: center;

			font-size: 33px;

			width: max-content;

			display: grid;
			grid-gap: 2px;
			box-sizing: border-box;

			.keyboardless-input {
				box-shadow: 0 0 0 2px #344861;
				border-bottom: none;
			}

			grid-template: repeat(4, 1fr) / repeat(3, 1fr);

			.input-eraser {
				grid-area: 4 / 2;
			}
		}
	}
</style>
