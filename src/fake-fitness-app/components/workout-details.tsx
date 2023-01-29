import clsx from 'clsx';
import React, {useState} from 'react';

import * as CONSTS from '../scripts/consts';
import {
	calcDurationSecondsSinceMidnight,
	isValidDuration,
	parseDuration,
} from '../scripts/date-functions';
import {ReactComponent as Run} from '../icons/run.svg';

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

const WorkoutDetails: React.FC<{duration: string; distance: string}> = ({
	duration,
	distance,
}) => {
	const [totalDuration, setTotalDuration] = useState(CONSTS.duration);
	const [maxSpeed, setMaxSpeed] = useState('0.0');

	return (
		<div className='workout-details'>
			<div className='workout-details-title'>Workout details</div>
			<div className='table'>
				<div className='row'>
					<div>
						<div className='table-value'>{duration}</div>
						<div className='table-explanation'>Workout duration</div>
					</div>
					<div className='vertical-border height-22' />
					<div>
						<input
							className={clsx(
								'input-remove-input-visuals',
								{
									invalid: !isValidDuration(totalDuration),
								},
								'table-value',
							)}
							value={totalDuration}
							placeholder='HH:mm:ss'
							onInput={(event_): void => {
								const value = event_.currentTarget.value;

								setTotalDuration(
									isValidDuration(value)
										? parseDuration(value).format('HH:mm:ss')
										: value.trim(),
								);
							}}
						/>
						<div className='table-explanation'>Total duration</div>
					</div>
				</div>
				<hr />
				<div className='row'>
					<div>
						<div className='table-value'>{distance}</div>
						<div className='table-explanation'>Distance(km)</div>
					</div>
					<div className='vertical-border height-22' />
					<div>
						<Run />
					</div>
				</div>
				<hr />
				<div className='row'>
					<div>
						<div className='table-value'>{toSpeed(duration, distance)}</div>
						<div className='table-explanation'>Avg. speed(km/h)</div>
					</div>
					<div className='vertical-border height-22' />
					<div>
						<input
							className={clsx('input-remove-input-visuals', 'table-value', {
								invalid: !CONSTS.speedRegex.test(maxSpeed),
							})}
							value={maxSpeed}
							placeholder='0.0'
							onInput={(event_): void => {
								const value = event_.currentTarget.value.trim();
								setMaxSpeed(value);
							}}
						/>
						<div className='table-explanation'>Max. speed(km/h)</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WorkoutDetails;
