import {faker} from '@faker-js/faker';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type React from 'react';

import {Module} from '../module';

export const Music: React.FC = () => (
	<Module title='Music' module={faker.music} keys={['genre', 'songName']} />
);
