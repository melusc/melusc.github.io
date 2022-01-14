import React from 'react';
import ReactDOM from 'react-dom';

const leadingZero = (n: number): string => {
	n = Math.trunc(n);

	return `${n < 0 ? '-' : ''}${Math.abs(n).toString().padStart(2, '0')}`;
};

const isPlural = (n: number): boolean => Math.abs(Math.trunc(n)) !== 1;

const themeToggle = document.querySelector<HTMLInputElement>('#theme-toggle')!;

themeToggle.addEventListener('change', () => {
	document.body.classList.toggle('light', !themeToggle.checked);
});

const themeShouldBeDark = matchMedia
	? matchMedia('(prefers-color-scheme: dark)').matches
	: true;

document.body.classList.toggle('light', !themeShouldBeDark);

themeToggle.checked = themeShouldBeDark;

const summerHolidays = new Date(2022, 6, 7, 14, 40, 0);
summerHolidays.setUTCHours(12);

const summerHolidaysTime = summerHolidays.getTime();

type AppState = {
	d: number;
	h: number;
	m: number;
	s: number;
};

class App extends React.Component<Record<string, unknown>, AppState> {
	override state: AppState = {
		d: 0,
		h: 0,
		m: 0,
		s: 0,
	};

	previousDiff = 0;

	override render(): JSX.Element {
		const {d, h: h_, m, s} = this.state;

		return (
			<div>
				<span>{d}</span>
				{' day'}
				{isPlural(d) && 's'}
				{', '}
				<span>{leadingZero(h_)}</span>
				{' hour'}
				{isPlural(h_) && 's'}
				{', '}
				<span>{leadingZero(m)}</span>
				{' minute'}
				{isPlural(m) && 's'}
				{' and '}
				<span>{leadingZero(s)}</span>
				{' second'}
				{isPlural(s) && 's'}
				{' until '}
				<span>summer holidays</span>
			</div>
		);
	}

	update = (): void => {
		const totalSeconds = Math.trunc((summerHolidaysTime - Date.now()) / 1000);

		if (this.previousDiff !== totalSeconds) {
			const seconds = totalSeconds % 60;
			const minutes = (totalSeconds / 60) % 60;
			const hours = (totalSeconds / (60 * 60)) % 24;
			const days = Math.trunc(totalSeconds / (60 * 60 * 24));

			this.setState({
				s: seconds,
				m: minutes,
				h: hours,
				d: days,
			});

			this.previousDiff = totalSeconds;
		}

		requestAnimationFrame(this.update);
	};

	override componentDidMount(): void {
		this.update();
	}
}

const root = document.querySelector<HTMLDivElement>('#root')!;

ReactDOM.hydrate(
	<React.StrictMode>
		<App />
	</React.StrictMode>,

	root,
);
