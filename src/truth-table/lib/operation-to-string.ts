import {type AST} from './parse-operation';
import {LogicalSymbolFromName} from './logical-symbols';

export const operationToString = (operation: AST): string => {
	let stringified = operation.stringified;

	if (stringified) {
		return stringified;
	}

	if (operation.type === 'variable') {
		stringified = operation.variable;
	} else if (operation.type === 'not') {
		stringified = `${LogicalSymbolFromName.not}${operationToString(
			operation.values[0],
		)}`;
	} else {
		stringified = `(${operationToString(operation.values[0])} ${
			LogicalSymbolFromName[operation.type]
		} ${operationToString(operation.values[1])})`;
	}

	operation.stringified = stringified;
	return stringified;
};
