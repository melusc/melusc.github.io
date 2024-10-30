<script lang="ts">
	import rgbHex from 'rgb-hex';
	import type {FormEventHandler} from 'svelte/elements';

	import {hexRgb} from '../util.ts';

	import FancyBorder from './fancy-border.svelte';

	let {
		red = $bindable(),
		green = $bindable(),
		blue = $bindable(),
		alpha = $bindable(),
	}: {
		red: number;
		green: number;
		blue: number;
		alpha: number | undefined;
	} = $props();

	const hex = $derived('#' + rgbHex(red, green, blue, alpha));
	let valid = $state(true);

	const handleInput: FormEventHandler<HTMLInputElement> = event => {
		try {
			const input = event.currentTarget.value.trim();
			({red, green, blue, alpha} = hexRgb(input));
			valid = true;
		} catch {
			valid = false;
		}
	};
</script>

<input
	maxLength={9}
	placeholder="#"
	name="hex"
	class:invalid={!valid}
	oninput={handleInput}
	value={hex}
/>
<FancyBorder />
