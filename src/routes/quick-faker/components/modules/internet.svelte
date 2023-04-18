<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="Internet"
	module={faker.internet}
	keys={[
		'avatar',
		'color',
		'domainName',
		'email',
		'emoji',
		'exampleEmail',
		'httpMethod',
		'httpStatusCode',
		'ip',
		'ipv4',
		'ipv6',
		'mac',
		'password',
		'port',
		'protocol',
		'url',
		'userAgent',
		'userName',
	]}
/>
