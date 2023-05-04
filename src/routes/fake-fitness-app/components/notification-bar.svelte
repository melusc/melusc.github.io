<script lang="ts">
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat.js';

	import TimeInput from './time-input.svelte';
	import Battery from './battery.svelte';
	import Bluetooth from './icons/bluetooth.svelte';
	import Signal from './icons/signal.svelte';
	import Wifi from './icons/wifi.svelte';

	dayjs.extend(customParseFormat);
</script>

<div class="notification-bar">
	<TimeInput class="clock" />
	<div class="battery-and-icons">
		<Bluetooth />
		<Wifi />
		<Signal />
		<Battery />
	</div>
</div>

<style>
	.notification-bar {
		width: 100%;

		font-size: 0.9em;

		display: grid;
		grid-template-columns: 6.5% auto auto 6%;

		align-items: center;

		color: var(--notification-grey);
	}

	.battery-and-icons {
		justify-self: end;

		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.battery-and-icons :global(svg) {
		height: 1.2em;
	}

	.battery-and-icons :global(.icon-reception) {
		height: 1em;
	}

	.notification-bar :global(.clock) {
		grid-column: 2 / 3;

		justify-self: start;

		width: 5ch;
	}
</style>
