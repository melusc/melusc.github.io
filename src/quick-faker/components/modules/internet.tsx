import {faker, type UsableLocale} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Internet: React.FC<{locale: UsableLocale}> = ({locale}) => (
	<Module
		locale={locale}
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
