<script lang="ts">
	import Eraser from './icons/eraser.svelte';

	const {oninput}: {oninput: (value: string) => void} = $props();

	function dispatchSpace(): void {
		oninput(' ');
	}
	function dispatchIndex(index: number): () => void {
		return (): void => {
			oninput(`${index + 1}`);
		};
	}

	function handleKeydown(value: string) {
		return (event: KeyboardEvent) => {
			if (event.key === ' ' || event.key === 'Enter') {
				oninput(value);
			}
		};
	}
</script>

<div class="keyboardless-inputs">
	{#each {length: 9} as _, index (index)}
		<div
			class="keyboardless-input"
			title={`${index + 1}`}
			onclick={dispatchIndex(index)}
			onkeydown={handleKeydown(`${index + 1}`)}
			role="button"
			tabindex="0"
		>
			{index + 1}
		</div>
	{/each}
	<div
		class="keyboardless-input input-eraser"
		title="Clear cell"
		onclick={dispatchSpace}
		onkeydown={handleKeydown(' ')}
		role="button"
		tabindex="0"
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

			grid-template: repeat(4, 1fr) / repeat(3, 1fr);

			.keyboardless-input {
				box-shadow: 0 0 0 2px #344861;
				border-bottom: none;
			}

			.input-eraser {
				grid-area: 4 / 2;
			}
		}
	}
</style>
