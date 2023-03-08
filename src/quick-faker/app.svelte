<script lang="ts">
	import Locale from './components/locale.svelte';

	import Address from './components/modules/address.svelte';
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
	import Lorem from './components/modules/lorem.svelte';
	import Music from './components/modules/music.svelte';
	import Name from './components/modules/name.svelte';
	import Phone from './components/modules/phone.svelte';
	import Random from './components/modules/random.svelte';
	import System from './components/modules/system.svelte';
	import Vehicle from './components/modules/vehicle.svelte';
</script>

<h1 class="app-title">Quick Faker</h1>

<Locale />

<Address />
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
<Lorem />
<Music />
<Name />
<Phone />
<Random />
<System />
<Vehicle />

<style>
	.app-title {
		text-align: center;
	}
</style>
