import {type Operation} from './parse-operation';
import {LogicalSymbolFromName} from './logical-symbols';

export const operationToString = (operation: Operation): string => {
	if (operation.type === 'variable') {
		return operation.variable;
	}

	if (operation.type === 'not') {
		return `${LogicalSymbolFromName.not}${operationToString(
			operation.values[0],
		)}`;
	}

	return `(${operationToString(operation.values[0])} ${
		LogicalSymbolFromName[operation.type]
	} ${operationToString(operation.values[1])})`;
};
