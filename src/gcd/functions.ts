const knownGcd: Record<string, number> = {};

export const gcd = (a_: number, b_: number): number => {
	const bothNegative = a_ < 0 && b_ < 0;

	const a = Math.abs(a_);
	const b = Math.abs(b_);

	let dividend = a > b ? a : b;
	let divisor = a > b ? b : a;

	const key = `${dividend},${divisor}`;

	if (key in knownGcd) {
		return knownGcd[key]!;
	}

	let leftover = 1;

	while (leftover !== 0) {
		leftover = dividend % divisor;
		if (leftover !== 0) {
			dividend = divisor;
			divisor = leftover;
		}
	}

	if (bothNegative) {
		divisor *= -1;
	}

	knownGcd[key] = divisor;

	return divisor;
};

export const gcdArray = (numbers: number[]): string => {
	let result = numbers[0];

	if (result === undefined) {
		return '';
	}

	for (let i = 1; i < numbers.length; ++i) {
		result = gcd(result, numbers[i]!);
	}

	return `${result}`;
};
