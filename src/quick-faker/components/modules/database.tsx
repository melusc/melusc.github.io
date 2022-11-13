import {faker} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Database: React.FC = () => (
	<Module
		title='Database'
		module={faker.database}
		keys={['collation', 'column', 'engine', 'mongodbObjectId', 'type']}
	/>
);
