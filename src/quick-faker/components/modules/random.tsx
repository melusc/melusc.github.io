import {faker, type UsableLocale} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Random: React.FC<{locale: UsableLocale}> = ({locale}) => (
	<Module
		locale={locale}
		title='Random'
		module={faker.random}
		keys={['alpha', 'alphaNumeric', 'locale', 'numeric', 'word', 'words']}
	/>
);
