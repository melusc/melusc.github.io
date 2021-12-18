import json5 from 'json5';

const input = document.querySelector<HTMLTextAreaElement>('#input')!;
const output = document.querySelector<HTMLTextAreaElement>('#output')!;
const prettyPrintInput = document.querySelector<HTMLInputElement>('#pretty')!;
const indent = document.querySelector<HTMLInputElement>('#indent')!;
const errorDiv = document.querySelector<HTMLDivElement>('#errors')!;
const indentWrapper
	= document.querySelector<HTMLDivElement>('#indent-wrapper')!;

let shouldIndent: boolean;
let amountIndent: number | string;

const updateVals = (): void => {
	shouldIndent = prettyPrintInput.checked;

	const parsed = Number(indent.value);
	amountIndent = Number.isFinite(parsed) ? parsed : indent.value;

	indent.disabled = !shouldIndent;
	indentWrapper.classList.toggle('input-active', !shouldIndent);
};

updateVals();

const sortJSON = (value: unknown): unknown => {
	if (typeof value !== 'object' || value === null) {
		return value;
	}

	if (Array.isArray(value)) {
		return value.map(value => sortJSON(value));
	}

	const keys = Object.keys(value).sort((a, b) =>
		a.localeCompare(b, 'en', {
			sensitivity: 'case',
			caseFirst: 'lower',
		}),
	);

	const object: Record<string, unknown> = {};

	for (const key of keys) {
		object[key] = sortJSON((value as Record<string, unknown>)[key]);
	}

	return object;
};

const prettify = (): void => {
	errorDiv.textContent = '';
	try {
		const json = sortJSON(json5.parse(input.value));

		output.value = JSON.stringify(
			json,
			undefined,
			shouldIndent ? amountIndent : undefined,
		);
	} catch (error: unknown) {
		errorDiv.textContent
			= error instanceof Error ? error.message : String(error);
	}
};

const updateFunction = (): void => {
	updateVals();

	prettify();
};

prettyPrintInput.addEventListener('change', updateFunction);

output.addEventListener('click', () => {
	output.focus();
	output.select();
});

indent.addEventListener('change', updateFunction);
indent.addEventListener('input', updateFunction);

input.addEventListener('input', prettify);

/* When duplicating a tab (in Firefox atleast)
    the browser copies the input values from the previous tab
    but that seems to happen delayed so we update the values
    on load (not DOMContentLoaded, fires too early) to make
    sure everything is correct after the browser updates
    the inputs
  */
addEventListener('load', updateFunction, {once: true});
