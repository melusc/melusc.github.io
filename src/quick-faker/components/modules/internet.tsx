import {faker} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Internet: React.FC = () => (
	<Module
		title='Internet'
		module={faker.internet}
		keys={[
			'avatar',
			'color',
			'domainName',
			'email',
			'emoji',
			'exampleEmail',
			'httpMethod',
			'httpStatusCode',
			'ip',
			'ipv4',
			'ipv6',
			'mac',
			'password',
			'port',
			'protocol',
			'url',
			'userAgent',
			'userName',
		]}
	/>
);
