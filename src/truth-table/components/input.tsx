import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
	font: inherit;
	background: none;
	border: none;
	outline: none;
	color: inherit;

	border-bottom: var(--table-border);
	padding: 0.3em;
	margin-bottom: 1em;

	width: 100%;
`;

export const Input = ({
	input,
	setInput,
}: {
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
}) => (
	<StyledInput
		type="text"
		value={input}
		onInput={ev => {
			const newInput = ev.currentTarget.value;
			setInput(newInput);
		}}
	/>
);
