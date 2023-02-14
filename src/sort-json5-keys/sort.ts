export function sortJson(value: unknown): unknown {
	if (typeof value !== 'object' || value === null) {
		return value;
	}

	if (Array.isArray(value)) {
		return value.map(value => sortJson(value));
	}

	const keys = Object.keys(value).sort((a, b) =>
		a.localeCompare(b, 'en', {
			sensitivity: 'case',
			caseFirst: 'lower',
		}),
	);

	const object: Record<string, unknown> = {};

	for (const key of keys) {
		object[key] = sortJson((value as Record<string, unknown>)[key]);
	}

	return object;
}
