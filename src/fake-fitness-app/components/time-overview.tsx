import {h} from 'preact';
import {useState, StateUpdater} from 'preact/hooks';
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

export const TimeOverview = (properties: {
	setDuration: StateUpdater<string>;
	setDistance: StateUpdater<string>;
}): h.JSX.Element => {
	const [durationValue, setDuration] = useState(CONSTS.duration);
	const [distanceValue, setDistance] = useState(CONSTS.distance);

	const timePerDistance = calcTimePerDistance(distanceValue, durationValue);

	return (
		<div class="time-overview">
			<div class="duration">
				<input
					value={durationValue}
					class={clsx('input-remove-input-visuals', {
						invalid: !isValidDuration(durationValue),
					})}
					onInput={event_ => {
						const dur = event_.currentTarget.value.trim();
						setDuration(dur);
						properties.setDuration(dur);
					}}
				/>
			</div>
			<div class="distance">
				<div>
					<input
						value={distanceValue}
						class={clsx('input-remove-input-visuals', {
							invalid: !CONSTS.distanceRegex.test(distanceValue.trim()),
						})}
						placeholder="0.00"
						onInput={event_ => {
							const distance = event_.currentTarget.value.trim();
							setDistance(distance);
							properties.setDistance(distance);
						}}
					/>
					<small>km</small>
				</div>
				<div class="vertical-border height-12" />
				<div
					class={clsx('time-per-distance', {
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
