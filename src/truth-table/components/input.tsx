// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type React from 'react';
import styled from 'styled-components/macro';

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

export const Input: React.FC<{
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
}> = ({input, setInput}) => (
	<StyledInput
		type='text'
		value={input}
		onInput={(ev): void => {
			const newInput = ev.currentTarget.value;
			setInput(newInput);
		}}
	/>
);
