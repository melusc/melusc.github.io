// eslint-disable-next-line import/no-unassigned-import
import 'preact/devtools';

import {render, h, Component} from 'preact';

type TimeValue = [string, string];

type AppState = {
	hour: TimeValue;
	min: TimeValue;
	sec: TimeValue;
};

const toTimeValue = (n: number): TimeValue =>
	`${n}`.padStart(2, '0').split('') as TimeValue;

const ClockLine = ({to, active}: {to: number; active: string}) => (
	<div class={`clock-row active-child-${active}`}>
		{Array.from({length: to + 1}, (_v, index) => (
			<div key={index} class={Number(active) === index ? 'active' : undefined}>
				{index}
			</div>
		))}
	</div>
);

const date = new Date();

class App extends Component<Record<string, unknown>, AppState> {
	requestAnimationFrameId = 0;

	override state: AppState = {
		hour: toTimeValue(date.getHours()),
		min: toTimeValue(date.getMinutes()),
		sec: toTimeValue(date.getSeconds()),
	};

	update = () => {
		const date = new Date();

		this.setState({
			hour: toTimeValue(date.getHours()),
			min: toTimeValue(date.getMinutes()),
			sec: toTimeValue(date.getSeconds()),
		});

		this.requestAnimationFrameId = requestAnimationFrame(this.update);
	};

	override componentWillUnmount = () => {
		cancelAnimationFrame(this.requestAnimationFrameId);
	};

	override componentDidMount = () => {
		this.update();
	};

	render = () => {
		const {hour, min, sec} = this.state;

		return (
			<div class="clock">
				<ClockLine to={2} active={hour[0]} />
				<ClockLine to={9} active={hour[1]} />
				<div class="colon">:</div>
				<ClockLine to={5} active={min[0]} />
				<ClockLine to={9} active={min[1]} />
				<div class="colon">:</div>
				<ClockLine to={5} active={sec[0]} />
				<ClockLine to={9} active={sec[1]} />
			</div>
		);
	};
}

const root = document.querySelector('#root');

if (root) {
	render(<App />, root);
}
