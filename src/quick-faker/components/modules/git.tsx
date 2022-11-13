import {faker} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Git: React.FC = () => (
	<Module
		title='Git'
		module={faker.git}
		keys={['branch', 'commitEntry', 'commitMessage', 'commitSha', 'shortSha']}
	/>
);
