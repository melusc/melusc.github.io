import {parseTopLevelBracketPairs} from './parse-top-level-bracket-pairs';

export const groupBrackets = (raw: string): string[] => {
	const bracketPairs = parseTopLevelBracketPairs(raw);

	const result: string[] = [];

	let previousEnd = 0;

	for (const [start, end] of bracketPairs) {
		const before = raw.slice(previousEnd, start).trim();
		if (before === '' && start > 0) {
			throw new Error(`Unexpected bracket at index ${start}`);
		}

		if (before !== '') {
			result.push(before);
		}

		const between = raw.slice(start + 1, end).trim();
		if (between === '') {
			throw new Error('Unexpected empty brackets');
		}

		result.push(between);

		previousEnd = end + 1;
	}

	const after = raw.slice(previousEnd).trim();
	if (after !== '') {
		result.push(raw.slice(previousEnd).trim());
	}

	return result;
};
