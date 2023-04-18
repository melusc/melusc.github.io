<script lang="ts">
	// eslint-disable-next-line import/default, import/no-named-as-default-member, import/no-named-as-default
	import rgbHex from 'rgb-hex';
	import type {FormEventHandler} from 'svelte/elements';

	import {hexRgb} from '../util';

	import FancyBorder from './fancy-border.svelte';

	export let red: number;
	export let green: number;
	export let blue: number;
	export let alpha: number | undefined;

	$: hex = '#' + rgbHex(red, green, blue, alpha);
	let valid = true;

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
	on:input={handleInput}
	value={hex}
/>
<FancyBorder />
