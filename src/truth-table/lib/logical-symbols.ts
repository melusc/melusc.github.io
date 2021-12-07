export enum LogicalSymbolFromName {
	'iff' = '⟷',

	'if-then' = '→',

	'not' = '¬',

	'and' = '∧',

	'xor' = '↮',

	'or' = '∨',
}

export enum NameFromLogicalSymbol {
	'⟷' = 'iff',

	'→' = 'if-then',

	'¬' = 'not',

	'∧' = 'and',

	'↮' = 'xor',

	'∨' = 'or',
}

type LogicalSymbol = keyof typeof NameFromLogicalSymbol;

export const logicalSymbols: LogicalSymbol[] = ['⟷', '→', '¬', '∧', '↮', '∨'];

export const isValidOperator = (string_: string): string_ is LogicalSymbol =>
	logicalSymbols.includes(string_ as LogicalSymbol);

export type Operators = keyof typeof LogicalSymbolFromName;
