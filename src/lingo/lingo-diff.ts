import {uniqueId} from 'lodash-es';

export enum LingoCorrectness {
	correctLocation,
	wrongLocation,
	nonExistant,
}

export type LingoDiff = {
	correctness: LingoCorrectness;
	character: string;
	key: string;
};

export const lingoDiff = (input: string, solution: string): LingoDiff[] => {
	if (input === '') {
		return Array.from({length: solution.length}, () => ({
			character: '',
			correctness: LingoCorrectness.nonExistant,
			key: uniqueId(),
		}));
	}

	if (input.length !== solution.length) {
		throw new Error('Expected strings of equal length');
	}

	const result: LingoDiff[] = [];

	const splitInput: Array<undefined | string> = input.split('');
	const splitSolution: Array<undefined | string> = solution.split('');

	/**
	 * "Correct locations" are always more important
	 * than "wrong locations", that's why two loops
	 *
	 * @example input: "aaa", solution: "bab"
	 *   should find the second "a" as a "correct location"
	 *   and never even consider the first or third "a" as a "wrong location"
	 */
	for (const [i, charIn] of splitInput.entries()) {
		if (splitSolution[i] === charIn && charIn) {
			result[i] = {
				correctness: LingoCorrectness.correctLocation,
				character: charIn,
				key: uniqueId(),
			};

			splitSolution[i] = undefined;
			splitInput[i] = undefined;
		}
	}

	for (const [i, charIn] of splitInput.entries()) {
		if (!charIn) {
			continue;
		}

		const solutionIndex = splitSolution.indexOf(charIn);

		if (solutionIndex === -1) {
			result[i] = {
				correctness: LingoCorrectness.nonExistant,
				character: charIn,
				key: uniqueId(),
			};
		} else {
			result[i] = {
				correctness: LingoCorrectness.wrongLocation,
				character: charIn,
				key: uniqueId(),
			};

			splitSolution[solutionIndex] = undefined;
		}

		splitInput[i] = undefined;
	}

	return result;
};
