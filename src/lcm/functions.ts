const knownGCD: Record<string, bigint> = {};

type expectedNumber = number | bigint;

export const absBigInt = (n: expectedNumber) => BigInt(n < 0 ? -n : n);

export const gcd = (a_: expectedNumber, b_: expectedNumber): bigint => {
	const a = absBigInt(a_);

	const b = absBigInt(b_);

	let dividend = a > b ? a : b;
	let divisor = a > b ? b : a;

	const key = `${dividend},${divisor}`;

	if (key in knownGCD) {
		return knownGCD[key]!;
	}

	let leftover = 1n;

	while (leftover !== 0n) {
		leftover = dividend % divisor;
		if (leftover !== 0n) {
			dividend = divisor;
			divisor = leftover;
		}
	}

	knownGCD[key] = divisor;

	return divisor;
};

export const lcm = (a: expectedNumber, b: expectedNumber) =>
	(absBigInt(a) * absBigInt(b)) / gcd(a, b);

export const lcmArray = (array: expectedNumber[]): string => {
	switch (array.length) {
		case 0: {
			return '';
		}

		case 1: {
			// Length is 1
			return array[0]!.toString();
		}

		default: {
			let result = 1n;

			for (const element of array) {
				result = lcm(result, element);
			}

			return result.toString();
		}
	}
};
