import React, {useState} from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import {randomWord} from '../random-word';
import {LingoTable} from './lingo-table';

const StyledLingo = styled.div`
	input {
		&.error {
			color: var(--invalid, red);
		}

		color: inherit;
		padding: 3px 1em;
		border: 2px solid currentColor;
		border-radius: 3px;
		outline: none;
	}

	.word-length-inputs {
		display: flex;
		flex-direction: row;
		gap: 1em;
	}
`;

export const Lingo: React.FC = () => {
	const [wordLength, setWordLength] = useState('4');
	const [word, setWord] = useState(() => randomWord(Number(wordLength)));

	const handleWordLengthInput: React.FormEventHandler<
		HTMLInputElement
	> = event_ => {
		const input = event_.currentTarget.value.trim();
		setWordLength(input);
	};

	const isValidWordLength = (input: string): boolean => {
		const parsed = Number(input);

		return (
			input === '' || (Number.isInteger(parsed) && parsed >= 4 && parsed <= 10)
		);
	};

	return (
		<StyledLingo>
			<div className="word-length-inputs">
				<label htmlFor="word-length">Word length</label>
				<input
					id="word-length"
					type="tel"
					value={wordLength}
					className={clsx({
						error: !isValidWordLength(wordLength),
					})}
					onInput={handleWordLengthInput}
				/>
			</div>
			<LingoTable word={word} />
		</StyledLingo>
	);
};
