<script lang="ts">
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';

	import * as CONSTS from '../consts';
	import {isValidDuration} from '../util';
	import {calcTimePerDistance} from '../util';

	dayjs.extend(customParseFormat);

	export let duration: string;
	export let distance: string;

	$: timePerDistance = calcTimePerDistance(distance, duration);
</script>

<div class="time-overview">
	<div class="duration">
		<input
			bind:value={duration}
			class="input-remove-input-visuals"
			class:invalid={!isValidDuration(duration)}
		/>
	</div>
	<div class="distance">
		<div>
			<input
				bind:value={distance}
				class="input-remove-input-visuals"
				class:invalid={!CONSTS.distanceRegex.test(distance)}
				placeholder="0.00"
			/><small>km</small>
		</div>
		<div class="vertical-border height-12" />
		<div class="time-per-distance" class:invalid={timePerDistance === false}>
			{timePerDistance === false ? 'Invalid' : timePerDistance}<small>/km</small
			>
		</div>
	</div>
</div>

<style>
	.time-overview {
		color: var(--text-white);

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		background-color: var(--card-background);
		border-radius: var(--card-border-radius);
		margin-top: 20px;
		padding: 7vmin 0;
	}
	small {
		margin-left: 2px;
		font-size: 70%;
	}

	.duration {
		font: 1.9em Orbitron;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.duration input {
		width: 80%;
		text-align: center;
	}

	.distance {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80%;
	}

	.distance input {
		width: 6ch;
		display: inline;
		text-align: right;
		margin-right: 2px;
	}

	.distance .vertical-border {
		margin: 0 10px;
	}
</style>
