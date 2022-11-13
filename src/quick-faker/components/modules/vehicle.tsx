import {faker} from '@faker-js/faker';
import React from 'react';

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
