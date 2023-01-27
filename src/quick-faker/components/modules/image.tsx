import {faker} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Image: React.FC = () => (
	<Module
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