import {faker, type UsableLocale} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Hacker: React.FC<{locale: UsableLocale}> = ({locale}) => (
	<Module
		locale={locale}
		title='Hacker'
		module={faker.hacker}
		keys={['abbreviation', 'adjective', 'ingverb', 'noun', 'phrase', 'verb']}
	/>
);
