import {faker} from '@faker-js/faker';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type React from 'react';

import {Module} from '../module';

export const Random: React.FC = () => (
	<Module
		title='Random'
		module={faker.random}
		keys={['alpha', 'alphaNumeric', 'locale', 'numeric', 'word', 'words']}
	/>
);
