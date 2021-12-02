import {type AST} from './parse-operation';
import {operations} from './operations';
import {operationToString} from './operation-to-string';

export const evalOperation = (
	operation: AST,
	variables: Record<string, boolean>,
): boolean => {
	const stringified = operationToString(operation);

	const cached = variables[stringified];

	if (cached) {
		return cached;
	}

	let result: boolean;

	switch (operation.type) {
		case 'variable': {
			result = variables[operation.variable]!;
			break;
		}

		case 'not': {
			result = operations.not(evalOperation(operation.values[0], variables));
			break;
		}

		default: {
			result = operations[operation.type](
				evalOperation(operation.values[0], variables),
				evalOperation(operation.values[1], variables),
			);
			break;
		}
	}

	variables[stringified] = result;
	return result;
};
