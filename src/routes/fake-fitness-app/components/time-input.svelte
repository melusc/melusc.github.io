<script module lang="ts">
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat.js';

	dayjs.extend(customParseFormat);

	const timeAtLoad = dayjs().format('HH:mm');
</script>

<script lang="ts">
	import {timeValid, toTime} from '../util.ts';

	let {
		class: className,
		time = $bindable(timeAtLoad),
		width,
	}: {class?: string; time?: string; width?: string} = $props();

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
	oninput={onInput}
	style:width
/>
