import {faker} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const System: React.FC = () => (
	<Module
		title='System'
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
);
