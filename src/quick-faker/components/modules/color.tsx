import {faker, type UsableLocale} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Color: React.FC<{locale: UsableLocale}> = ({locale}) => (
	<Module
		locale={locale}
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
