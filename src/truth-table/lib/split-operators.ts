import {isValidOperator, LogicalSymbolFromName} from './logical-symbols';
import {singleCharacterNotMappings} from './mappings';
import {CharacterTypes, StringWithIndices} from './string-with-indices';

const isNot = (input: string) =>
	input === LogicalSymbolFromName.not
	|| singleCharacterNotMappings.includes(input);

export const splitOperators = (
	input: StringWithIndices[],
): StringWithIndices[] => {
	const result: StringWithIndices[] = [];

	for (const item of input) {
		if (item.type !== CharacterTypes.operator) {
			result.push(item);

			continue;
		}

		let previous = '';
		let previousFrom = item.from;

		const push = (to: number) => {
			if (previous !== '') {
				result.push({
					characters: previous,
					type: CharacterTypes.operator,
					from: previousFrom,
					to,
				});
			}
		};

		for (let i = 0; i < item.characters.length; ++i) {
			const character = item.characters.charAt(i);
			const nextCharacter = item.characters.charAt(i + 1);

			// Incase of !== don't parse it as "not =="
			if (
				(isNot(character) && (nextCharacter === '' || isNot(nextCharacter)))
				|| isValidOperator(character)
			) {
				push(item.from + i);

				result.push({
					characters: character,
					type: CharacterTypes.operator,
					from: item.from + i,
					to: item.from + i + 1,
				});

				previous &&= '';

				previousFrom = item.from + i + 1;
			} else {
				previous += character;
			}
		}

		push(item.to);
	}

	return result;
};
