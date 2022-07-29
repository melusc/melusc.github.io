import clsx from 'clsx';
import React from 'react';

export const Cell: React.FC<{
	isValid: boolean;
	isFocused: boolean;
	element: string | undefined;
	onClick: () => void;
}> = ({isValid, isFocused, onClick, element}) => (
	<div
		className={clsx('cell', {
			'invalid-input': !isValid,
			'focused-cell': isFocused,
		})}
		onMouseDown={onClick}
		onTouchStart={(event_): void => {
			// If this fires preventDefault because otherwise onMouseDown will fire a bit later
			// and cause some flickering if onTouchStart, onTouchStart, onMouseDown, onMouseDown (in that order) fires
			// if the user switches between cells too quickly
			event_.preventDefault();
			onClick();
		}}
	>
		{element}
	</div>
);
