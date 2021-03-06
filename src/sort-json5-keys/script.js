(() => {
	const json5 = require('json5');
	const input = document.querySelector('#input');
	const output = document.querySelector('#output');
	const prettyPrintInput = document.querySelector('#pretty');
	const indent = document.querySelector('#indent');
	const errorDiv = document.querySelector('#errors');
	const indentWrapper = document.querySelector('#indent-wrapper');
	const indentMax = Number(indent.max);
	const indentMin = Number(indent.min);

	let shouldIndent;
	let amountIndent;

	const updateVals = () => {
		shouldIndent = prettyPrintInput.checked;

		const indentValue = Number(indent.value);
		amountIndent
			= indentValue > indentMax
				? indentMax
				: (indentValue < indentMin
				? indentMax
				: indentValue);

		indent.value = amountIndent;

		indent.disabled = !shouldIndent;
		indentWrapper.classList.toggle('input-active', !shouldIndent);
	};

	updateVals();

	const sortJSON = value => {
		if (typeof value !== 'object') {
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

		const object = {};

		for (const key of keys) {
			object[key] = value[key];
		}

		return object;
	};

	const prettify = () => {
		errorDiv.textContent = '';
		try {
			const json = sortJSON(json5.parse(input.value));

			output.value = JSON.stringify(
				json,
				undefined,
				shouldIndent && amountIndent,
			);
		} catch (error) {
			errorDiv.textContent = error.message;
		}
	};

	const updateFunction = () => {
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
})();
