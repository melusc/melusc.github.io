import {faker} from '@faker-js/faker';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type React from 'react';

import {Module} from '../module';

export const Vehicle: React.FC = () => (
	<Module
		title='Vehicle'
		module={faker.vehicle}
		keys={[
			'bicycle',
			'color',
			'fuel',
			'manufacturer',
			'model',
			'type',
			'vehicle',
			'vin',
			'vrm',
		]}
	/>
);
