import {faker} from '@faker-js/faker';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type React from 'react';

import {Module} from '../module';

export const Lorem: React.FC = () => (
	<Module
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
