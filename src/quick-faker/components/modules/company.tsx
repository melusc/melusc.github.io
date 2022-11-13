import {faker, type UsableLocale} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Company: React.FC<{locale: UsableLocale}> = ({locale}) => (
	<Module
		locale={locale}
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
