import {faker} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Music: React.FC = () => (
	<Module title='Music' module={faker.music} keys={['genre', 'songName']} />
);
