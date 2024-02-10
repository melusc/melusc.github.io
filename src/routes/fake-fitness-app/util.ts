import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

import {distanceRegex} from './consts.ts';

import {browser} from '$app/environment';

dayjs.extend(customParseFormat);

let context: CanvasRenderingContext2D | undefined;

export function getTextWidth(text: string, font: string): number {
	if (!browser) {
		return 45;
	}

	if (!context) {
		const canvas = document.createElement('canvas');
		context = canvas.getContext('2d')!;
	}

	context.font = font;

	const metrics = context.measureText(text);
	return Math.floor(metrics.width);
}

export function calculateTimePerDistance(
	distance: string,
	duration: string,
): string | false {
	if (!isValidDuration(duration)) {
		return false;
	}

	if (!distanceRegex.test(distance)) {
		return false;
	}

	const parsedDistance = Number.parseFloat(distance);

	if (parsedDistance === 0) {
		// Avoid division by 0
		return '0\'00"';
	}

	const secondsSinceMidnight = calculateSecondsSinceMidnight(duration);

	if (secondsSinceMidnight === false) {
		return false;
	}

	const distancePerTime = secondsSinceMidnight / parsedDistance;

	const diff = midnight.add(distancePerTime, 's');

	// If hours is 0, don't display it
	return diff.get('h') === 0
		? diff.format('m\'ss"')
		: diff.format('H[h] m\'ss"');
}

export function toSpeed(duration: string, distance: string): string | false {
	const durationInSeconds = calculateSecondsSinceMidnight(duration);

	if (durationInSeconds === false) {
		return false;
	}

	if (!distanceRegex.test(distance)) {
		return false;
	}

	if (durationInSeconds === 0) {
		// Avoid division by 0
		return '0.0';
	}

	const parsedDistanceInMeters = Number(distance) * 1000;

	const speedInMetersPerSecond = parsedDistanceInMeters / durationInSeconds;

	return (speedInMetersPerSecond * 3.6).toFixed(1);
}

export const midnight = dayjs('00:00:00', 'HH:mm:ss', true);

export const parseDuration = (duration: string): dayjs.Dayjs =>
	dayjs(duration.trim(), ['HH:mm:ss', 'H:mm:ss'], true);
export const isValidDuration = (duration: string): boolean =>
	parseDuration(duration).isValid();

export const calculateSecondsSinceMidnight = (
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
