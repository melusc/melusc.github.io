export const enum States {
	valid,
	divBy0,
	tooLarge,
	notAnInteger,
}

export function parseInput(input: string):
	| {
			state: States.valid;
			uniques: number[];
	  }
	| {
			state: Exclude<States, States.valid>;
			uniques: undefined;
	  } {
	const split = input
		.trim()
		.split(/\s*,\s*/)
		.filter(Boolean);

	const newVals = [];

	// Turn 4-10 into [4,5,6,7,8,9,10]
	for (const item of split) {
		const match = /(?<first>-?\d+)-(?<second>-?\d+)/.exec(item);
		if (match?.groups) {
			const groups = match.groups;
			const sFirstNumber = groups['first'];
			const sSecondNumber = groups['second'];
			const firstNumber = Math.trunc(Number(sFirstNumber));
			const secondNumber = Math.trunc(Number(sSecondNumber));

			const lower = Math.min(firstNumber, secondNumber);
			const upper = Math.max(firstNumber, secondNumber);

			for (let index = lower; index <= upper; ++index) {
				newVals.push(index);
			}
		} else {
			const newValue = Math.trunc(Number(item));
			newVals.push(newValue);
		}
	}

	if (newVals.some(value => !Number.isInteger(value))) {
		return {
			state: States.notAnInteger,
			uniques: undefined,
		};
	}

	if (newVals.some(value => !Number.isSafeInteger(value))) {
		return {
			state: States.tooLarge,
			uniques: undefined,
		};
	}

	if (newVals.includes(0)) {
		return {
			state: States.divBy0,
			uniques: undefined,
		};
	}

	const uniques = [...new Set(newVals)];
	uniques.sort((a, b) => a - b);

	return {
		state: States.valid,
		uniques,
	};
}
