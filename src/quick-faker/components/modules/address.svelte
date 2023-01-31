<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="Address"
	module={faker.address}
	keys={[
		'buildingNumber',
		'cardinalDirection',
		'city',
		'cityName',
		'country',
		'countryCode',
		'county',
		'direction',
		'latitude',
		'longitude',
		'nearbyGPSCoordinate',
		'ordinalDirection',
		'secondaryAddress',
		'state',
		'stateAbbr',
		'street',
		// With fr_CH address.streetAddress calls address.streetName
		// which is deprecated. This shouldn't be an issue though
		'streetAddress',
		'timeZone',
		'zipCode',

		// Not included due to incompatible types
		// 'zipCodeByState',

		// Deprecated
		// 'cityPrefix',
		// 'citySuffix',
		// 'streetPrefix',
		// 'streetSuffix',
		// 'streetName',
	]}
/>
