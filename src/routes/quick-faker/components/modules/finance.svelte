<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="Finance"
	module={faker.finance}
	keys={[
		'account',
		'accountName',
		'amount',
		'bic',
		'bitcoinAddress',
		'creditCardCVV',
		'creditCardIssuer',
		'creditCardNumber',
		'currencyCode',
		'currencyName',
		'currencySymbol',
		'ethereumAddress',
		'iban',
		'mask',
		'pin',
		'routingNumber',
		'transactionDescription',
		'transactionType',
	]}
/>
