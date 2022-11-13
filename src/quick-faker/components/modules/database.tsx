import {faker, type UsableLocale} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Database: React.FC<{locale: UsableLocale}> = ({locale}) => (
	<Module
		locale={locale}
		title='Database'
		module={faker.database}
		keys={['collation', 'column', 'engine', 'mongodbObjectId', 'type']}
	/>
);
