import clsx from 'clsx';
import {h} from 'preact';
import {useState} from 'preact/hooks';

import * as CONSTS from '../scripts/consts';
import {
	isValidDuration,
	parseDuration,
	calcDurationSecondsSinceMidnight,
} from '../scripts/date-functions';
import {Run} from './icons';

import '../styles/workout-details.scss';

const toSpeed = (duration: string, distance: string): string | false => {
	const durationInSeconds = calcDurationSecondsSinceMidnight(duration);

	if (durationInSeconds === false) {
		return false;
	}

	if (!CONSTS.distanceRegex.test(distance)) {
		return false;
	}

	if (durationInSeconds === 0) {
		// Avoid division by 0
		return '0.0';
	}

	const parsedDistanceInMeters = Number(distance) * 1000;

	const speedInMetersPerSecond = parsedDistanceInMeters / durationInSeconds;

	return (speedInMetersPerSecond * 3.6).toFixed(1);
};

const WorkoutDetails = (
	properties: Readonly<{duration: string; distance: string}>,
): h.JSX.Element => {
	const [totalDuration, setTotalDuration] = useState(CONSTS.duration);
	const [maxSpeed, setMaxSpeed] = useState('0.0');

	return (
		<div class="workout-details">
			<div class="workout-details-title">Workout details</div>
			<div class="table">
				<div class="row">
					<div>
						<div class="table-value">{properties.duration}</div>
						<div class="table-explanation">Workout duration</div>
					</div>
					<div class="vertical-border height-22" />
					<div>
						<input
							class={clsx(
								'input-remove-input-visuals',
								{
									invalid: !isValidDuration(totalDuration),
								},
								'table-value',
							)}
							value={totalDuration}
							placeholder="HH:mm:ss"
							onInput={event_ => {
								const value = event_.currentTarget.value;

								setTotalDuration(
									isValidDuration(value)
										? parseDuration(value).format('HH:mm:ss')
										: value.trim(),
								);
							}}
						/>
						<div class="table-explanation">Total duration</div>
					</div>
				</div>
				<hr />
				<div class="row">
					<div>
						<div class="table-value">{properties.distance}</div>
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
						<div class="table-value">
							{toSpeed(properties.duration, properties.distance)}
						</div>
						<div class="table-explanation">Avg. speed(km/h)</div>
					</div>
					<div class="vertical-border height-22" />
					<div>
						<input
							class={clsx('input-remove-input-visuals', 'table-value', {
								invalid: !CONSTS.speedRegex.test(maxSpeed),
							})}
							value={maxSpeed}
							placeholder="0.0"
							onInput={event_ => {
								const value = event_.currentTarget.value.trim();
								setMaxSpeed(value);
							}}
						/>
						<div class="table-explanation">Max. speed(km/h)</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WorkoutDetails;
