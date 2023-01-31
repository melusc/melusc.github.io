<script lang="ts">
	import {faker} from '@faker-js/faker';

	import Module from '../module.svelte';
</script>

<Module
	title="System"
	module={faker.system}
	keys={[
		'commonFileExt',
		'commonFileName',
		'commonFileType',
		'cron',
		'directoryPath',
		'fileExt',
		'fileName',
		'filePath',
		'fileType',
		'mimeType',
		'networkInterface',
		'semver',
	]}
/>
