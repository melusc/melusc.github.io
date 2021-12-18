import React, {useState} from 'react';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import clsx from 'clsx';

import {
	calcDurationSecondsSinceMidnight,
	isValidDuration,
	midnight,
} from '../scripts/date-functions';
import * as CONSTS from '../scripts/consts';

import '../styles/time-overview.scss';

dayjs.extend(customParseFormat);

const invalid = `invalid__${Math.random()}`;

const calcTimePerDistance = (distance: string, duration: string): string => {
	if (!isValidDuration(duration)) {
		return invalid;
	}

	if (!CONSTS.distanceRegex.test(distance)) {
		return invalid;
	}

	const parsedDistance = Number.parseFloat(distance);

	if (parsedDistance === 0) {
		// Avoid division by 0
		return '0\'00"';
	}

	const secondsSinceMidnight = calcDurationSecondsSinceMidnight(duration);

	if (secondsSinceMidnight === false) {
		return invalid;
	}

	const distancePerTime = secondsSinceMidnight / parsedDistance;

	const diff = midnight.add(distancePerTime, 's');

	// If hours is 0, don't display it
	return diff.get('h') === 0
		? diff.format('m\'ss"')
		: diff.format('H[h] m\'ss"');
};

const TimeOverview: React.FC<{
	setDuration: React.Dispatch<React.SetStateAction<string>>;
	setDistance: React.Dispatch<React.SetStateAction<string>>;
}> = ({setDuration: parentSetDuration, setDistance: parentSetDistance}) => {
	const [durationValue, setDuration] = useState(CONSTS.duration);
	const [distanceValue, setDistance] = useState(CONSTS.distance);

	const timePerDistance = calcTimePerDistance(distanceValue, durationValue);

	return (
		<div className="time-overview">
			<div className="duration">
				<input
					value={durationValue}
					className={clsx('input-remove-input-visuals', {
						invalid: !isValidDuration(durationValue),
					})}
					onInput={event_ => {
						const dur = event_.currentTarget.value.trim();
						setDuration(dur);
						parentSetDuration(dur);
					}}
				/>
			</div>
			<div className="distance">
				<div>
					<input
						value={distanceValue}
						className={clsx('input-remove-input-visuals', {
							invalid: !CONSTS.distanceRegex.test(distanceValue.trim()),
						})}
						placeholder="0.00"
						onInput={event_ => {
							const distance = event_.currentTarget.value.trim();
							setDistance(distance);
							parentSetDistance(distance);
						}}
					/>
					<small>km</small>
				</div>
				<div className="vertical-border height-12" />
				<div
					className={clsx('time-per-distance', {
						invalid: timePerDistance === invalid,
					})}
				>
					{timePerDistance === invalid ? 'Invalid' : timePerDistance}
					<small>/km</small>
				</div>
			</div>
		</div>
	);
};

export default TimeOverview;
