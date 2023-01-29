import {faker} from '@faker-js/faker';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type React from 'react';

import {Module} from '../module';

export const Database: React.FC = () => (
	<Module
		title='Database'
		module={faker.database}
		keys={['collation', 'column', 'engine', 'mongodbObjectId', 'type']}
	/>
);
