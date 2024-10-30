<script lang="ts">
	import type { MetaKeys } from "../util";

	const {
		isValid,
		isFocused,
		element,
		oninput,
		onfocus,
	}: {
		isValid: boolean;
		isFocused: boolean;
		element: string | undefined;
		oninput: (key: string, meta: MetaKeys) => void;
		onfocus: () => void,
	} = $props();

	let inputElement = $state<HTMLInputElement>();

	$effect(() => {
		if (isFocused) {
			inputElement?.focus();
		}
	})


	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
		}

		const key = event.key;
		const meta: MetaKeys = {
			alt: event.altKey,
			ctrl: event.ctrlKey,
			shift: event.shiftKey,
		}

		oninput(key, meta);
	}
</script>

<input
	class="cell"
	class:invalid-input={!isValid}
	class:focused-cell={isFocused}
	onkeydown={handleKeydown}
	{onfocus}
	tabindex="0"
	value={element}
	readonly
	bind:this={inputElement}
/>

<style lang="scss">
	.cell {
		border: var(--thin-border);
		text-align: center;

		margin: none;
		padding: none;
		display: flex;
		flex: 1 1 0;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		width: 100%;
		height: 100%;
		font: inherit;

		&:nth-child(3n) {
			border-right: var(--thick-border);
		}
		&:nth-child(9n + 1) {
			border-left: var(--thick-border);
		}

		@for $i from 0 through 2 {
			$lower-index: ($i * 27) + 1; /* 1-based indexing */
			$upper-index: $lower-index +
				8; /* inclusive, so first one and the next 8 */

			&:nth-child(n + #{$lower-index}):nth-child(-n + #{$upper-index}) {
				border-top: var(--thick-border);
			}
		}

		&:nth-child(n + 73) {
			border-bottom: var(--thick-border);
		}

		&.focused-cell {
			background-color: var(--focused-cell-bg);
		}
	}

	.invalid-input {
		color: var(--invalid);
	}

	@media (min-width: 500px) {
		/* Only here because it doesn't work and looks weird on mobile */
		.cell:hover:not(.focused-cell) {
			background-color: var(--hover-cell-bg);
		}
	}
</style>
