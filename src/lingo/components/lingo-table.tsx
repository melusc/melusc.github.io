import {uniqueId} from 'lodash-es';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {lingoDiff} from '../lingo-diff';
import {randomWord} from '../random-word';
import {LingoRow, LingoRowDone} from './lingo-row';

const StyledTable = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

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

export const LingoTable: React.FC<{
	length: number;
	wordCache: number;
}> = ({length, wordCache}) => {
	const [solution, setSolution] = useState(() => randomWord(length));
	const [table, setTable] = useState(() => generateEmptyTable(solution));
	const [offset, setOffset] = useState(0);
	const [isCorrect, setCorrect] = useState(false);
	const [startedAt, setStartedAt] = useState(new Date());

	const incrementOffset = (word: string): void => {
		table[offset]!.characters = word;
		setCorrect(word === solution);
		setTable(table);
		setOffset(offset + 1);
	};

	const newWord = (): void => {
		const newSolution = randomWord(length);
		setSolution(newSolution);
		setTable(generateEmptyTable(newSolution));
		setOffset(0);
		setCorrect(false);
		setStartedAt(new Date());
	};

	useEffect(() => {
		newWord();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [length, wordCache]);

	return (
		<StyledTable>
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

			{offset >= solution.length && !isCorrect && (
				<div className="solution">{solution}</div>
			)}
			{isCorrect && (
				<div className="started-at">
					Took {durationToString(startedAt, new Date())}
				</div>
			)}
		</StyledTable>
	);
};
