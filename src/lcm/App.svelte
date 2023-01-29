<script lang="ts">
	import {lcmArray} from './functions';

	const enum States {
		valid,
		divBy0,
		tooLarge,
		notAnInteger,
	}

	let state: States = States.valid;

	let input: string = '';
	let output: string = '';

	$: {
		const split = input
			// Remove non-necessary characters
			.split(',')
			.map(s => s.trim())
			.filter(Boolean);
		const newVals = [];

		// Turn 4-10 into [4,5,6,7,8,9,10]
		for (const item of split) {
			const match = /(?<first>-?\d+)-(?<second>-?\d+)/.exec(item);
			if (match?.groups) {
				const groups = match.groups;
				const sFirstNumber = groups['first'];
				const sSecondNumber = groups['second'];
				const firstNumber = Math.trunc(Number(sFirstNumber));
				const secondNumber = Math.trunc(Number(sSecondNumber));

				const lower = Math.min(firstNumber, secondNumber);
				const upper = Math.max(firstNumber, secondNumber);

				for (let index = lower; index <= upper; ++index) {
					newVals.push(index);
				}
			} else {
				const newValue = Math.trunc(Number(item));
				newVals.push(newValue);
			}
		}

		if (newVals.some(value => !Number.isSafeInteger(value))) {
			state = States.tooLarge;
		} else if (newVals.includes(0)) {
			state = States.divBy0;
		} else if (newVals.some(value => !Number.isInteger(value))) {
			state = States.notAnInteger;
		} else {
			const uniques = [...new Set(newVals)];
			uniques.sort((a, b) => a - b);

			output = lcmArray(uniques);
			state = States.valid;
		}
	}
</script>

<div class="box">
	<input bind:value={input} placeholder="2, 5, 9-13" />

	{#if state === States.tooLarge}
		<div>One or more numbers were too large</div>
	{:else if state === States.divBy0}
		<div>One or more numbers were 0</div>
	{:else if state === States.notAnInteger}
		<div>One or more numbers were not an integer</div>
	{:else if state === States.valid}
		<div>LCM: {output || 'Enter some numbers'}</div>
	{/if}
</div>
