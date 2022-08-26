import clsx from 'clsx';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import React, {useState} from 'react';

import {timeValid, toTime} from '../scripts/date-functions';

dayjs.extend(customParseFormat);

const timeAtLoad = dayjs().format('HH:mm');

const TimeInput: React.FC<{
	className?: string[] | string;
	setTime?: React.Dispatch<React.SetStateAction<string>>;
}> = ({className, setTime: parentSetTime}) => {
	const [time, setTime] = useState(timeAtLoad);

	const handleTimeInput: React.FormEventHandler<HTMLInputElement> = event_ => {
		const value = event_.currentTarget.value;

		const stateValue = timeValid(value) ? toTime(value).format('HH:mm') : value;

		setTime(stateValue);
		parentSetTime?.(stateValue);
	};

	return (
		<input
			className={clsx(
				'input-remove-input-visuals',
				{
					invalid: !timeValid(time),
				},
				className,
			)}
			value={time}
			placeholder='HH:mm'
			onInput={handleTimeInput}
		/>
	);
};

export default TimeInput;
