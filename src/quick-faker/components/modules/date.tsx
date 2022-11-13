import {faker} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Date: React.FC = () => (
	<Module
		title='Date'
		module={faker.date}
		keys={[
			'birthdate',
			'future',
			'month',
			'past',
			'recent',
			'soon',
			'weekday',

			// Not included due to incompatible types
			// 'between',
			// 'betweens',
		]}
	/>
);
