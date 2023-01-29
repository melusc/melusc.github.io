import {faker} from '@faker-js/faker';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type React from 'react';

import {Module} from '../module';

export const Phone: React.FC = () => (
	<Module
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
