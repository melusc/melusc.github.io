import {parseTopLevelBracketPairs} from './parse-top-level-bracket-pairs';

export const groupBrackets = (raw: string): string[] => {
	const bracketPairs = parseTopLevelBracketPairs(raw);

	const result: string[] = [];

	let previousEnd = 0;
	for (const [start, end] of bracketPairs) {
		result.push(raw.slice(previousEnd, start), raw.slice(start + 1, end));

		previousEnd = end + 1;
	}

	if (previousEnd !== raw.length - 1) {
		result.push(raw.slice(previousEnd));
	}

	return result;
};
