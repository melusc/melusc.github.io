<script lang="ts">
	export let batteryLevel = '100%';
	$: batteryPercent = Number(/^\d+/.exec(batteryLevel)?.[0] ?? 0);
</script>

<svg
	fill="none"
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width="1.5"
	stroke="currentColor"
	viewBox="0 0 24 24"
	transform="rotate(-90)"
	class="icon-battery"
	class:invalid={batteryPercent <= 15}
>
	<path
		d="M6 7h11a2 2 0 0 1 2 2v.5a.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5v.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2"
	/>
	{#if batteryPercent > 0}<path d="M7 10v4" />{/if}
	{#if batteryPercent > 25}<path d="M10 10v4" />{/if}
	{#if batteryPercent > 50}<path d="M13 10v4" />{/if}
	{#if batteryPercent > 75}<path d="M16 10v4" />{/if}
</svg>
