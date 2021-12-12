import {LogicalSymbolFromName} from './logical-symbols';
import {CharacterTypes, StringWithIndices} from './string-with-indices';

export const validateOperators = (input: StringWithIndices[]) => {
	let lastType: CharacterTypes | undefined;

	for (const item of input) {
		if (
			item.type === CharacterTypes.operator
			&& lastType === CharacterTypes.operator
			&& item.characters !== LogicalSymbolFromName.not
		) {
			throw new Error(
				`Unexpected operator "${item.characters}" at (${item.from} - ${item.to}).`,
			);
		}

		lastType = item.type;
	}
};
