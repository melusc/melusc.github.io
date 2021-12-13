export type StringWithIndices =
	| {
			characters: string;
			type: Exclude<CharacterTypes, CharacterTypes.operator>;
			from: number;
			to: number;
	  }
	| {
			characters: string;
			type: CharacterTypes.operator;
			originalCharacters: string;
			from: number;
			to: number;
	  };

const VARIABLES_RE = /^[a-z_]$/i;
const BRACKETS_RE = /^[()]$/;
const SPACE_RE = /^\s$/;

export const enum CharacterTypes {
	variable = 'variable',
	operator = 'operator',
	space = 'space',
	bracket = 'bracket',
}

export const fromString = (input: string): StringWithIndices[] => {
	input = input.normalize('NFKC');
	const result: StringWithIndices[] = [];

	let previousType: CharacterTypes | undefined;
	let previousFrom = 0;
	let acc = '';

	const push = (to: number) => {
		if (acc !== '') {
			if (previousType === CharacterTypes.operator) {
				result.push({
					characters: acc,
					type: previousType,
					originalCharacters: acc,
					from: previousFrom,
					to,
				});
			} else {
				result.push({
					characters: acc,
					type: previousType!,
					from: previousFrom,
					to,
				});
			}
		}
	};

	for (let i = 0; i < input.length; ++i) {
		const character = input.charAt(i);

		let type: CharacterTypes;
		if (VARIABLES_RE.test(character)) {
			type = CharacterTypes.variable;
		} else if (SPACE_RE.test(character)) {
			type = CharacterTypes.space;
		} else if (BRACKETS_RE.test(character)) {
			type = CharacterTypes.bracket;
		} else {
			type = CharacterTypes.operator;
		}

		previousType ??= type;
		if (type !== previousType) {
			push(i);

			acc &&= '';
			previousType = type;
			previousFrom = i;
		}

		acc += character;
	}

	push(input.length);

	return result;
};

export const removeWhitespace = (
	input: readonly StringWithIndices[],
): StringWithIndices[] => {
	const result: StringWithIndices[] = [];

	for (const item of input) {
		if (item.type !== CharacterTypes.space) {
			result.push(item);
		}
	}

	return result;
};
