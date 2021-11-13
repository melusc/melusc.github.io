import {h} from 'preact';
import {useState, StateUpdater} from 'preact/hooks';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import clsx from 'clsx';

import {timeValid, toTime} from '../scripts/date-functions';

dayjs.extend(customParseFormat);

const timeAtLoad = dayjs().format('HH:mm');

const TimeInput = (properties: {
	class?: string[] | string;
	setTime?: StateUpdater<string>;
}): h.JSX.Element => {
	const [timeValue, setTime] = useState(timeAtLoad);

	const handleTimeInput: h.JSX.GenericEventHandler<HTMLInputElement>
		= event_ => {
			const value = event_.currentTarget.value;

			const stateValue = timeValid(value)
				? toTime(value).format('HH:mm')
				: value;

			setTime(stateValue);
			properties.setTime?.(stateValue);
		};

	return (
		<input
			class={clsx(
				'input-remove-input-visuals',
				{
					invalid: !timeValid(timeValue),
				},
				properties.class,
			)}
			value={timeValue}
			placeholder="HH:mm"
			onInput={handleTimeInput}
		/>
	);
};

export default TimeInput;
