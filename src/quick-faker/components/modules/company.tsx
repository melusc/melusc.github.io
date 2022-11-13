import {faker} from '@faker-js/faker';
import React from 'react';

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
			'suffixes',

			// Deprecated
			// 'companyName',
		]}
	/>
);
