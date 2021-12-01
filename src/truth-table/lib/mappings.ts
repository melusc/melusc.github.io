import {LogicalSymbolFromName} from './logical-symbols';

export const mappings = (() => {
	// https://en.wikipedia.org/wiki/List_of_logic_symbols
	const stringMappings = [
		[
			LogicalSymbolFromName.iff,
			[
				'⇔',
				'≡',
				'iff',
				'if and only if',
				'same as',
				'equal',
				'<->',
				'<=>',
				'=',
				'==',
				'===',
			],
		],

		[
			LogicalSymbolFromName['if-then'],
			['if then', 'implies', '⇒', '⊃', '->', '=>'],
		],

		[LogicalSymbolFromName.not, ['~', '!', 'not']],

		[LogicalSymbolFromName.and, ['&&', '&', 'and']],

		[
			LogicalSymbolFromName.xor,
			['⊕', '⊻', '≢', 'xor', 'either or', '>=<', '>-<', '!=', '!==', '~='],
		],

		[LogicalSymbolFromName.or, ['||', '|', 'or']],
	] as const;

	const flatMappings: Array<[string, string]> = [];

	for (const [key, stringRegexes] of stringMappings) {
		for (const stringRegex of stringRegexes) {
			flatMappings.push([stringRegex.toUpperCase(), key]);
		}
	}

	// If a regex is longer it should be replaced first
	// "xor" then "or"
	flatMappings.sort(
		([regexA, keyA], [regexB, keyB]) =>
			regexB.length - regexA.length || keyA.localeCompare(keyB),
	);

	return flatMappings as ReadonlyArray<[replacer: string, replaceWith: string]>;
})();

// Slice, then uppercase, because see mappings.test.ts#L61-L62
const ciEquals = (string_: string, match: string, offset: number) =>
	string_.slice(offset).toUpperCase().startsWith(match);

export const replaceMappings = (string_: string): string => {
	if (string_.includes('^') /* caret */) {
		// It could be confused with ∧ (logical and) or bitwise xor ^ (caret)
		throw new SyntaxError('Use of ^ (caret) is forbidden due to ambiguity.');
	}

	for (let i = 0; i < string_.length; ++i) {
		for (const [replacer, replaceWith] of mappings) {
			if (ciEquals(string_, replacer, i)) {
				string_
					= string_.slice(0, i)
					+ replaceWith
					+ string_.slice(i + replacer.length);

				// If no break it will test all "replaceWiths" if they can be replaced, which they can never be
				break;
			}
		}
	}

	return string_;
};
