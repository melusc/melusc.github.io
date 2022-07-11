import React, {useState} from 'react';

import clsx from 'clsx';

import {Battery as BatteryIcon} from './icons';

// Allow all numbers from 1-100
// Disallow leading zeroes and zero
const isValidBatteryValue = (v: string): boolean =>
	/^([1-9]\d?|100)%$/.test(v.trim());

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const getTextWidth = (text: string, font: string): number => {
	if (!context) {
		throw new Error('context was null');
	}

	context.font = font;

	const metrics = context.measureText(text);
	return Math.floor(metrics.width);
};

const Battery: React.FC = () => {
	const [battery, setBattery] = useState('100%');

	const handleBatteryInput: React.FormEventHandler<
		HTMLInputElement
	> = event_ => {
		const value = event_.currentTarget.value;
		setBattery(value);
	};

	return (
		<>
			<input
				className={clsx('input-remove-input-visuals', 'battery-input', {
					invalid: !isValidBatteryValue(battery),
				})}
				value={battery}
				style={{
					width: Math.max(
						getTextWidth(battery, `${0.9 * 2.3}vmin "Samsung Sans"`) * 1.1,
						10,
					),
				}}
				onInput={handleBatteryInput}
			/>
			<BatteryIcon batteryStatus={battery} />
		</>
	);
};

export default Battery;
