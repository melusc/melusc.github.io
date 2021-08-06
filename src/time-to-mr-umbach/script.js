const {render, Component, h} = require('preact');
const dayjs = require('dayjs');
dayjs.extend(require('dayjs/plugin/customParseFormat'));

const leadingZero = n => {
	n = Math.trunc(n);

	return `${n < 0 ? '-' : ''}${`${Math.abs(n)}`.padStart(2, '0')}`;
};

const isPlural = n => Math.abs(Math.trunc(n)) !== 1;

const date = dayjs('16/03/2021 10:40:00 +01:00', 'DD/MM/YYYY HH:mm:ss Z', true);

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
				<span>Mr. Umbach</span>
				{' returns.'}
			</div>
		);
	};

	update = () => {
		const totalSeconds = date.diff(dayjs(), 's');

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
