import {isValidOperator} from './logical-symbols';
import {CharacterTypes, type StringWithIndices} from './string-with-indices';

const throwUnexpectedChar = (char: string, from: number, to?: number) => {
	const message
		= to === undefined || to - from === 1
			? `Unexpected character "${char}" at position ${from}.`
			: `Unexpected "${char}" at (${from} - ${to}).`;

	throw new SyntaxError(message);
};

const findUnexpectedChar = (input: string, regex: RegExp) => {
	const index = input.search(regex);

	if (index !== -1) {
		throwUnexpectedChar(input.charAt(index), index);
	}
};

export const validateCharacters = (input: StringWithIndices[]) => {
	for (const item of input) {
		const c = item.characters;

		// Idk how this could happen, it shouldn't
		if (c.length === 0) {
			throw new Error('Unexpected empty item in validateCharacters.');
		}

		switch (item.type) {
			case CharacterTypes.operator: {
				const firstCharValid = isValidOperator(c.charAt(0));

				// This may look weird, but this way makes the errors more natural
				// - If the first character is valid but there's more, report rest
				// - If the first character is not valid and there's more, report all characters
				// - If the first character is not valid and there's nothing more, report first character

				if (c.length > 1) {
					if (firstCharValid) {
						// c is like "↮??"
						throwUnexpectedChar(c.slice(1), item.from + 1, item.to);
					} else {
						// c is like "???"
						throwUnexpectedChar(c, item.from, item.to);
					}
				}

				if (!firstCharValid) {
					throwUnexpectedChar(c, item.from, item.to);
				}

				break;
			}

			case CharacterTypes.bracket: {
				findUnexpectedChar(c, /[^()]/);

				break;
			}

			case CharacterTypes.variable: {
				findUnexpectedChar(c, /[^a-z_]/i);

				break;
			}

			case CharacterTypes.space: {
				findUnexpectedChar(c, /\S/);

				break;
			}

			default: {
				// Nothing
			}
		}
	}
};
