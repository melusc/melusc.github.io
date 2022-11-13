import {faker} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Commerce: React.FC = () => (
	<Module
		title='Commerce'
		module={faker.commerce}
		keys={[
			'department',
			'price',
			'product',
			'productAdjective',
			'productDescription',
			'productMaterial',
			'productName',

			// Deprecated
			// 'color',
		]}
	/>
);
