export const parseTopLevelBracketPairs = (raw: string) => {
	const topLevelBrackets: Array<[number, number]> = [];

	let currentTopLevelBracket: number[] = [];

	let bracketCount = 0;
	for (let i = 0; i < raw.length; ++i) {
		const char = raw.charAt(i);

		if (char === '(') {
			++bracketCount;
			if (currentTopLevelBracket.length === 0) {
				currentTopLevelBracket.push(i);
			}
		} else if (char === ')') {
			--bracketCount;

			if (bracketCount < 0) {
				break;
			}

			if (currentTopLevelBracket.length === 1 && bracketCount === 0) {
				currentTopLevelBracket.push(i);
				topLevelBrackets.push(currentTopLevelBracket as [number, number]);
				currentTopLevelBracket = [];
			}
		}
	}

	const unmatchedBracket = currentTopLevelBracket[0];
	if (unmatchedBracket) {
		throw new SyntaxError(
			`Unmatched bracket at index ${unmatchedBracket}: ${raw.slice(
				unmatchedBracket,
				unmatchedBracket + 3,
			)}`,
		);
	}

	if (bracketCount !== 0) {
		throw new SyntaxError('String contained unmatched brackets');
	}

	return topLevelBrackets;
};
