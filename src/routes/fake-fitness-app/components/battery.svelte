<script lang="ts">
	import {getTextWidth} from '../util';

	import BatteryIcon from './icons/battery.svelte';

	// Allow all numbers from 1-100
	// Disallow leading zeroes and zero
	const isValidBatteryValue = (v: string): boolean =>
		/^([1-9]\d?|100)%$/.test(v.trim());

	let batteryLevel = '100%';
	$: inputWidth = Math.max(
		getTextWidth(batteryLevel, `${0.9 * 2.3}vmin "Samsung Sans"`) * 1.1,
		10,
	);
</script>

<input
	class="input-remove-input-visuals battery-input"
	class:invalid={!isValidBatteryValue(batteryLevel)}
	bind:value={batteryLevel}
	style:width={`${inputWidth}px`}
/>
<BatteryIcon {batteryLevel} />

<style>
	.battery-input {
		width: 5ch;

		text-align: right;

		margin: 0 1px;
	}
</style>
