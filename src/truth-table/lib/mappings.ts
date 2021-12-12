import {ReadonlyDeep} from 'type-fest';
import {LogicalSymbolFromName} from './logical-symbols';
import {CharacterTypes, type StringWithIndices} from './string-with-indices';

export const singleCharacterNotMappings = ['~', '!'];
export const mappings = (() => {
	// https://en.wikipedia.org/wiki/List_of_logic_symbols
	const stringMappings = [
		[
			LogicalSymbolFromName.iff,
			['⇔', '≡', 'iff', '<->', '<=>', '=', '==', '==='],
		],

		[LogicalSymbolFromName['if-then'], ['⇒', '⊃', '->', '=>']],

		[LogicalSymbolFromName.not, [...singleCharacterNotMappings, 'not']],

		[LogicalSymbolFromName.and, ['&&', '&', 'and']],

		[
			LogicalSymbolFromName.xor,
			['⊕', '⊻', '≢', 'xor', '>=<', '>-<', '!=', '!==', '~=', '<>'],
		],

		[LogicalSymbolFromName.or, ['||', '|', 'or']],
	] as const;

	const flatMappings: Array<[string, string]> = [];

	for (const [key, stringRegexes] of stringMappings) {
		for (const stringRegex of stringRegexes) {
			flatMappings.push([stringRegex.toUpperCase(), key]);
		}
	}

	return flatMappings as ReadonlyArray<[replacer: string, replaceWith: string]>;
})();

export const stringWithIndicesMatches = (
	input: StringWithIndices,
	match: string,
) => {
	// If not type variable (like "and") or not type operator (like "&&")
	if (
		input.type !== CharacterTypes.variable
		&& input.type !== CharacterTypes.operator
	) {
		return false;
	}

	return input.characters.toUpperCase() === match;
};

export const replaceMappings = (
	input: ReadonlyDeep<StringWithIndices[]>,
): StringWithIndices[] => {
	const result: StringWithIndices[] = [];

	for (const item of input) {
		const caretIndex = item.characters.indexOf('^');
		if (caretIndex !== -1) {
			// It could be confused with ∧ (logical and) or bitwise xor ^ (caret)
			throw new SyntaxError(
				`Unexpected ambiguous caret (^) at position ${item.from + caretIndex}.`,
			);
		}

		if (
			item.type !== CharacterTypes.operator
			&& item.type !== CharacterTypes.variable
		) {
			result.push(item);
			continue;
		}

		let anyMatched = false;
		for (const [replacer, replaceWith] of mappings) {
			if (stringWithIndicesMatches(item, replacer)) {
				result.push({
					...item,
					characters: replaceWith,
					type: CharacterTypes.operator,
				});

				anyMatched = true;

				break;
			}
		}

		if (!anyMatched) {
			result.push(item);
		}
	}

	return result;
};
