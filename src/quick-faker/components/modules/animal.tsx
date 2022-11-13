import {faker, type UsableLocale} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Animal: React.FC<{locale: UsableLocale}> = ({locale}) => (
	<Module
		locale={locale}
		title='Animal'
		module={faker.animal}
		keys={[
			'bear',
			'bird',
			'cat',
			'cetacean',
			'cow',
			'crocodilia',
			'dog',
			'fish',
			'horse',
			'insect',
			'lion',
			'rabbit',
			'rodent',
			'snake',
			'type',
		]}
	/>
);
