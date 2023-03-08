<script lang="ts">
	import type {FormEventHandler, WheelEventHandler} from 'svelte/elements';
	import FancyBorder from './fancy-border.svelte';

	export let name: string;
	export let value: number;
	let valid = true;

	function clamp(value: number): number {
		value = Math.round(value);
		// Minimum 0
		value = Math.max(0, value);
		// Maximum 255
		return Math.min(value, 255);
	}

	const handleScroll: WheelEventHandler<HTMLInputElement> = event => {
		const direction = Math.sign(event.deltaY);

		value += direction;
		value = clamp(value);
	};

	const handleInput: FormEventHandler<HTMLInputElement> = event => {
		const input = event.currentTarget.value.trim();
		const parsed = Number(input);

		if (Number.isNaN(parsed)) {
			valid = false;
		} else {
			value = clamp(parsed);
			valid = true;
		}
	};
</script>

<input
	type="number"
	min="0"
	max="255"
	maxLength={3}
	{name}
	placeholder={name}
	class:invalid={!valid}
	value={String(value)}
	on:wheel={handleScroll}
	on:input={handleInput}
/>
<FancyBorder />
