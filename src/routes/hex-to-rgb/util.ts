import hexRgb_ from 'hex-rgb';

export function hexRgb(hex: string): {
	red: number;
	green: number;
	blue: number;
	alpha: number | undefined;
} {
	hex = hex.trim().replace(/^#/, '');
	const {red, green, blue, alpha} = hexRgb_(hex);

	return {
		red,
		green,
		blue,
		alpha: [4, 8].includes(hex.length)
			? Math.round(alpha * 100) / 100
			: undefined,
	};
}
