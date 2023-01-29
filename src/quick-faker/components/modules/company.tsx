import {faker} from '@faker-js/faker';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type React from 'react';

import {Module} from '../module';

export const Company: React.FC = () => (
	<Module
		title='Company'
		module={faker.company}
		keys={[
			'bs',
			'bsAdjective',
			'bsBuzz',
			'bsNoun',
			'catchPhrase',
			'catchPhraseAdjective',
			'catchPhraseDescriptor',
			'catchPhraseNoun',
			'companySuffix',
			'name',

			// Returns all suffixes
			// 'suffixes',

			// Deprecated
			// 'companyName',
		]}
	/>
);
