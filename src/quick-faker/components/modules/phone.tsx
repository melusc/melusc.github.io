import {faker, type UsableLocale} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Phone: React.FC<{locale: UsableLocale}> = ({locale}) => (
	<Module
		locale={locale}
		title='Phone'
		module={faker.phone}
		keys={[
			'imei',
			'number',

			// Deprecated
			// 'phoneFormats',
			// 'phoneNumber',
			// 'phoneNumberFormat',
		]}
	/>
);
