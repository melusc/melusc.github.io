import {jsonDts} from '@lusc/json-dts';
import type {JsonValue} from 'type-fest';

const textareaIn = document.querySelector<HTMLTextAreaElement>('#in')!;
const textareaOut = document.querySelector<HTMLTextAreaElement>('#out')!;

function onInput(): void {
	const input = textareaIn.value;

	try {
		const json = JSON.parse(input) as JsonValue;
		textareaIn.classList.remove('invalid');

		textareaOut.value = jsonDts(json);
	} catch {
		textareaIn.classList.add('invalid');
	}
}

textareaIn.addEventListener('input', onInput);

if (!textareaIn.value) {
	textareaIn.value = JSON.stringify(
		{
			id: 0,
			data: {
				age: 20,
				name: 'Bob Smith',
			},
		},
		undefined,
		2,
	);
}

onInput();
