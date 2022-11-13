import {faker} from '@faker-js/faker';
import React from 'react';

import {Module} from '../module';

export const Finance: React.FC = () => (
	<Module
		title='Finance'
		module={faker.finance}
		keys={[
			'account',
			'accountName',
			'amount',
			'bic',
			'bitcoinAddress',
			'creditCardCVV',
			'creditCardIssuer',
			'creditCardNumber',
			'currencyCode',
			'currencyName',
			'currencySymbol',
			'ethereumAddress',
			'iban',
			'mask',
			'pin',
			'routingNumber',
			'transactionDescription',
			'transactionType',
		]}
	/>
);
