import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import {uniqueId} from 'lodash-es';
import {randomWord} from '../random-word';
import {lingoDiff} from '../lingo-diff';
import {LingoRow, LingoRowDone} from './lingo-row';

const StyledLingo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1em;

	> input {
		&.error {
			color: var(--invalid);
		}
	}

	input,
	button {
		color: inherit;
		padding: 3px 1em;
		border: 3px solid var(--border);
		border-radius: 5px;
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

	.table {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 8px;
		border: 2px solid var(--border);
	}

	.started-at,
	.solution {
		margin-top: 0.3em;
	}
`;

const generateEmptyTable = (
	word: string,
): Array<{hints: string[]; characters: string; key: string}> =>
	Array.from({length: word.length}, () => ({
		hints: [word.charAt(0)],
		characters: '',
		key: uniqueId(),
	}));

const durationToString = (from: Date, to: Date): string => {
	const diff = to.getTime() - from.getTime();

	const seconds = Math.floor(diff / 1000) % 60;
	const minutes = Math.floor(diff / 1000 / 60);

	if (minutes) {
		return `${minutes}m ${seconds}s`;
	}

	return `${seconds}s`;
};

export const Lingo: React.FC = () => {
	const [wordLength, setWordLength] = useState('4');
	const [solution, setSolution] = useState(() => randomWord(4));
	const [table, setTable] = useState(() => generateEmptyTable(solution));
	const [offset, setOffset] = useState(0);
	const [isCorrect, setCorrect] = useState(false);
	const [startedAt, setStartedAt] = useState(new Date());
	const previousWords = useRef<string[]>([]);

	const handleWordLengthInput: React.FormEventHandler<
		HTMLInputElement
	> = event_ => {
		event_.stopPropagation();
		const input = event_.currentTarget.value.trim();
		setWordLength(input);

		if (isValidWordLength(input) && input !== '') {
			setSolution(randomWord(Number(input)));
			newWord(Number(input));
		}
	};

	useEffect(() => {
		const hash = location.hash.slice(1);
		if (hash !== '' && isValidWordLength(hash)) {
			setWordLength(hash);
			newWord(Number(hash));
		}
	}, []);

	const isValidWordLength = (input: string): boolean => {
		const parsed = Number(input);

		return (
			input === '' || (Number.isInteger(parsed) && parsed >= 4 && parsed <= 10)
		);
	};

	const incrementOffset = (word: string): void => {
		table[offset]!.characters = word;
		setCorrect(correct => correct || word === solution);
		setTable([...table]);
		setOffset(offset + 1);
	};

	const newWord = (length: number): void => {
		let newSolution: string;

		const previousWords_ = previousWords.current;
		do {
			newSolution = randomWord(length);
		} while (previousWords_.includes(newSolution));

		// Max of 5 in previous words
		previousWords_.unshift(newSolution);
		previousWords_.splice(5, previousWords_.length - 5);

		setSolution(newSolution);
		setTable(generateEmptyTable(newSolution));
		setOffset(0);
		setCorrect(false);
		setStartedAt(new Date());
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
					newWord(solution.length);
				}}
			>
				New word
			</button>

			<div className="table">
				{table.map(({hints, characters, key}, index) =>
					index === offset && !isCorrect ? (
						<LingoRow
							key={key}
							length={solution.length}
							hints={hints}
							onDone={incrementOffset}
						/>
					) : (
						<LingoRowDone key={key} diff={lingoDiff(characters, solution)} />
					),
				)}
			</div>

			{offset >= solution.length && !isCorrect && (
				<div className="solution">{solution}</div>
			)}
			{isCorrect && (
				<div className="started-at">
					Took {durationToString(startedAt, new Date())}
				</div>
			)}
		</StyledLingo>
	);
};
