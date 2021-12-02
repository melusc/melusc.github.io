import {groupBrackets} from './group-brackets';
import {replaceMappings} from './mappings';
import {
	type Operators,
	LogicalSymbolFromName,
	isValidOperator,
	NameFromLogicalSymbol,
} from './logical-symbols';

export type AST = (
	| {
			type: Operators;
			values: [AST, AST];
	  }
	| {
			type: 'not';
			values: [AST];
	  }
	| {
			type: 'variable';
			variable: string;
	  }
) & {
	stringified?: string;
};

const splitByOperator = (strings: string[]) => {
	let previous = '';
	const result: string[] = [];

	const pushPrevious = () => {
		if (previous) {
			result.push(previous);
			previous = '';
		}
	};

	for (const string_ of strings) {
		// If it is wrapped with a bracket-pair
		// don't split anything
		if (string_.startsWith('(')) {
			result.push(string_);
			continue;
		}

		for (const char of string_.split('')) {
			if (isValidOperator(char)) {
				pushPrevious();

				result.push(char);
			} else {
				previous += char;
			}
		}

		pushPrevious();
	}

	return result;
};

const joinNots = (strings: string[]) => {
	const result: string[] = [];

	for (let i = 0; i < strings.length; ++i) {
		const string = strings[i]!;
		if (string.trim() === LogicalSymbolFromName.not) {
			const next = strings[i + 1];
			if (next === undefined) {
				throw new Error('Unexpected end of string after not.');
			}

			result.push(`${LogicalSymbolFromName.not}${next}`);
			++i;
		} else {
			result.push(string);
		}
	}

	return result;
};

export const parseOperation = (raw: string): AST => {
	raw = replaceMappings(raw);
	raw = raw.replace(/\s+/g, '');

	if (raw.length === 0) {
		throw new Error('Unexpected empty string');
	}

	const grouped = groupBrackets(raw);
	const split = joinNots(splitByOperator(grouped));

	if (split.length === 1) {
		const first = split[0]!.trim();
		if (first.startsWith('(')) {
			if (!first.endsWith(')')) {
				throw new Error('Unmatched bracket');
			}

			return parseOperation(first.slice(1, -1));
		}

		if (isValidOperator(first)) {
			throw new Error(`Unexpected operator ${first}`);
		}

		if (first.startsWith(LogicalSymbolFromName.not)) {
			return {
				type: 'not',
				values: [parseOperation(first.slice(1))],
			};
		}

		return {
			type: 'variable',
			variable: first,
		};
	}

	// Left to right means treat it like brackets around first few
	if (split.length > 3) {
		const first = split.slice(0, -2);
		split.splice(0, split.length - 2, first.join(''));
	}

	if (!isValidOperator(split[1]!)) {
		throw new Error(`Expected an operator. Got ${split[1]!}`);
	}

	return {
		type: NameFromLogicalSymbol[split[1]],
		values: [parseOperation(split[0]!), parseOperation(split[2]!)],
	};
};
