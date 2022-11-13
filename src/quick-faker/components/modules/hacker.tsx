import {faker} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Hacker: React.FC = () => (
	<Module
		title='Hacker'
		module={faker.hacker}
		keys={['abbreviation', 'adjective', 'ingverb', 'noun', 'phrase', 'verb']}
	/>
);
