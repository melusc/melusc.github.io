<script context="module" lang="ts">
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat.js';

	dayjs.extend(customParseFormat);

	const timeAtLoad = dayjs().format('HH:mm');
</script>

<script lang="ts">
	import {timeValid, toTime} from '../util.ts';

	let className: string | undefined = undefined;
	export {className as class};
	export let time = timeAtLoad;
	export let width: string | undefined = undefined;

	function onInput(event: {currentTarget: HTMLInputElement}): void {
		const value = event.currentTarget.value;
		time = timeValid(value) ? toTime(value).format('HH:mm') : value;
	}
</script>

<input
	class="input-remove-input-visuals {className ?? ''}"
	class:invalid={!timeValid(time)}
	value={time}
	placeholder="HH:mm"
	on:input={onInput}
	style:width
/>
