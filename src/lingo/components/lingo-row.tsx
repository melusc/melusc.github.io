import clsx from 'clsx';
import {uniqueId} from 'lodash-es';
import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {LingoCorrectness, LingoDiff} from '../lingo-diff';

const noop = (): void => {
	/* Nothing */
};

const StyledLingoRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	&:first-child {
		.lingo-cell {
			&:first-child {
				border-top-left-radius: 5px;
			}
			&:last-child {
				border-top-right-radius: 5px;
			}
		}
	}

	&:last-child {
		.lingo-cell {
			&:first-child {
				border-bottom-left-radius: 5px;
			}
			&:last-child {
				border-bottom-right-radius: 5px;
			}
		}
	}

	.lingo-cell {
		border: 2px solid var(--border);
		width: 2.4em;
		height: 2.4em;
		display: flex;
		align-items: center;
		justify-content: center;
		user-select: none;
		border-radius: 0;

		&.lingo-cell-hint {
			color: lightgray;
		}
		&.lingo-cell-active {
			color: var(--active-cell-color);
			border-color: var(--active-cell-border);
		}
		&.lingo-cell-correct-location {
			background-color: var(--correct);
		}
		&.lingo-cell-wrong-location {
			background-color: var(--wrong-location);
		}
	}
`;

const BACKSPACE_RE = /^backspace$/i;

export const LingoRow: React.FC<{
	length: number;
	onDone: (word: string) => void;
	hints: Array<string | undefined>;
	autoFocus: boolean;
}> = ({length, onDone, hints, autoFocus}) => {
	const [characters, setCharacters] = useState<
		Array<{key: string; character: string}>
	>(() =>
		Array.from({length}, () => ({
			key: uniqueId(),
			character: '',
		})),
	);
	const [offset, setOffset] = useState(0);
	const activeInput = useRef<HTMLInputElement | null | undefined>();
	const shouldFocus = useRef(false);

	const onInput: React.KeyboardEventHandler<HTMLInputElement> = event_ => {
		if ((event_.target as HTMLElement).id === 'word-length') {
			return;
		}

		const newCharacter = event_.key.toLowerCase();

		const isBackspace = BACKSPACE_RE.test(newCharacter);

		if (isBackspace && event_.ctrlKey) {
			for (const c of characters) {
				c.character = '';
			}

			setCharacters([...characters]);
			setOffset(0);
			shouldFocus.current = true;
			return;
		}

		if (
			offset >= length
			|| event_.ctrlKey
			|| event_.altKey
			|| (!/^([a-z])$/i.test(newCharacter) && !isBackspace)
		) {
			return;
		}

		const previous = characters[offset - 1];
		if (isBackspace) {
			if (previous) {
				previous.character = '';
			}
		} else {
			characters[offset]!.character = newCharacter;
		}

		shouldFocus.current = true;

		setCharacters([...characters]);

		const newOffset = isBackspace
			? Math.max(0, offset - 1)
			: Math.min(length, offset + 1);

		setOffset(newOffset);

		if (newOffset === length) {
			onDone(characters.map(({character}) => character).join(''));
		}
	};

	const scrollIntoView: React.Ref<HTMLElement> = (div): void => {
		if (!div) {
			return;
		}

		// On mobile it won't scroll the focused input out of view

		div.scrollIntoView({
			behavior: 'auto',
			inline: 'nearest',
			block: 'nearest',
		});
	};

	const focusInput = (): void => {
		activeInput.current?.focus();
	};

	useEffect((): void => {
		if (autoFocus || shouldFocus.current) {
			focusInput();
		}
	});

	useEffect(() => {
		shouldFocus.current = false;
	});

	return (
		<StyledLingoRow onClick={focusInput}>
			{characters.map(({character, key}, i) =>
				i === offset ? (
					<input
						ref={(input): void => {
							activeInput.current = input;
							scrollIntoView(input);
						}}
						// reuse input for mobile to keep keyboard open
						key="active-input_constant"
						// and always reset value
						value=""
						placeholder={hints[i]}
						className="lingo-cell lingo-cell-active"
						onKeyDown={onInput}
						// shut react up about https://stackoverflow.com/q/43556212/13249743
						onChange={noop}
					/>
				) : (
					<div
						key={key}
						className={clsx('lingo-cell', {
							'lingo-cell-hint': !character,
						})}
					>
						{character || hints[i]}
					</div>
				),
			)}
		</StyledLingoRow>
	);
};

export const LingoRowDone: React.FC<{
	diff: LingoDiff[];
}> = ({diff}) => (
	<StyledLingoRow>
		{diff.map(({character, correctness, key}) => (
			<div
				key={key}
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
