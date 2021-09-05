import type {Except} from 'type-fest';

import hexRgb from 'hex-rgb';
import rgbHex from 'rgb-hex';

import {debounce} from 'lodash';

import {render, h, Component, Fragment} from 'preact';
import {produce} from 'immer';
import clsx from 'clsx';

import {isOfType} from './util';

const inputKeys = ['hex', 'red', 'green', 'blue', 'alpha'] as const;
type InputKeys = typeof inputKeys[number];

type Inputs = {
	[key in InputKeys]: string;
};

type RgbaLabels = keyof Except<Inputs, 'hex'>;

type AppState = {
	inputs: Inputs;
};

const Input = (properties: Record<string, unknown>) => (
	<>
		<input {...properties} />
		<div class="input-pseudo-border" />
	</>
);

const sanitiseHex = (hex: string, shouldShorten = true): string => {
	hex = hex.trim();

	// Remove leading "#"
	hex = `#${hex}`.replace(/^#+/g, '');

	let shortFormPossible
		= shouldShorten && (hex.length === 8 || hex.length === 6);
	let shortForm = '';
	for (let index = 0; index < hex.length && shortFormPossible; index += 2) {
		if (hex[index] === hex[index + 1]) {
			shortForm += hex[index];
		} else {
			shortFormPossible = false;
			break;
		}
	}

	return `#${shortFormPossible ? shortForm : hex}`;
};

const setHashInstantly = (hex: string) => {
	hex = sanitiseHex(hex);

	if (hex !== location.hash) {
		/*
      https://developer.mozilla.org/en-US/docs/Web/API/History/pushState#description
      -> history.pushState doesn't trigger hashchange

      Alternative would be storing current hex and location.hash and
      when setHash updates the hash, the stored hex and hash will be the same
      and if the user goes back in history the stored hex and hash will not be the same
    */
		history.pushState({}, '', hex);
	}
};

/*
  To not spam the history
*/
const setHashDebounced = debounce(setHashInstantly, 800, {
	leading: true,
	trailing: true,
	maxWait: 1500,
});

const rgbaLabels: ReadonlySet<RgbaLabels> = new Set([
	'red',
	'green',
	'blue',
	'alpha',
]);

class App extends Component<Record<string, unknown>, AppState> {
	override state: AppState = {
		inputs: {
			hex: '',
			red: '',
			green: '',
			blue: '',
			alpha: '',
		},
	};

	invalidInputs = new Set<keyof Inputs>();

	render = () => {
		const {invalidInputs, state, randomColour, handleInput, handleScroll}
			= this;
		const {inputs} = state;
		const {hex, alpha} = inputs;
		const labels: Array<keyof Inputs> = ['red', 'green', 'blue'];

		return (
			<div
				class="horizontal-vertical-center"
				/*
          If style is an object preact basically does:
          style.backgroundColor = value
          and if hex is '#', Firefox (but not Chromium)
          doesn't modify the color because the color is
          invalid.

          So instead we use a string to force invalid colors
          to be set as well, in which case it will be white instead
        */
				style={`background-color:${hex}`}
			>
				<div class="floating-box">
					<div class="row">
						<div>Hex</div>
						<div class="inputs-rows">
							<Input
								maxLength={9}
								value={hex}
								placeholder="#"
								name="hex"
								class={clsx({
									invalid: invalidInputs.has('hex'),
								})}
								onInput={handleInput}
							/>
						</div>
					</div>

					<div class="row">
						<div>Rgba</div>
						<div class="inputs-rows">
							{labels.map(key => (
								<Input
									key={key}
									type="number"
									min="0"
									max="255"
									maxLength={3}
									name={key}
									placeholder={key}
									value={inputs[key]}
									class={clsx({
										invalid: invalidInputs.has(key),
									})}
									onInput={handleInput}
									onWheel={handleScroll}
								/>
							))}
							<Input
								// [type="tel"] because percent is valid in our use-case
								// but not valid for [type="number"]
								type="tel"
								min="0"
								max="1"
								placeholder="[alpha]"
								value={alpha}
								name="alpha"
								class={clsx({
									invalid: invalidInputs.has('alpha'),
								})}
								onInput={handleInput}
								onWheel={handleScroll}
							/>
						</div>
					</div>
					<div class="row">
						<div class="rainbow-box">
							<div class="rainbow-text" onClick={randomColour}>
								Random colour
							</div>
							<div class="rainbow-bg" />
						</div>
					</div>
				</div>
			</div>
		);
	};

	override componentDidMount = () => {
		addEventListener('hashchange', this.handleHashChange);

		// If there is already a hash
		// it will be filled in this way
		this.handleHashChange();
	};

	override componentWillUnmount = () => {
		removeEventListener('hashchange', this.handleHashChange);
	};

	handleScroll: h.JSX.WheelEventHandler<HTMLInputElement> = event_ => {
		const target = event_.currentTarget;

		const label = target.name;

		const {inputs} = this.state;

		if (!isOfType(label, inputKeys)) {
			throw new TypeError(
				`Expected label to be of type inputKeys instead got ${label}.`,
			);
		}

		const direction = -Math.sign(event_.deltaY);

		let value = inputs[label];

		if (typeof value !== 'string') {
			return;
		}

		value = value.trim();

		if (label === 'alpha') {
			let multiplier = 100;
			let endsWith = '';

			if (value.endsWith('%')) {
				multiplier = 1;
				endsWith = '%';

				value = value.slice(0, -1);
			}

			if (Number.isNaN(Number(value))) {
				return;
			}

			let parsed = Number(value) * multiplier;
			parsed += direction;

			parsed = parsed > 100 ? 100 : (parsed < 0 ? 0 : parsed);

			parsed /= multiplier;

			parsed = Math.trunc(parsed * 1e2) / 1e2;

			value = `${parsed}${endsWith}`;
		} else {
			if (Number.isNaN(Number(value))) {
				return;
			}

			let parsed = Number(value) + direction;
			parsed = parsed > 255 ? 255 : (parsed < 0 ? 0 : parsed);
			parsed = Math.trunc(parsed * 1e2) / 1e2;

			value = `${parsed}`;
		}

		this.handleRgbaInput(label, value);
	};

	handleHashChange = (event_?: Event) => {
		let hex = location.hash;
		hex = sanitiseHex(hex);

		this.hexSetState(hex);

		try {
			const rgba = hexRgb(hex);

			// At this point the hex is valid
			// because otherwise the function above
			// would have thrown

			this.rgbaSetState(rgba);

			if (event_ === undefined) {
				// If called directly instead
				// of by the eventlistener
				setHashInstantly(hex);
			}
		} catch {
			this.setState(
				produce((state: AppState) => {
					const inputs = state.inputs;

					for (const label of rgbaLabels) {
						inputs[label] = '';
					}
				}),
			);
		}
	};

	randomColour = () => {
		const [red, blue, green] = crypto.getRandomValues(new Uint8Array(3));

		this.rgbaSetState({
			// These cannot not be a number
			red: red!,
			blue: blue!,
			green: green!,
			alpha: 1,
		});

		let hex = rgbHex(red!, green!, blue!);

		hex = sanitiseHex(hex);

		setHashInstantly(hex);

		this.hexSetState(hex);
	};

	rgbaSetState = (
		rgba: Readonly<{
			red: number;
			green: number;
			blue: number;
			alpha: number;
		}>,
	) => {
		this.setState(
			produce((state: AppState) => {
				const {inputs} = state;

				for (const key of rgbaLabels) {
					const value = rgba[key];

					inputs[key] = value.toFixed(Number.isInteger(value) ? 0 : 2);
				}

				return state;
			}),
		);
	};

	/**
	 * It is the caller's responsibility to sanitise the passed
	 * value because maybe the hex shouldn't be shortened
	 * or even sanitised
	 *
	 * @param {string} hex The hex value to update the state with
	 *
	 * @return {void}
	 */
	hexSetState = (hex: string) => {
		this.setState(
			produce((state: AppState) => {
				state.inputs.hex = hex;
			}),
		);
	};

	handleHexInput = (hex: string) => {
		const {invalidInputs} = this;

		hex = sanitiseHex(hex, false);

		this.hexSetState(hex);

		try {
			const rgba = hexRgb(hex);

			setHashDebounced(hex);
			// Only if the hex was valid (calling hexRgb)

			invalidInputs.delete('hex');

			this.rgbaSetState(rgba);
		} catch {
			invalidInputs.add('hex');
			this.forceUpdate();
			// Force update because invalidInputs won't by itself
		}
	};

	handleRgbaInput = (label: string, value: string) => {
		const {invalidInputs} = this;

		this.setState(
			produce((state: AppState) => {
				const {inputs} = state;

				if (!isOfType(label, inputKeys)) {
					throw new TypeError(
						`Expected label to be of type inputKeys instead got ${label}.`,
					);
				}

				inputs[label] = value;

				// The next few lines because if alpha is '', '1' or '100%'
				// we want a 6-digit instead
				// and we can achieve that by passing undefined

				let alpha: string | undefined = inputs.alpha;
				if (['1', '100%', ''].includes(alpha)) {
					alpha = undefined;
				}

				try {
					let hex = rgbHex(
						Number(inputs.red),
						Number(inputs.green),
						Number(inputs.blue),
						alpha,
					);

					hex = sanitiseHex(hex);

					inputs.hex = hex;

					setHashDebounced(inputs.hex);

					for (const label of rgbaLabels) {
						invalidInputs.delete(label);
					}

					invalidInputs.delete('hex');
				} catch {
					invalidInputs.add(label);
					// No forceUpdate, will trigger after immer is done
				}
			}),
		);
	};

	handleInput: h.JSX.GenericEventHandler<HTMLInputElement> = event_ => {
		const target = event_.currentTarget;

		const value = target.value.trim();
		const label = target.name;

		if (!isOfType(label, inputKeys)) {
			throw new TypeError(
				`Expected label to be of type inputKeys instead got ${label}.`,
			);
		}

		if (label === 'hex') {
			this.handleHexInput(value);
		} else if (rgbaLabels.has(label)) {
			this.handleRgbaInput(label, value);
		}
	};
}

const root = document.querySelector<HTMLDivElement>('#root');
if (root) {
	render(<App />, root);
}
