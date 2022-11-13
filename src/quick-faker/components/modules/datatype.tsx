import {faker} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Datatype: React.FC = () => (
	<Module
		title='Datatype'
		module={faker.datatype}
		keys={[
			'array',
			'bigInt',
			'boolean',
			'datetime',
			'float',
			'hexadecimal',
			'json',
			'number',
			'string',
			'uuid',
		]}
	/>
);
