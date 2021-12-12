import {groupItems} from './group-items';
import {replaceMappings} from './mappings';
import {
	type Operators,
	LogicalSymbolFromName,
	isValidOperator,
	NameFromLogicalSymbol,
} from './logical-symbols';
import {
	CharacterTypes,
	fromString,
	removeWhitespace,
	StringWithIndices,
} from './string-with-indices';
import {validate} from './validate';
import {splitOperators} from './split-operators';
import {hasOperator} from './has-operator';

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

const parseNot = (input: StringWithIndices[][]): AST => {
	if (
		input[0]?.[0]?.type !== CharacterTypes.operator
		|| input[0]![0]!.characters !== LogicalSymbolFromName.not
	) {
		throw new Error(`Expected "${LogicalSymbolFromName.not}".`);
	}

	return {
		type: 'not',
		values: [_parseOperations(input.slice(1))],
	};
};

const _parseOperation = (input: StringWithIndices[]): AST => {
	if (!hasOperator(input)) {
		throw new Error(
			`Expected "${input
				.map(item => item.characters)
				.join(' ')}" to have an operator.`,
		);
	}

	if (input.length === 0) {
		throw new Error('Unexpected empty input at _parseOperation.');
	}

	if (input.length === 1) {
		const item = input[0]!;

		if (item.type === CharacterTypes.variable) {
			return {
				type: 'variable',
				variable: item.characters,
			};
		}

		throw new Error(`Unexpected type ${item.type} at ${item.from}.`);
	}

	const grouped = groupItems(input);

	// if first bracket belongs to last bracket
	// (if there are even brackets)
	if (grouped.length === 1) {
		const first = input[0]!;
		const last = input.at(-1)!;

		if (
			first.type === CharacterTypes.bracket
			&& last.type === CharacterTypes.bracket
		) {
			first.characters = first.characters.slice(1);
			++first.from;
			last.characters = last.characters.slice(0, -1);
			--last.to;

			if (first.characters === '') {
				input.shift();
			}

			if (last.characters === '') {
				input.pop();
			}

			return _parseOperation(input);
		}
	}

	return _parseOperations(grouped);
};

const _parseOperations = (input: StringWithIndices[][]): AST => {
	if (input.length === 0) {
		throw new Error('Unexpected empty input at _parseOperation.');
	}

	if (input.length === 1) {
		return _parseOperation(input[0]!);
	}

	const lastItems: StringWithIndices[][] = [input.pop()!];

	let secondToLast: StringWithIndices[] | undefined;
	while (
		(secondToLast = input.at(-1))
		&& secondToLast.length === 1
		&& secondToLast[0]!.type === CharacterTypes.operator
		&& secondToLast[0]!.characters === LogicalSymbolFromName.not
	) {
		lastItems.unshift(input.pop()!);
	}

	if (input.length === 0) {
		return parseNot(lastItems);
	}

	const operatorArray = input.pop()!;
	const operator = operatorArray[0]!;

	if (operatorArray.length !== 1) {
		throw new Error(
			`Expected operator, got "${operatorArray
				.map(item => item.characters)
				.join(' ')}".`,
		);
	}

	// !isValidOperator is unnecessary, it's just a typeguard
	if (
		operator.type !== CharacterTypes.operator
		|| !isValidOperator(operator.characters)
	) {
		throw new Error(
			`Expected operator, got type "${operator.type}" with value "${operator.characters}"`,
		);
	}

	return {
		type: NameFromLogicalSymbol[operator.characters],
		values: [_parseOperations(input), _parseOperations(lastItems)],
	};
};

// Wrapper around _parseOperation for sanitising and validating
// so it doesn't waste resources validating multiple times
export const parseOperation = (raw: string): AST => {
	const withIndices = fromString(raw);
	const noWhitespace = removeWhitespace(withIndices);

	if (noWhitespace.length === 0) {
		throw new Error('Unexpected empty string');
	}

	const split = splitOperators(noWhitespace);

	const translatedMappings = replaceMappings(split);

	validate(translatedMappings);

	return _parseOperation(translatedMappings);
};
