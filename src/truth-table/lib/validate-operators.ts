import {LogicalSymbolsNames} from './logical-symbols';
import {CharacterTypes, StringWithIndices} from './string-with-indices';
import {IndexedError} from './indexed-error';

export const validateOperators = (input: StringWithIndices[]): void => {
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
			throw new IndexedError(
				`Unexpected operator "${item.originalCharacters}" at (${item.from} - ${item.to}).`,
				item.from,
				item.to,
			);
		}

		lastType = item.type;
	}
};
