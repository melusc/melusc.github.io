import {faker, type UsableLocale} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Datatype: React.FC<{locale: UsableLocale}> = ({locale}) => (
	<Module
		locale={locale}
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
