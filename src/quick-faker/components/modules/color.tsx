import {faker} from '@faker-js/faker';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type React from 'react';

import {Module} from '../module';

export const Color: React.FC = () => (
	<Module
		title='Color'
		module={faker.color}
		keys={[
			'cmyk',
			'colorByCSSColorSpace',
			'cssSupportedFunction',
			'cssSupportedSpace',
			'hsl',
			'human',
			'hwb',
			'lab',
			'lch',
			'rgb',
			'space',
		]}
	/>
);
