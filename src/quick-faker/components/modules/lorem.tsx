import {faker, type UsableLocale} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Lorem: React.FC<{locale: UsableLocale}> = ({locale}) => (
	<Module
		locale={locale}
		title='Lorem'
		module={faker.lorem}
		keys={[
			'lines',
			'paragraph',
			'paragraphs',
			'sentence',
			'slug',
			'text',
			'word',
			'words',
		]}
	/>
);
