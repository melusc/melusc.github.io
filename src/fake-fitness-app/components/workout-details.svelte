<script lang="ts">
	import * as CONSTS from '../consts';
	import {isValidDuration, parseDuration, toSpeed} from '../util';

	import Run from './icons/run.svelte';

	export let duration: string;
	export let distance: string;
	let totalDuration = CONSTS.duration;
	let maxSpeed = '0.0';

	function onDurationInput(event: {currentTarget: HTMLInputElement}): void {
		const value = event.currentTarget.value;
		totalDuration = isValidDuration(value)
			? parseDuration(value).format('HH:mm:ss')
			: value.trim();
	}
</script>

<div class="workout-details">
	<div class="workout-details-title">Workout details</div>
	<div class="table">
		<div class="row">
			<div>
				<div class="table-value">{duration}</div>
				<div class="table-explanation">Workout duration</div>
			</div>
			<div class="vertical-border height-22" />
			<div>
				<input
					class="input-remove-input-visuals table-value"
					class:invalid={!isValidDuration(totalDuration)}
					value={totalDuration}
					placeholder="HH:mm:ss"
					on:input={onDurationInput}
				/>
				<div class="table-explanation">Total duration</div>
			</div>
		</div>
		<hr />
		<div class="row">
			<div>
				<div class="table-value">{distance}</div>
				<div class="table-explanation">Distance(km)</div>
			</div>
			<div class="vertical-border height-22" />
			<div>
				<Run />
			</div>
		</div>
		<hr />
		<div class="row">
			<div>
				<div class="table-value">{toSpeed(duration, distance) || ''}</div>
				<div class="table-explanation">Avg. speed(km/h)</div>
			</div>
			<div class="vertical-border height-22" />
			<div>
				<input
					class="input-remove-input-visuals table-value"
					class:invalid={!CONSTS.speedRegex.test(maxSpeed)}
					bind:value={maxSpeed}
					placeholder="0.0"
				/>
				<div class="table-explanation">Max. speed(km/h)</div>
			</div>
		</div>
	</div>
</div>

<style>
	.workout-details {
		color: var(--text-white);

		background: var(--card-background);
		border-radius: var(--card-border-radius);

		display: flex;
		justify-content: center;
		flex-direction: column;

		margin-top: 2.8vmin;
		padding: 2.5vmin 3.4vmin;
	}

	.workout-details-title {
		margin-bottom: 1em;
	}

	.table {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.table :global(svg) {
		height: 1.5em;
	}

	.table :global(hr) {
		width: 100%;
		border: none;
		border-bottom: 1px solid var(--border-color);
	}
	.table :global(.vertical-border) {
		color: var(--border-color);
	}

	.table-value,
	.table-explanation {
		text-align: center;
		width: 100%;
	}

	.row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 1px minmax(0, 1fr);
		align-items: center;
	}

	.row > div {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.table-explanation {
		font-size: 0.7em;
		color: var(--table-small-explanation);
	}
</style>
