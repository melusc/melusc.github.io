<div class="fancy-border"></div>

<style lang="scss">
	:global(input) + .fancy-border {
		$height: 3px;

		position: relative;
		top: -$height - 0.5px;
		margin-bottom: -$height - 1px;

		border: none;
		border-bottom: $height solid;
		border-image: linear-gradient(to right, var(--gradient));
		border-image-slice: 1;

		transition: transform 0.3s ease-in-out;

		transform: scaleX(0);
		transform-origin: 100% 0;
	}

	:global(input:focus) + .fancy-border {
		transform: scaleX(1);
		transform-origin: 0 0;
	}
</style>
