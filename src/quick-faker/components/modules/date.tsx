import {faker} from '@faker-js/faker';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type React from 'react';

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
