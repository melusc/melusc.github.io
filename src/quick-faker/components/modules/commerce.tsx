import {faker, type UsableLocale} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Commerce: React.FC<{locale: UsableLocale}> = ({locale}) => (
	<Module
		locale={locale}
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
