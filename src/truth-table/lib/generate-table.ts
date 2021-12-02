import {generateBoolPermutations} from './generate-bool-permutations';
import {operationToString} from './operation-to-string';
import {findVariables} from './find-variables';
import {Operation, parseOperation} from './parse-operation';
import {evalOperation} from './eval';

function * getColumns(operations: Operation): Iterable<[Operation, string]> {
	// Not variables, they are handled differently below
	if (operations.type !== 'variable') {
		for (const value of operations.values) {
			yield * getColumns(value);
		}

		// Yield after above, so it goes from inside out
		yield [operations, operationToString(operations)];
	}
}

export const generateTable = (
	input: string,
): {
	columns: readonly string[];
	rows: ReadonlyArray<readonly boolean[]>;
} => {
	const parsed = parseOperation(input);
	const variables = findVariables(parsed);
	const rows = generateBoolPermutations(variables);
	const columns = new Set(getColumns(parsed));

	const table: {
		columns: string[];
		rows: boolean[][];
	} = {
		columns: [...variables],
		rows: [],
	};

	for (const [, stringified] of columns) {
		table.columns.push(stringified);
	}

	for (const variablePermutations of rows) {
		const row: boolean[] = [];

		for (const variable of variables) {
			row.push(variablePermutations[variable]!);
		}

		for (const [operation] of columns) {
			row.push(evalOperation(operation, variablePermutations));
		}

		table.rows.push(row);
	}

	return table;
};
