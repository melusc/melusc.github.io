// Use array because it's easier with recursion
function * generateInitialBoolsIterator(
	variables: string[],
	acc: Record<string, boolean> = {},
): Iterable<Record<string, boolean>> {
	const variable0 = variables[0];

	if (variable0) {
		yield * generateInitialBoolsIterator(variables.slice(1), {
			...acc,
			[variable0]: true,
		});

		yield * generateInitialBoolsIterator(variables.slice(1), {
			...acc,
			[variable0]: false,
		});
	} else {
		yield acc;
	}
}

// Use Set to not have duplicates
export const generateInitialBools = (variables: Set<string>) =>
	generateInitialBoolsIterator([...variables]);
