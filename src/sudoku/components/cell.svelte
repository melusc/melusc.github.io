<script lang="ts">
	import {createEventDispatcher} from 'svelte';

	const dispatch = createEventDispatcher<{
		focus: void;
	}>();

	export let isValid: boolean;
	export let isFocused: boolean;
	export let element: string | undefined;

	function dispatchFocus(): void {
		dispatch('focus');
	}
</script>

<div
	class="cell"
	class:invalid-input={!isValid}
	class:focused-cell={isFocused}
	on:mousedown={dispatchFocus}
	on:touchstart|preventDefault={dispatchFocus}
>
	{element ?? ''}
</div>

<style lang="scss">
	.cell {
		border: var(--thin-border);
		text-align: center;

		display: flex;
		flex: 1 1 0;
		justify-content: center;
		align-items: center;
		cursor: pointer;

		&:nth-child(3n) {
			border-right: var(--thick-border);
		}
		&:nth-child(9n + 1) {
			border-left: var(--thick-border);
		}

		@for $i from 0 through 2 {
			$lower-index: ($i * 27) + 1; // 1-based indexing
			$upper-index: $lower-index + 8; // inclusive, so first one and the next 8

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
		// Only here because it doesn't work and looks weird on mobile
		.cell:hover:not(.focused-cell) {
			background-color: var(--hover-cell-bg);
		}
	}
</style>
