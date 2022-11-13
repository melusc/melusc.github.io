import {faker, type UsableLocale} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const System: React.FC<{locale: UsableLocale}> = ({locale}) => (
	<Module
		locale={locale}
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
