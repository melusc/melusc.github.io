import {render, h, Component, createRef} from 'preact';
import {gcdArray} from './functions';

const enum States {
	valid,
	divBy0,
	tooLarge,
}

type AppState = {
	state: States;
	inputValue: string;
	outputValue: string;
};

class App extends Component<Record<string, unknown>, AppState> {
	override state: AppState = {
		state: States.valid,
		inputValue: '',
		outputValue: '',
	};

	inputRef = createRef<HTMLInputElement>();

	timeout = 0;

	calcOutput = (input: number[]) => {
		this.setState({
			outputValue: gcdArray(input),
		});
	};

	clearTimeout = () => {
		clearTimeout(this.timeout);
	};

	setTimeout = (input: number[]) => {
		this.clearTimeout();

		// Window.setTimeout definitely returns number for typescript
		this.timeout = window.setTimeout(this.calcOutput, 100, input);
	};

	render = () => {
		const {inputValue, outputValue, state} = this.state;

		return (
			<div class="box">
				<input
					ref={this.inputRef}
					placeholder="2, 5, 9-13"
					onInput={this.handleInput}
				/>
				<div>Parsed input:</div>

				{state === States.tooLarge && (
					<div>One or more numbers were too large</div>
				)}
				{state === States.divBy0 && <div>One or more numbers were 0</div>}
				{state === States.valid && (
					<div>{inputValue || 'Enter some numbers'}</div>
				)}

				<hr />
				<div>gcd:</div>
				{state === States.tooLarge && (
					<div>One or more numbers were too large</div>
				)}
				{state === States.divBy0 && <div>One or more numbers were 0</div>}
				{state === States.valid && (
					<div>{outputValue || 'Enter some numbers'}</div>
				)}
			</div>
		);
	};

	handleInput = () => {
		const input = this.inputRef.current;
		if (!input) {
			return;
		}

		const originalValue = input.value;
		const split = originalValue
			// Since fullstops aren't allowed just turn them into commas
			.replace(/\./g, ',')
			// Remove non-necessary characters
			.replace(/[^\d,-]/g, '')
			.split(',')
			.filter(currentValue => currentValue.trim() !== '');
		const newVals = [];

		// Turn 4-10 into [4,5,6,7,8,9,10]
		for (const item of split) {
			const match = /(?<first>-?\d+)-(?<second>-?\d+)/.exec(item);
			if (match?.groups) {
				const groups = match.groups;
				const sFirstNumber = groups['first'];
				const sSecondNumber = groups['second'];
				const firstNumber = Math.trunc(Number(sFirstNumber));
				const secondNumber = Math.trunc(Number(sSecondNumber));

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
				state: States.tooLarge,
			});
		} else if (newVals.includes(0)) {
			this.setState({
				state: States.divBy0,
			});
		} else {
			newVals.sort((a, b) => a - b);

			const uniques = [...new Set(newVals)];

			this.setState((state): Partial<AppState> => {
				const inputValue = uniques.join(', ');

				if (inputValue !== state.inputValue) {
					this.setTimeout(uniques);

					return {inputValue, state: States.valid};
				}

				return {};
			});
		}
	};
}

const root = document.querySelector<HTMLDivElement>('#root');
if (root) {
	render(<App />, root);
}
