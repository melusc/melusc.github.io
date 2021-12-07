import {h} from 'preact';
import {StateUpdater} from 'preact/hooks';

import './input.scss';

export const Input = ({
	input,
	setInput,
}: {
	input: string;
	setInput: StateUpdater<string>;
}) => (
	<input
		class="truth-input"
		type="text"
		value={input}
		onInput={ev => {
			const newInput = ev.currentTarget.value;
			if (newInput.trim() !== input) {
				setInput(newInput);
			}
		}}
	/>
);
