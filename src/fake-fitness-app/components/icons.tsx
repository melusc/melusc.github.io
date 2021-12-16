import React, {useState} from 'react';
import clsx from 'clsx';

export const Bluetooth = (): JSX.Element => (
	<svg
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="1.5"
		viewBox="0 0 24 24"
		className="icon-bluetooth"
	>
		<path d="m7 8 10 8-5 4V4l5 4-10 8" />
		<path d="M4 12h1" />
		<path d="M18 12h1" />
	</svg>
);

export const Battery = ({
	batteryStatus,
}: {
	batteryStatus: string;
}): JSX.Element => {
	const batteryPercent = Number(/^\d+/.exec(batteryStatus) ?? 0);

	return (
		<svg
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
			stroke="currentColor"
			viewBox="0 0 24 24"
			transform="rotate(-90)"
			className={clsx('icon-battery', {
				invalid: batteryPercent <= 15,
			})}
		>
			<path d="M6 7h11a2 2 0 0 1 2 2v.5a.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5v.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2" />
			{batteryPercent > 0 && <path d="M7 10v4" />}
			{batteryPercent > 25 && <path d="M10 10v4" />}
			{batteryPercent > 50 && <path d="M13 10v4" />}
			{batteryPercent > 75 && <path d="M16 10v4" />}
		</svg>
	);
};

export const Wifi = (): JSX.Element => {
	const [bars, setBars] = useState(4);

	return (
		<svg
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
			viewBox="0 0 24 24"
			className="icon-interactive"
			onClick={() => {
				// Go 4 -> 2 -> 3 -> 4 -> ...
				setBars(((bars - 1) % 3) + 2);
			}}
		>
			<path d="M12 18h.01" />
			{bars > 1 && <path d="M9.172 15.172a4 4 0 0 1 5.656 0" />}
			{bars > 2 && <path d="M6.343 12.343a8 8 0 0 1 11.314 0" />}
			{bars > 3 && <path d="M3.515 9.515c4.686-4.687 12.284-4.687 17 0" />}
		</svg>
	);
};

export const Signal = (): JSX.Element => {
	const [bars, setBars] = useState(5);

	return (
		<svg
			fill="currentColor"
			viewBox="0 0 20 20"
			className="icon-reception icon-interactive"
			onClick={() => {
				setBars(((bars - 1) % 4) + 2);
			}}
		>
			<path d="M3.684 14H2.421c-.233 0-.421.224-.421.5v3c0 .276.188.5.421.5h1.263c.233 0 .421-.224.421-.5v-3c0-.276-.188-.5-.42-.5z" />
			{bars > 1 && (
				<path d="M7.158 11H5.895c-.233 0-.421.224-.421.5v6c0 .276.188.5.42.5h1.264c.233 0 .42-.224.42-.5v-6c0-.276-.187-.5-.42-.5z" />
			)}
			{bars > 2 && (
				<path d="M10.632 8H9.368c-.232 0-.42.224-.42.5v9c0 .276.188.5.42.5h1.264c.232 0 .42-.224.42-.5v-9c0-.276-.188-.5-.42-.5z" />
			)}
			{bars > 3 && (
				<path d="M14.105 5h-1.263c-.233 0-.42.224-.42.5v12c0 .276.187.5.42.5h1.263c.233 0 .421-.224.421-.5v-12c0-.276-.188-.5-.42-.5z" />
			)}
			{bars > 4 && (
				<path d="M17.579 2h-1.263c-.233 0-.421.224-.421.5v15c0 .276.188.5.42.5h1.264c.233 0 .421-.224.421-.5v-15c0-.276-.188-.5-.421-.5z" />
			)}
		</svg>
	);
};

export const AngleLeft = (): JSX.Element => (
	<svg
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="1.5"
		viewBox="0 0 11.5 17.5"
		className="icon-angle-left"
	>
		<path d="m8.75 2.75-6 6 6 6" />
	</svg>
);

export const DotsVertical = (): JSX.Element => (
	<svg
		fill="currentColor"
		stroke="currentColor"
		strokeWidth="1.5"
		viewBox="0 0 7.5 21.5"
		className="icon-dots-vertical"
	>
		<circle cx="3.75" cy="10.75" r="1" />
		<circle cx="3.75" cy="17.75" r="1" />
		<circle cx="3.75" cy="3.75" r="1" />
	</svg>
);

export const Run = (): JSX.Element => (
	<svg
		className="icon-run"
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="1.5"
		viewBox="0 0 19.5 23.501"
	>
		<path
			fill="currentColor"
			d="M12.75 3.751c.045.843-1.105 1.34-1.687.727-.643-.546-.214-1.722.63-1.725a1.004 1.004 0 0 1 1.057.998z"
		/>
		<path d="m2.75 16.751 5 1 .75-1.5" />
		<path d="M13.75 20.751v-4l-4-3 1-6" />
		<path d="M5.75 11.751v-3l5-1 3 3 3 1" />
	</svg>
);

export const Photo = (): JSX.Element => (
	<svg
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="1.5"
		viewBox="0 0 21.555 21.533"
		className="icon-photo"
	>
		<path d="M12.778 12.755c.763-.733 1.552-1.834 2.75-1.652 1.168.22 1.81 1.323 2.65 2.052l.6.6m-16 0c1.498-1.447 2.897-3.006 4.464-4.377.916-.588 2.151-.205 2.78.622l4.756 4.755m-9-12c3.485.02 6.973-.04 10.457.03 1.597.2 2.762 1.852 2.542 3.423-.018 3.335.04 6.671-.03 10.004-.2 1.597-1.852 2.762-3.423 2.542-3.334-.018-6.67.04-10.004-.03-1.597-.2-2.761-1.851-2.542-3.422.018-3.331-.04-6.665.03-9.994.185-1.426 1.53-2.59 2.97-2.553zm8 4h.01" />
	</svg>
);
