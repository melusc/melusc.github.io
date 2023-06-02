<script lang="ts">
	import Header from './index/components/header.svelte';
	import Projects from './index/components/projects.svelte';
	import './index/style.scss';
</script>

<svelte:head>
	<title>My Projects</title>
</svelte:head>

<div id="index">
	<Header />
	<Projects />
</div>
