import {render, Component, h} from 'preact';

type MainState = {
	posX: number;
	colour: number;
};

class Main extends Component<Record<string, unknown>, MainState> {
	override state: MainState = {
		posX: 0,
		colour: 0,
	};

	render = () => {
		const {posX, colour} = this.state;

		return (
			<svg
				fill={`hsl(${colour}, 100%, 70%)`}
				stroke="#000"
				stroke-linejoin="round"
				stroke-width="1.5"
				viewBox="0 0 256 256"
			>
				<path d={`M${posX} 10L246 246H10z`} />
			</svg>
		);
	};

	frame = () => {
		const range = (Date.now() / 1024) % 4;
		//                           ^ For the speed, bigger is slower
		//                                  ^ Range, 0 to 4
		/* Doing this instead of perfomance.now and DOMHighResTimeStamp
       because it has the same effect but when refreshing the page
       it continues from the same position and color
    */

		const colour = range * 90; // Turn [0, 4) into [0, 360)

		// eslint-disable-next-line no-mixed-operators
		const posX = Math.abs((range * 59 - 118) * 2) + 10;
		//                                 ^ turn [0, 4) into [0, 236)
		//                                        ^ turn [0, 236) into [-118, 118)
		//                                                ^ turn [-118, 118) into [-236, 236)
		//           ^ turn [-236, 236] into [0, 236], but it now behaves like css' `animation-direction: alternate`
		//                                                      ^ turn [0, 236) into [10, 246) for padding

		this.setState({posX, colour});

		requestAnimationFrame(this.frame);
	};

	override componentDidMount = () => {
		this.frame();
	};
}

const root = document.querySelector('#root');

if (root) {
	render(<Main />, root);
}
