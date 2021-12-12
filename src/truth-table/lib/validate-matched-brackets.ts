import {CharacterTypes, type StringWithIndices} from './string-with-indices';

export const validateMatchedBrackets = (input: StringWithIndices[]) => {
	// Push for opening bracket
	// pop on closing bracket
	// Expect it to always have an index at end for every closing bracket
	// Expect it to not have any leftover opening brackets after all
	const openingBrackets: number[] = [];

	for (const item of input) {
		if (item.type === CharacterTypes.bracket) {
			const c = item.characters;

			for (let i = 0; i < c.length; ++i) {
				const position = i + item.from;

				if (c.charAt(i) === '(') {
					openingBrackets.push(position);
				} else if (openingBrackets.pop() === undefined) {
					// If there is no matched bracket
					throw new Error(`Unmatched closing bracket at position ${position}.`);
				}
			}
		}
	}

	const last = openingBrackets.pop();
	if (last) {
		throw new Error(`Unmatched opening bracket at position ${last}.`);
	}
};
