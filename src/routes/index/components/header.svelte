<script lang="ts">
	import Github from './icons/github.svelte';
</script>

<header>
	<div class="header-start">
		<a href="/">lusc.ch</a>
	</div>
	<div class="header-end">
		<a href="https://github.com/melusc" rel="noreferrer noopener">
			<Github />
		</a>
	</div>
</header>

<style lang="scss">
	@use 'sass:color';
	@import '../../../common/theme.scss';

	header {
		background-color: $card;
		padding: 1.5em 1em;

		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;

		box-shadow: 0 2px 7px color.adjust($card, $lightness: -7%);
	}

	.header-start {
		grid-column: 1;
	}

	.header-end {
		grid-column: 3;
		justify-content: flex-end;
	}

	.header-end,
	.header-start {
		display: flex;
		align-items: center;
	}

	header :global(svg) {
		height: 1.7em;
	}
</style>
