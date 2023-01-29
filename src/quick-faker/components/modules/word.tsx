import {faker} from '@faker-js/faker';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type React from 'react';

import {Module} from '../module';

export const Address: React.FC = () => (
	<Module
		title='Word'
		module={faker.word}
		keys={[
			'adjective',
			'adverb',
			'conjunction',
			'interjection',
			'noun',
			'preposition',
			'verb',
		]}
	/>
);
