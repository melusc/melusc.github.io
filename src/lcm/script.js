import {render, h, Component, createRef} from 'preact';
import {lcmArray} from './functions.js';

(() => {
	const root = document.querySelector('#root');

	class App extends Component {
		state = {};

		inputRef = createRef();

		timeout = 0;

		boundLcm = lcmArray(Component.prototype.setState.bind(this));

		clearTimeout = () => {
			clearTimeout(this.timeout);
		};

		setTimeout = arguments_ => {
			this.clearTimeout();

			this.timeout = setTimeout(this.boundLcm, 100, arguments_);
		};

		render = () => {
			const {inputValue, outputValue, tooLarge} = this.state;

			return (
				<div class="box">
					<input
						ref={this.inputRef}
						placeholder="2, 5, 9-13"
						onInput={this.handleInput}
					/>
					<div>Parsed input:</div>
					<div>
						{(inputValue
							&& (tooLarge ? 'One or more numbers were too large' : inputValue))
							|| 'Enter some numbers'}
					</div>
					<hr />
					<div>lcm:</div>
					<div>
						{(outputValue
							&& (tooLarge
								? 'One or more numbers were too large'
								: outputValue))
							|| 'Enter some numbers'}
					</div>
				</div>
			);
		};

		handleInput = () => {
			const originalValue = this.inputRef.current.value;
			let mutatingValue = originalValue;

			mutatingValue = mutatingValue
				// Since fullstops aren't allowed just turn them into commas
				.replace(/\./g, ',')
				// Remove non-necessary characters
				.replace(/[^\d,-]/g, '')
				.split(',')
				.filter(currentValue => currentValue.trim() !== '');
			const newVals = [];

			// Turn 4-10 into [4,5,6,7,8,9,10]
			for (const item of mutatingValue) {
				if (/-?\d+-{1,2}\d+/.test(`${item}`)) {
					let {firstNumber, secondNumber} = item.match(
						/(?<firstNumber>-?\d+)-(?<secondNumber>-?\d+)/,
					).groups;
					firstNumber = Math.trunc(Number(firstNumber));
					secondNumber = Math.trunc(Number(secondNumber));

					const lower = Math.min(firstNumber, secondNumber);
					const upper = Math.max(firstNumber, secondNumber);

					for (let index = lower; index <= upper; ++index) {
						newVals.push(index);
					}
				} else {
					const newValue = Math.trunc(Number(item));
					if (Number.isFinite(newValue)) {
						newVals.push(newValue);
					}
				}
			}

			if (newVals.some(value => !Number.isSafeInteger(value))) {
				this.setState({
					tooLarge: true,
				});
			} else {
				newVals.sort((a, b) => a - b);

				const uniques = [...new Set(newVals)];

				this.setState(state => {
					const inputValue = uniques.join(', ');

					if (inputValue !== state.inputValue) {
						this.setTimeout(uniques);

						return {inputValue, tooLarge: false};
					}

					return {};
				});
			}
		};
	}

	render(<App />, root);
})();
