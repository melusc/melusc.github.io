import {h} from 'preact';
import {useState} from 'preact/hooks';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import clsx from 'clsx';

import '../styles/main-app-date-time.scss';

import {
	calcDurationSecondsSinceMidnight,
	dateValid,
	timeValid,
	toDate,
	toTime,
} from '../scripts/date-functions';
import {TimeInput} from './time-input';

dayjs.extend(customParseFormat);

const dateAtLoad = dayjs().format('D MMM');

export const MainAppDateTime = (properties: {
	duration: string;
}): h.JSX.Element => {
	const [dateValue, setDate] = useState(dateAtLoad);

	const [timeFrom, setTimeFrom] = useState(dayjs().format('HH:mm'));

	const handleDateInput: h.JSX.GenericEventHandler<HTMLInputElement>
		= event_ => {
			const value = event_.currentTarget.value;

			if (dateValid(value)) {
				setDate(toDate(value).format('D MMM'));
			} else {
				setDate(value);
			}
		};

	const durationTimeSinceMidnightInSeconds = calcDurationSecondsSinceMidnight(
		properties.duration,
	);

	return (
		<div class="main-app-date-time">
			<div class="day-date-inputs">
				<span>{dateValid(dateValue) && toDate(dateValue).format('ddd, ')}</span>
				<input
					class={clsx('input-remove-input-visuals', {
						invalid: !dateValid(dateValue),
					})}
					value={dateValue}
					onInput={handleDateInput}
				/>
			</div>
			<div class="time-inputs">
				<TimeInput setTime={setTimeFrom} />
				<span>
					{'-  '}
					{timeValid(timeFrom)
						&& durationTimeSinceMidnightInSeconds !== false
						&& toTime(timeFrom)
							.add(durationTimeSinceMidnightInSeconds, 's')
							.format('HH:mm')}
				</span>
			</div>
		</div>
	);
};
