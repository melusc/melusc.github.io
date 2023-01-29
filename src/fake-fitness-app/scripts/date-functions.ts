import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const midnight = dayjs('00:00:00', 'HH:mm:ss', true);

export const parseDuration = (duration: string): dayjs.Dayjs =>
	dayjs(duration.trim(), ['HH:mm:ss', 'H:mm:ss'], true);
export const isValidDuration = (duration: string): boolean =>
	parseDuration(duration).isValid();

export const calcDurationSecondsSinceMidnight = (
	duration: string,
): number | false => {
	const parsedDuration = parseDuration(duration);

	if (!parsedDuration.isValid()) {
		return false;
	}

	return parsedDuration.diff(midnight, 's', true);
};

export const toDate = (v: string): dayjs.Dayjs =>
	dayjs(v.trim(), ['D MMM', 'DD MMM'], true);
export const dateValid = (v: string): boolean => toDate(v).isValid();

export const toTime = (v: string): dayjs.Dayjs =>
	dayjs(v.trim(), ['HH:mm', 'H:mm'], true);
export const timeValid = (v: string): boolean => toTime(v).isValid();
