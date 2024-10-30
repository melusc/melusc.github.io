<script lang="ts">
	import type {FormEventHandler, WheelEventHandler} from 'svelte/elements';

	import FancyBorder from './fancy-border.svelte';

	let {value = $bindable()}: {value: number | undefined} = $props();
	let invalid = $state(false);

	function clamp(alpha: number): number {
		alpha = Math.round(alpha * 100) / 100;
		// Minimum 0
		alpha = Math.max(0, alpha);
		// Maximum 255
		return Math.min(alpha, 1);
	}
	const handleScroll: WheelEventHandler<HTMLInputElement> = event => {
		const direction = Math.sign(event.deltaY);
		value ??= 0;

		value += direction * 0.01;
		value = clamp(value);
	};

	const handleInput: FormEventHandler<HTMLInputElement> = event => {
		const input = event.currentTarget.value.trim();
		const parsed = Number(input);
		invalid = false;

		if (input === '') {
			value = undefined;
		} else if (Number.isNaN(parsed)) {
			invalid = true;
		} else {
			value = clamp(parsed);
		}
	};
</script>

<input
	type="number"
	min={0}
	max={1}
	placeholder="[alpha]"
	step={0.01}
	name="alpha"
	class:invalid
	value={String(value)}
	onwheel={handleScroll}
	oninput={handleInput}
/>
<FancyBorder />
