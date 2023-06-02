<script lang="ts">
	import Locale from './components/locale.svelte';
	import Airline from './components/modules/airline.svelte';
	import Animal from './components/modules/animal.svelte';
	import Color from './components/modules/color.svelte';
	import Commerce from './components/modules/commerce.svelte';
	import Company from './components/modules/company.svelte';
	import Database from './components/modules/database.svelte';
	import Datatype from './components/modules/datatype.svelte';
	import Date from './components/modules/date.svelte';
	import Finance from './components/modules/finance.svelte';
	import Git from './components/modules/git.svelte';
	import Hacker from './components/modules/hacker.svelte';
	import Image from './components/modules/image.svelte';
	import Internet from './components/modules/internet.svelte';
	import Location from './components/modules/location.svelte';
	import Lorem from './components/modules/lorem.svelte';
	import Music from './components/modules/music.svelte';
	import Number from './components/modules/number.svelte';
	import Person from './components/modules/person.svelte';
	import Phone from './components/modules/phone.svelte';
	import String from './components/modules/string.svelte';
	import System from './components/modules/system.svelte';
	import Vehicle from './components/modules/vehicle.svelte';
	import Word from './components/modules/word.svelte';
	import './style.scss';
</script>

<svelte:head>
	<title>Quick Faker</title>
</svelte:head>

<div id="quick-faker">
	<div class="align-center">
		<h1 class="app-title">Quick Faker</h1>

		<Locale />
		<Airline />
		<Animal />
		<Color />
		<Commerce />
		<Company />
		<Database />
		<Datatype />
		<Date />
		<Finance />
		<Git />
		<Hacker />
		<Image />
		<Internet />
		<Location />
		<Lorem />
		<Music />
		<Number />
		<Person />
		<Phone />
		<String />
		<System />
		<Vehicle />
		<Word />
	</div>
</div>

<style>
	.app-title {
		text-align: center;
	}
</style>
