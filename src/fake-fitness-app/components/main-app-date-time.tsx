import React, {useState} from 'react';
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
import TimeInput from './time-input';

dayjs.extend(customParseFormat);

const dateAtLoad = dayjs().format('D MMM');

const MainAppDateTime: React.FC<{
	duration: string;
}> = ({duration}) => {
	const [date, setDate] = useState(dateAtLoad);

	const [timeFrom, setTimeFrom] = useState(dayjs().format('HH:mm'));

	const handleDateInput: React.FormEventHandler<HTMLInputElement> = event_ => {
		const value = event_.currentTarget.value;

		if (dateValid(value)) {
			setDate(toDate(value).format('D MMM'));
		} else {
			setDate(value);
		}
	};

	const durationTimeSinceMidnightInSeconds
		= calcDurationSecondsSinceMidnight(duration);

	return (
		<div className='main-app-date-time'>
			<div className='day-date-inputs'>
				<span>{dateValid(date) && toDate(date).format('ddd, ')}</span>
				<input
					className={clsx('input-remove-input-visuals', {
						invalid: !dateValid(date),
					})}
					value={date}
					onInput={handleDateInput}
				/>
			</div>
			<div className='time-inputs'>
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

export default MainAppDateTime;
