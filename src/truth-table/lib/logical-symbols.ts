export enum LogicalSymbolFromName {
	'iff' = '⟷',

	'ifthen' = '→',

	'not' = '¬',

	'and' = '∧',

	'xor' = '↮',

	'or' = '∨',
}

export enum NameFromLogicalSymbol {
	'⟷' = 'iff',

	'→' = 'ifthen',

	'¬' = 'not',

	'∧' = 'and',

	'↮' = 'xor',

	'∨' = 'or',
}

export enum LogicalSymbolsNames {
	iff = 'iff',
	'ifthen' = 'ifthen',
	not = 'not',
	and = 'and',
	xor = 'xor',
	or = 'or',
}

type LogicalName = keyof typeof LogicalSymbolsNames;

const logicalNames = new Set<LogicalName>([
	'iff',
	'ifthen',
	'not',
	'and',
	'xor',
	'or',
]);

export const isValidOperatorName = (string_: string): string_ is LogicalName =>
	logicalNames.has(string_ as LogicalName);

type LogicalSymbol = keyof typeof NameFromLogicalSymbol;

const logicalSymbols = new Set<LogicalSymbol>([
	LogicalSymbolFromName.iff,
	LogicalSymbolFromName.ifthen,
	LogicalSymbolFromName.not,
	LogicalSymbolFromName.and,
	LogicalSymbolFromName.xor,
	LogicalSymbolFromName.or,
]);

export const isValidLogicalSymbol = (
	string_: string,
): string_ is LogicalSymbol => logicalSymbols.has(string_ as LogicalSymbol);

export type Operators = keyof typeof LogicalSymbolFromName;
