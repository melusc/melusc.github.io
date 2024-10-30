<script lang="ts">
	import type {Snippet} from 'svelte';

	import '../common/common.scss';
	import '../common/theme.scss';

	const {children}: {children: Snippet} = $props();
</script>

{@render children()}
