import {LogicalSymbolsNames} from './logical-symbols';
import {CharacterTypes, StringWithIndices} from './string-with-indices';

export const validateOperators = (input: StringWithIndices[]) => {
	let lastType: CharacterTypes | undefined;

	for (const item of input) {
		if (item.type === CharacterTypes.space) {
			continue;
		}

		if (
			item.type === CharacterTypes.operator
			&& lastType === CharacterTypes.operator
			&& item.characters !== LogicalSymbolsNames.not
		) {
			throw new Error(
				`Unexpected operator "${item.originalCharacters}" at (${item.from} - ${item.to}).`,
			);
		}

		lastType = item.type;
	}
};
