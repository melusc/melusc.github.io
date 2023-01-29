import {faker} from '@faker-js/faker';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type React from 'react';

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
