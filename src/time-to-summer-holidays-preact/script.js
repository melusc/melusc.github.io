const {render, Component, h} = require('preact');

const leadingZero = n => {
	n = Math.trunc(n);

	return `${n < 0 ? '-' : ''}${`${Math.abs(n)}`.padStart(2, '0')}`;
};

const isPlural = n => Math.abs(Math.trunc(n)) !== 1;

const themeToggle = document.querySelector('#theme-toggle');
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

const root = document.querySelector('#root');

class App extends Component {
	state = {
		d: 0,
		dPl: true,
		h: 0,
		hPl: true,
		m: 0,
		mPl: true,
		s: 0,
		sPl: true,
	};

	render = () => {
		const {d, dPl, h: h_, hPl, m, mPl, s, sPl} = this.state;

		return (
			<div>
				<span>{d}</span>
				{' day'}
				{dPl && 's'}
				{', '}
				<span>{h_}</span>
				{' hour'}
				{hPl && 's'}
				{', '}
				<span>{m}</span>
				{' minute'}
				{mPl && 's'}
				{' and '}
				<span>{s}</span>
				{' second'}
				{sPl && 's'}
				{' until '}
				<span>summer holidays</span>
			</div>
		);
	};

	update = () => {
		const totalSeconds = (summerHolidaysTime - Date.now()) / 1000;

		const seconds = totalSeconds % 60;
		const minutes = (totalSeconds / 60) % 60;
		const hours = (totalSeconds / (60 * 60)) % 24;
		const days = Math.trunc(totalSeconds / (60 * 60 * 24));

		this.setState({
			s: leadingZero(seconds),
			sPl: isPlural(seconds),
			m: leadingZero(minutes),
			mPl: isPlural(minutes),
			h: leadingZero(hours),
			hPl: isPlural(hours),
			d: days,
			dPl: isPlural(days),
		});

		requestAnimationFrame(this.update);
	};

	componentDidMount = () => {
		this.update();
	};
}

render(<App />, root, root.firstElementChild);
