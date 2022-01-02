import clsx from 'clsx';
import {uniqueId} from 'lodash-es';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {LingoCorrectness, LingoDiff} from '../lingo-diff';

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

// For mobile, to show keyboard
const hiddenInput = document.createElement('input');
document.body.append(hiddenInput);

// Helper function so prettier formats the css
const css = (input: TemplateStringsArray): string => input.join('');
hiddenInput.style.cssText = css`
	outline: none;
	border: none;
	color: #0000;
	padding: 0;
	height: 0;
	width: 0;
	position: absolute;
	top: 0;
	left: 0;
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

	const onInput = (event_: KeyboardEvent): void => {
		if ((event_.target as HTMLElement).id === 'word-length') {
			return;
		}

		const newCharacter = event_.key.toLowerCase();
		event_.stopImmediatePropagation();

		const isBackspace = BACKSPACE_RE.test(newCharacter);

		if (isBackspace && event_.ctrlKey) {
			for (const c of characters) {
				c.character = '';
			}

			setCharacters([...characters]);
			setOffset(0);
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

		setCharacters([...characters]);

		const newOffset = isBackspace
			? Math.max(0, offset - 1)
			: Math.min(length, offset + 1);

		setOffset(newOffset);

		if (newOffset === length) {
			onDone(characters.map(({character}) => character).join(''));
		}
	};

	useEffect(() => {
		addEventListener('keydown', onInput);

		return (): void => {
			removeEventListener('keydown', onInput);
		};
	});

	const focusHiddenInput = (): void => {
		hiddenInput?.focus();
	};

	useEffect(() => {
		if (autoFocus) {
			focusHiddenInput();
		}
	}, [autoFocus]);

	const scrollIntoView: React.Ref<HTMLElement> = (div): void => {
		if (!div) {
			return;
		}

		const clientRect = div.getBoundingClientRect();

		// On mobile it won't scroll the focused input out of view
		hiddenInput.style.transform = `translate(${clientRect.left}px, ${clientRect.top}px)`;

		div.scrollIntoView({
			behavior: 'auto',
			inline: 'nearest',
			block: 'nearest',
		});
	};

	return (
		<StyledLingoRow onClick={focusHiddenInput}>
			{characters.map(({character, key}, i) => (
				<div
					key={key}
					className={clsx('lingo-cell', {
						'lingo-cell-active': i === offset,
						'lingo-cell-hint': !character,
					})}
					{...(i === offset && {ref: scrollIntoView})}
				>
					{character || hints[i]}
				</div>
			))}
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
