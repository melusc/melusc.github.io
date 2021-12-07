import {AST} from './parse-operation';

function * findVariablesRecursive(operation: AST): Iterable<string> {
	if (operation.type === 'variable') {
		yield operation.variable;
	} else {
		for (const value of operation.values) {
			yield * findVariablesRecursive(value);
		}
	}
}

export const findVariables = (operation: AST): Set<string> => {
	const list = new Set<string>();

	for (const variable of findVariablesRecursive(operation)) {
		list.add(variable);
	}

	return list;
};
