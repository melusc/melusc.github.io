import {ReadonlyDeep} from 'type-fest';
import {IndexedError} from './indexed-error';
import {LogicalSymbolFromName, LogicalSymbolsNames} from './logical-symbols';
import {CharacterTypes, type StringWithIndices} from './string-with-indices';

export const singleCharacterNotMappings = [
	'~',
	'!',
	LogicalSymbolFromName.not,
] as const;
export const mappings = (() => {
	// https://en.wikipedia.org/wiki/List_of_logic_symbols
	const stringMappings = [
		[
			LogicalSymbolsNames.iff,
			['⇔', '≡', '<->', '<=>', '=', '==', '===', LogicalSymbolFromName.iff],
		],

		[
			LogicalSymbolsNames.ifthen,
			['⇒', '⊃', '->', '=>', LogicalSymbolFromName.ifthen],
		],

		[LogicalSymbolsNames.not, singleCharacterNotMappings],

		[LogicalSymbolsNames.and, ['&&', '&', LogicalSymbolFromName.and]],

		[
			LogicalSymbolsNames.xor,
			[
				'⊕',
				'⊻',
				'≢',
				'>=<',
				'>-<',
				'!=',
				'!==',
				'~=',
				'<>',
				LogicalSymbolFromName.xor,
			],
		],

		[LogicalSymbolsNames.or, ['||', '|', LogicalSymbolFromName.or]],
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
		const caretOffset = item.characters.indexOf('^');
		if (caretOffset !== -1) {
			// It could be confused with ∧ (logical and) or bitwise xor ^ (caret)
			const caretIndex = item.from + caretOffset;
			throw new IndexedError(
				`Unexpected ambiguous caret (^) at position ${caretIndex}.`,
				caretIndex,
				caretIndex + 1,
			);
		}

		if (
			item.type !== CharacterTypes.operator
			&& item.type !== CharacterTypes.variable
		) {
			result.push(item);
			continue;
		}

		const c = item.characters.toLowerCase();
		// Case "and" or similar
		if (LogicalSymbolsNames[c as keyof typeof LogicalSymbolsNames] === c) {
			result.push({
				...item,
				originalCharacters: item.characters,
				characters: c,
				type: CharacterTypes.operator,
			});
			continue;
		}

		let anyMatched = false;
		for (const [replacer, replaceWith] of mappings) {
			if (stringWithIndicesMatches(item, replacer)) {
				result.push({
					...item,
					originalCharacters: item.characters,
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
