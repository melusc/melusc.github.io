import {faker, type UsableLocale} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Git: React.FC<{locale: UsableLocale}> = ({locale}) => (
	<Module
		locale={locale}
		title='Git'
		module={faker.git}
		keys={['branch', 'commitEntry', 'commitMessage', 'commitSha', 'shortSha']}
	/>
);
