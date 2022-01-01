import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import {LingoTable} from './lingo-table';

const StyledLingo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1em;

	> input {
		&.error {
			color: var(--invalid, red);
		}
	}

	input,
	button {
		color: inherit;
		padding: 3px 1em;
		border: 1px solid currentColor;
		border-radius: 3px;
		outline: none;
		background: none;
		font: inherit;
	}

	input {
		padding: 3px 10px;
	}

	.word-length-inputs {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 1em;
	}
`;

export const Lingo: React.FC = () => {
	const [wordLength, setWordLength] = useState('4');
	const [parsedLength, setParsedLength] = useState(4);
	const [key, forceRerender] = useState(0);

	const handleWordLengthInput: React.FormEventHandler<
		HTMLInputElement
	> = event_ => {
		event_.stopPropagation();
		const input = event_.currentTarget.value.trim();
		setWordLength(input);

		if (isValidWordLength(input) && input !== '') {
			setParsedLength(Number(input));
		}
	};

	useEffect(() => {
		const hash = location.hash.slice(1);
		if (hash !== '' && isValidWordLength(hash)) {
			setWordLength(hash);
			setParsedLength(Number(hash));
		}
	}, []);

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
					placeholder="4-10 incl."
					id="word-length"
					type="tel"
					value={wordLength}
					className={clsx({
						error: !isValidWordLength(wordLength),
					})}
					onInput={handleWordLengthInput}
				/>
			</div>

			<button
				type="button"
				onClick={(): void => {
					forceRerender(i => i + 1);
				}}
			>
				New word
			</button>

			<LingoTable wordCache={key} length={parsedLength} />
		</StyledLingo>
	);
};
