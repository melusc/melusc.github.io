<script module lang="ts">
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat.js';

	dayjs.extend(customParseFormat);

	const dateAtLoad = dayjs().format('D MMM');
	const timeAtLoad = dayjs().format('HH:mm');
</script>

<script lang="ts">
	import {
		calculateSecondsSinceMidnight,
		dateValid,
		timeValid,
		toDate,
		toTime,
	} from '../util.ts';

	import TimeInput from './time-input.svelte';

	const {duration}: {duration: string} = $props();
	let date = $state(dateAtLoad);
	let timeFrom = $state(timeAtLoad);

	const durationTimeSinceMidnightInSeconds = $derived(
		calculateSecondsSinceMidnight(duration),
	);

	function onDateInput(event: {currentTarget: HTMLInputElement}): void {
		const input = event.currentTarget.value;
		date = dateValid(input) ? toDate(input).format('D MMM') : input;
	}
</script>

<div class="main-app-date-time">
	<div class="day-date-inputs">
		<span
			>{#if dateValid(date)}{toDate(date).format('ddd, ')}{/if}</span
		>
		<input
			class="input-remove-input-visuals"
			class:invalid={!dateValid(date)}
			bind:value={date}
			oninput={onDateInput}
		/>
	</div>
	<div class="time-inputs">
		<TimeInput bind:time={timeFrom} width="5ch" />
		<span>
			{'-  '}{#if timeValid(timeFrom) && durationTimeSinceMidnightInSeconds !== false}{toTime(
					timeFrom,
				)
					.add(durationTimeSinceMidnightInSeconds, 's')
					.format('HH:mm')}{/if}
		</span>
	</div>
</div>

<style>
	.main-app-date-time {
		color: var(--text-white);

		display: flex;
		flex-direction: column;
		align-items: flex-start;

		margin: 0 6.5%;
		margin-top: 0.75em;
		font-size: 0.9em;
	}

	.day-date-inputs {
		display: flex;
	}

	.day-date-inputs span {
		white-space: pre;
	}

	.time-inputs {
		display: flex;
		margin-top: 0.3em;
	}
	.time-inputs span {
		/* Looks more centered this way */
		margin: 0 3px 0 1px;
	}
</style>
