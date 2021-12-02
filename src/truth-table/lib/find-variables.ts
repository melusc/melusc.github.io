import {Operation} from './parse-operation';

function * findVariablesRecursive(operation: Operation): Iterable<string> {
	if (operation.type === 'variable') {
		yield operation.variable;
	} else {
		for (const value of operation.values) {
			yield * findVariablesRecursive(value);
		}
	}
}

export const findVariables = (operation: Operation): Set<string> => {
	const list = new Set<string>();

	for (const variable of findVariablesRecursive(operation)) {
		list.add(variable);
	}

	return list;
};
