import React from 'react';

import './input.scss';

export const Input = ({
	input,
	setInput,
}: {
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
}) => (
	<input
		className="truth-input"
		type="text"
		value={input}
		onInput={ev => {
			const newInput = ev.currentTarget.value;
			setInput(newInput);
		}}
	/>
);
