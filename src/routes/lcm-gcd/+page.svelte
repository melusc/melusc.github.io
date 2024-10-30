<script lang="ts">
	import {gcdArray, lcmArray} from './math.ts';
	import {States, parseInput} from './parse-input.ts';
	import './style.scss';

	let input = $state('');

	const {state: state_, uniques} = $derived(parseInput(input));
</script>

<svelte:head>
	<title>LCM & GCD calculator</title>
</svelte:head>

<div id="lcm-gcd">
	<div class="box">
		<input bind:value={input} placeholder="2, 5, 9-13" />

		{#if state_ === States.tooLarge}
			<div>One or more numbers were too large</div>
		{:else if state_ === States.divBy0}
			<div>One or more numbers were 0</div>
		{:else if state_ === States.notAnInteger}
			<div>One or more numbers were not an integer</div>
		{:else if state_ === States.valid}
			{#if uniques?.length}
				<div>Least common multiple: {lcmArray(uniques)}</div>
				<div>Greatest common divisor: {gcdArray(uniques)}</div>
			{:else}
				<div>Enter some numbers</div>
			{/if}
		{/if}
	</div>
</div>
