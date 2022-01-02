import {groupedWordsByLength} from './words';

export const randomWord = (wantedLength: number): string => {
	const words = groupedWordsByLength.get(wantedLength);

	if (!words) {
		throw new Error(
			`Expected length to be between 4 and 10 (incl.), got ${wantedLength}.`,
		);
	}

	// Non-null because if the array was empty the array wouldn't exist
	return words[Math.floor(Math.random() * words.length)]!;
};
