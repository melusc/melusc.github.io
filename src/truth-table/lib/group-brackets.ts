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

		const brackets = raw.slice(start, end + 1);
		// If empty (ignoring whitespace) in brackets
		if (/^\(\s*\)$/.test(brackets)) {
			throw new Error('Unexpected empty brackets');
		}

		result.push(brackets);

		previousEnd = end + 1;
	}

	const after = raw.slice(previousEnd).trim();
	if (after !== '') {
		result.push(after);
	}

	return result;
};
