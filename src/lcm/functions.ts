const knownGcd: Record<string, bigint> = {};

type ExpectedNumber = number | bigint;

export const absBigInt = (n: ExpectedNumber): bigint => BigInt(n < 0 ? -n : n);

export const gcd = (a_: ExpectedNumber, b_: ExpectedNumber): bigint => {
	const a = absBigInt(a_);

	const b = absBigInt(b_);

	let dividend = a > b ? a : b;
	let divisor = a > b ? b : a;

	const key = `${dividend},${divisor}`;

	if (key in knownGcd) {
		return knownGcd[key]!;
	}

	let leftover = 1n;

	while (leftover !== 0n) {
		leftover = dividend % divisor;
		if (leftover !== 0n) {
			dividend = divisor;
			divisor = leftover;
		}
	}

	knownGcd[key] = divisor;

	return divisor;
};

export const lcm = (a: ExpectedNumber, b: ExpectedNumber): bigint =>
	(absBigInt(a) * absBigInt(b)) / gcd(a, b);

export const lcmArray = (array: ExpectedNumber[]): string => {
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
