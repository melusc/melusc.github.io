import React, {useState} from 'react';

import clsx from 'clsx';

import {Battery as BatteryIcon} from './icons';

const isValidBatteryValue = (v: string): boolean => {
	v = v.trim();

	if (!/^(?:\d{1,2}|100)%$/.test(v)) {
		return false;
	}

	v = v.slice(0, -1);
	const parsed = Number(v);

	if (parsed <= 0 || parsed > 100) {
		return false;
	}

	return true;
};

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const getTextWidth = (text: string, font: string) => {
	if (!context) {
		throw new Error('context was null');
	}

	context.font = font;

	const metrics = context.measureText(text);
	return Math.floor(metrics.width);
};

const Battery: React.FC = () => {
	const [batteryValue, updateBattery] = useState('100%');

	const handleBatteryInput: React.FormEventHandler<
		HTMLInputElement
	> = event_ => {
		const value = event_.currentTarget.value;

		if (isValidBatteryValue(value)) {
			const percent = Number(/^\d+/.exec(value) ?? 0);

			updateBattery(`${percent}%`);
		} else {
			updateBattery(value);
		}
	};

	return (
		<>
			<input
				className={clsx('input-remove-input-visuals', 'battery-input', {
					invalid: !isValidBatteryValue(batteryValue),
				})}
				value={batteryValue}
				style={{
					width:
						getTextWidth(batteryValue, `${0.9 * 2.3}vmin "Samsung Sans"`)
							* 1.05 || 3, // If width 0 use 3 instead
				}}
				onInput={handleBatteryInput}
			/>
			<BatteryIcon batteryStatus={batteryValue} />
		</>
	);
};

export default Battery;
