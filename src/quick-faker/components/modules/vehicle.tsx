import {faker, type UsableLocale} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Vehicle: React.FC<{locale: UsableLocale}> = ({locale}) => (
	<Module
		locale={locale}
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
