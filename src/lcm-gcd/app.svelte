<script lang="ts">
	import {gcdArray, lcmArray} from './math';
	import {States, parseInput} from './parse-input';

	let input = '';

	$: ({state, uniques} = parseInput(input));
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
		{#if uniques && uniques.length}
			<div>Least common multiple: {lcmArray(uniques)}</div>
			<div>Greatest common divisor: {gcdArray(uniques)}</div>
		{:else}
			<div>Enter some numbers</div>
		{/if}
	{/if}
</div>
