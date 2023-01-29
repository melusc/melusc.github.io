import React from 'react';
// eslint-disable-next-line n/file-extension-in-import
import {createRoot} from 'react-dom/client';

type TimeValue = [string, string];

type AppState = {
	hour: TimeValue;
	min: TimeValue;
	sec: TimeValue;
};

const toTimeValue = (n: number): TimeValue =>
	`${n}`.padStart(2, '0').split('') as TimeValue;

const ClockLine: React.FC<{
	to: number;
	active: string;
}> = ({to, active}) => (
	<div
		className='clock-row'
		style={{'--offset': active} as React.CSSProperties}
	>
		{Array.from({length: to + 1}, (_v, index) => (
			<div
				key={index}
				className={Number(active) === index ? 'active' : undefined}
			>
				{index}
			</div>
		))}
	</div>
);

const date = new Date();

class App extends React.Component<Record<string, unknown>, AppState> {
	requestAnimationFrameId = 0;

	override state: AppState = {
		hour: toTimeValue(date.getHours()),
		min: toTimeValue(date.getMinutes()),
		sec: toTimeValue(date.getSeconds()),
	};

	update = (): void => {
		const date = new Date();

		this.setState({
			hour: toTimeValue(date.getHours()),
			min: toTimeValue(date.getMinutes()),
			sec: toTimeValue(date.getSeconds()),
		});

		this.requestAnimationFrameId = requestAnimationFrame(this.update);
	};

	override componentWillUnmount(): void {
		cancelAnimationFrame(this.requestAnimationFrameId);
	}

	override componentDidMount(): void {
		this.update();
	}

	override render(): JSX.Element {
		const {hour, min, sec} = this.state;

		return (
			<div className='clock'>
				<ClockLine to={2} active={hour[0]} />
				<ClockLine to={9} active={hour[1]} />
				<div className='colon'>:</div>
				<ClockLine to={5} active={min[0]} />
				<ClockLine to={9} active={min[1]} />
				<div className='colon'>:</div>
				<ClockLine to={5} active={sec[0]} />
				<ClockLine to={9} active={sec[1]} />
			</div>
		);
	}
}

const container = document.querySelector('#root');

if (container) {
	const root = createRoot(container);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
}
