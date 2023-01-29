import {faker} from '@faker-js/faker';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type React from 'react';

import {Module} from '../module';

export const Name: React.FC = () => (
	<Module
		title='Name'
		module={faker.name}
		keys={[
			'firstName',
			'fullName',
			'gender',
			'jobArea',
			'jobDescriptor',
			'jobTitle',
			'jobType',
			'lastName',
			'middleName',
			'prefix',
			'sex',
			'sexType',
			'suffix',

			// Deprecated
			// 'findName'
		]}
	/>
);
