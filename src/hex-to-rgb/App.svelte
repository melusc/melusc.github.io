<script lang="ts">
	import {debounce} from 'lodash-es';
	import rgbHex from 'rgb-hex';
	import HexInput from './components/hex-input.svelte';
	import RgbaInput from './components/rgba-input.svelte';
	import {hexRgb} from './util';

	let red: number = 0;
	let blue: number = 0;
	let green: number = 0;
	let alpha: number | undefined;

	function randomColour() {
		const [red_, blue_, green_] = crypto.getRandomValues(new Uint8Array(3));
		red = red_!;
		blue = blue_!;
		green = green_!;
		alpha = undefined;

		setHashInstantly();
	}

	$: {
		red;
		blue;
		green;
		alpha;
		setHashDebounced();
	}

	function setHashInstantly(): void {
		const hex = `#${rgbHex(red, green, blue, alpha)}`;

		if (hex !== location.hash) {
			/*
      https://developer.mozilla.org/en-US/docs/Web/API/History/pushState#description
      -> history.pushState doesn't trigger hashchange

      Alternative would be storing current hex and location.hash and
      when setHash updates the hash, the stored hex and hash will be the same
      and if the user goes back in history the stored hex and hash will not be the same
    */
			history.pushState({}, '', hex);
		}
	}

	/*
		To not spam the history
	*/
	const setHashDebounced = debounce(setHashInstantly, 800, {
		leading: true,
		trailing: true,
		maxWait: 1500,
	});

	function readHexFromHash(): void {
		const hex = location.hash;

		try {
			({red, green, blue, alpha} = hexRgb(hex));
		} catch {
			randomColour();
		}
	}

	readHexFromHash();
</script>

<svelte:window on:hashchange={readHexFromHash} />

<div
	class="horizontal-vertical-center"
	style:background-color="rgba({red}, {green}, {blue}, {alpha ?? 1})"
>
	<div class="floating-box">
		<div class="row">
			<div>Hex</div>
			<div class="inputs-rows">
				<HexInput bind:red bind:green bind:blue bind:alpha />
			</div>
		</div>

		<div class="row">
			<div>Rgba</div>
			<div class="inputs-rows">
				<RgbaInput bind:red bind:green bind:blue bind:alpha />
			</div>
		</div>
		<div class="row">
			<div class="rainbow-box">
				<div
					class="rainbow-text"
					on:click={randomColour}
					on:keydown={randomColour}
				>
					Random colour
				</div>
				<div class="rainbow-bg" />
			</div>
		</div>
	</div>
</div>
