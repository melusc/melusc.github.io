type ExpectedNumber = number | bigint;

export function absBigInt(n: ExpectedNumber): bigint {
	return BigInt(n < 0 ? -n : n);
}

const knownGcd: Record<string, bigint> = {};

export function gcd(a_: ExpectedNumber, b_: ExpectedNumber): bigint {
	const bothNegative = a_ < 0 && b_ < 0;

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

	if (bothNegative) {
		divisor *= -1n;
	}

	knownGcd[key] = divisor;

	return divisor;
}

export function lcm(a: ExpectedNumber, b: ExpectedNumber): bigint {
	return (absBigInt(a) * absBigInt(b)) / gcd(a, b);
}

function wrap(function_: (a: ExpectedNumber, b: ExpectedNumber) => bigint) {
	return (numbers: ExpectedNumber[]): string => {
		let result: ExpectedNumber | undefined;

		for (const n of numbers) {
			result = result === undefined ? n : function_(result, n);
		}

		if (result === undefined) {
			return '';
		}

		return `${result}`;
	};
}

export const gcdArray = wrap(gcd);
export const lcmArray = wrap(lcm);
