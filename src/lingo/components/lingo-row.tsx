import clsx from 'clsx';
import {uniqueId} from 'lodash-es';
import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {LingoCorrectness, lingoDiff} from '../lingo-diff';

const StyledLingoRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	.visually-hidden {
		width: 0;
		opacity: 0;
		color: #0000;
		position: absolute;
		left: -10000px;
		top: -10000px;
	}

	.lingo-cell {
		border: 1px solid black;
		width: 2em;
		height: 2em;
		display: flex;
		align-items: center;
		justify-content: center;

		&.lingo-cell-active {
			background-color: #bbdefb;
		}
		&.lingo-cell-correct-location {
			background-color: #339900;
		}
		&.lingo-cell-wrong-location {
			background-color: #ffcc00;
		}
	}
`;

const BACKSPACE_RE = /^backspace$/i;

export const LingoRow: React.FC<{
	length: number;
	onDone: (word: string) => void;
	hints: Array<string | undefined>;
}> = ({length, onDone, hints}) => {
	const [characters, setCharacters] = useState<
		Array<{key: string; character: string}>
	>(() =>
		Array.from({length}, () => ({
			key: uniqueId(),
			character: '',
		})),
	);
	const [offset, setOffset] = useState(0);
	const hiddenInput = useRef<HTMLInputElement>(null);

	const onInput: React.KeyboardEventHandler<HTMLInputElement> = (
		event_,
	): void => {
		const newCharacter = event_.key;

		console.log(newCharacter);

		const isBackspace = BACKSPACE_RE.test(newCharacter);

		if (
			offset >= length
			|| event_.ctrlKey
			|| event_.altKey
			|| (!/^([a-z])$/i.test(newCharacter) && !isBackspace)
		) {
			return;
		}

		characters[offset]!.character = isBackspace ? '' : newCharacter;
		setCharacters([...characters]);

		const newOffset = isBackspace
			? Math.max(0, offset - 1)
			: Math.min(length, offset + 1);

		if (newOffset === length) {
			onDone(characters.join(''));
		}

		setOffset(newOffset);
	};

	const focusHiddenInput = (): void => {
		hiddenInput.current?.focus();
	};

	useEffect(focusHiddenInput);

	return (
		<StyledLingoRow>
			<input
				ref={hiddenInput}
				className="visually-hidden"
				onKeyDown={onInput}
			/>

			{characters.map(({character, key}, i) => (
				<div
					key={key}
					className={clsx('lingo-cell', {
						'lingo-cell-active': i === offset,
					})}
					onClick={focusHiddenInput}
				>
					{character ?? hints[i]}
				</div>
			))}
		</StyledLingoRow>
	);
};

export const LingoRowDone: React.FC<{
	input: string;
	solution: string;
}> = ({input, solution}) => {
	const diff = lingoDiff(input, solution);

	return (
		<StyledLingoRow>
			{diff.map(({character, correctness}) => (
				<div
					key={`${character}-${correctness}`}
					className={clsx('lingo-cell', {
						'lingo-cell-correct-location':
							correctness === LingoCorrectness.correctLocation,
						'lingo-cell-wrong-location':
							correctness === LingoCorrectness.wrongLocation,
					})}
				>
					{character}
				</div>
			))}
		</StyledLingoRow>
	);
};
