import {faker} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Random: React.FC = () => (
	<Module
		title='Random'
		module={faker.random}
		keys={['alpha', 'alphaNumeric', 'locale', 'numeric', 'word', 'words']}
	/>
);
