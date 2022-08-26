import clsx from 'clsx';
import React, {useState} from 'react';

export {default as AngleLeft} from 'jsx:../icons/angle-left.svg';
export {default as Bluetooth} from 'jsx:../icons/bluetooth.svg';
export {default as DotsVertical} from 'jsx:../icons/dots-vertical.svg';
export {default as Photo} from 'jsx:../icons/photo.svg';
export {default as Run} from 'jsx:../icons/run.svg';

export const Battery: React.FC<{
	batteryStatus: string;
}> = ({batteryStatus}) => {
	const batteryPercent = Number(/^\d+/.exec(batteryStatus) ?? 0);

	return (
		<svg
			fill='none'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='1.5'
			stroke='currentColor'
			viewBox='0 0 24 24'
			transform='rotate(-90)'
			className={clsx('icon-battery', {
				invalid: batteryPercent <= 15,
			})}
		>
			<path d='M6 7h11a2 2 0 0 1 2 2v.5a.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5v.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2' />
			{batteryPercent > 0 && <path d='M7 10v4' />}
			{batteryPercent > 25 && <path d='M10 10v4' />}
			{batteryPercent > 50 && <path d='M13 10v4' />}
			{batteryPercent > 75 && <path d='M16 10v4' />}
		</svg>
	);
};

export const Wifi: React.FC = () => {
	const [bars, setBars] = useState(4);

	return (
		<svg
			fill='none'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='1.5'
			viewBox='0 0 24 24'
			className='icon-interactive'
			onClick={(): void => {
				// Go 4 -> 2 -> 3 -> 4 -> ...
				setBars(((bars - 1) % 3) + 2);
			}}
		>
			<path d='M12 18h.01' />
			{bars > 1 && <path d='M9.172 15.172a4 4 0 0 1 5.656 0' />}
			{bars > 2 && <path d='M6.343 12.343a8 8 0 0 1 11.314 0' />}
			{bars > 3 && <path d='M3.515 9.515c4.686-4.687 12.284-4.687 17 0' />}
		</svg>
	);
};

export const Signal: React.FC = () => {
	const [bars, setBars] = useState(5);

	return (
		<svg
			fill='currentColor'
			viewBox='0 0 20 20'
			className='icon-reception icon-interactive'
			onClick={(): void => {
				setBars(((bars - 1) % 4) + 2);
			}}
		>
			<path d='M3.684 14H2.421c-.233 0-.421.224-.421.5v3c0 .276.188.5.421.5h1.263c.233 0 .421-.224.421-.5v-3c0-.276-.188-.5-.42-.5z' />
			{bars > 1 && (
				<path d='M7.158 11H5.895c-.233 0-.421.224-.421.5v6c0 .276.188.5.42.5h1.264c.233 0 .42-.224.42-.5v-6c0-.276-.187-.5-.42-.5z' />
			)}
			{bars > 2 && (
				<path d='M10.632 8H9.368c-.232 0-.42.224-.42.5v9c0 .276.188.5.42.5h1.264c.232 0 .42-.224.42-.5v-9c0-.276-.188-.5-.42-.5z' />
			)}
			{bars > 3 && (
				<path d='M14.105 5h-1.263c-.233 0-.42.224-.42.5v12c0 .276.187.5.42.5h1.263c.233 0 .421-.224.421-.5v-12c0-.276-.188-.5-.42-.5z' />
			)}
			{bars > 4 && (
				<path d='M17.579 2h-1.263c-.233 0-.421.224-.421.5v15c0 .276.188.5.42.5h1.264c.233 0 .421-.224.421-.5v-15c0-.276-.188-.5-.421-.5z' />
			)}
		</svg>
	);
};
