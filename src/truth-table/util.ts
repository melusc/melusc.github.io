import {generateTable, type ParsedTable} from '@lusc/truth-table';

export function getHash(): string {
	return decodeURIComponent(location.hash.slice(1)).trim();
}

export function tryGenerateTable(
	input: string,
): {valid: true; table: ParsedTable} | {valid: false; error: Error} {
	try {
		return {
			valid: true,
			table: generateTable(input),
		};
	} catch (error: unknown) {
		return {
			valid: false,
			error: error as Error,
		};
	}
}
