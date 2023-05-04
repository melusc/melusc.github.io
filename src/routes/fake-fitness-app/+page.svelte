<script lang="ts">
	import * as CONSTS from './consts.ts';
	import Help from './components/help.svelte';
	import MainAppDateTime from './components/main-app-date-time.svelte';
	import Navbar from './components/navbar.svelte';
	import NotificationBar from './components/notification-bar.svelte';
	import TimeOverview from './components/time-overview.svelte';
	import WorkoutDetails from './components/workout-details.svelte';
	import WorkoutImages from './components/workout-images.svelte';
	import './style.scss';

	import {browser} from '$app/environment';

	let width = 1440;
	let height = 2960;
	$: biggestSize = Math.max(width, height);

	let distance = CONSTS.distance;
	let duration = CONSTS.duration;

	if (browser) {
		// A bit hacky
		// remove sanitize.css because this was designed without sanitize.css initially
		document
			.querySelector('link[rel="stylesheet"][href*="sanitize.css"]')
			?.remove();
	}
</script>

<svelte:head>
	<title>Fake Fitness App</title>
</svelte:head>

<div class="App">
	<div class="inputs">
		<div>
			<label for="width">Width:</label>
			<input id="width" type="number" placeholder="width" bind:value={width} />
		</div>
		<div>
			<label for="height">Height:</label>
			<input
				id="height"
				type="number"
				placeholder="height"
				bind:value={height}
			/>
		</div>
	</div>
	<div
		style:width={`${(width / biggestSize) * 100}vmin`}
		style:height={`${(height / biggestSize) * 100}vmin`}
		class="fake-app"
	>
		<NotificationBar />
		<Navbar />
		<MainAppDateTime {duration} />
		<TimeOverview bind:duration bind:distance />
		<WorkoutDetails {duration} {distance} />
		<WorkoutImages />
	</div>
	<Help />
</div>
