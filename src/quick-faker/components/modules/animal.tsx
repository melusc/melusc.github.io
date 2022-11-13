import {faker} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Animal: React.FC = () => (
	<Module
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
