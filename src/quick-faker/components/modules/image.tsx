import {faker, type UsableLocale} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Image: React.FC<{locale: UsableLocale}> = ({locale}) => (
	<Module
		locale={locale}
		title='Image'
		module={faker.image}
		keys={[
			'abstract',
			'animals',
			'avatar',
			'business',
			'cats',
			'city',
			'dataUri',
			'fashion',
			'food',
			'image',
			'imageUrl',
			'nature',
			'nightlife',
			'people',
			'sports',
			'technics',
			'transport',

			// Not included due to incompatible types
			// 'lorempicsum',
			// 'lorempixel',
			// 'placeholder',
			// 'unsplash',
		]}
	/>
);
