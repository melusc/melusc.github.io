import {faker, type UsableLocale} from '@faker-js/faker';
import React, {useState} from 'react';
import {LocaleContext} from './locale';

import {Address} from './modules/address';
import {Animal} from './modules/animal';
import {Color} from './modules/color';
import {Commerce} from './modules/commerce';
import {Company} from './modules/company';
import {Database} from './modules/database';
import {Datatype} from './modules/datatype';
import {Date} from './modules/date';
import {Finance} from './modules/finance';
import {Git} from './modules/git';
import {Hacker} from './modules/hacker';
import {Image} from './modules/image';
import {Internet} from './modules/internet';
import {Lorem} from './modules/lorem';
import {Music} from './modules/music';
import {Name} from './modules/name';
import {Phone} from './modules/phone';
import {Random} from './modules/random';
import {System} from './modules/system';
import {Vehicle} from './modules/vehicle';

const locales: UsableLocale[] = Object.keys(faker.locales);

export const App: React.FC = () => {
	const [locale, setLocale] = useState<UsableLocale>('en');

	const setLocale_: React.FormEventHandler<HTMLSelectElement> = event => {
		const locale = event.currentTarget.value as UsableLocale;

		faker.setLocale(locale);
		setLocale(locale);
	};

	return (
		<div className='App'>
			<h1 className='app-title'>Quick Faker</h1>
			<select
				className='language-select'
				defaultValue='en'
				onInput={setLocale_}
			>
				<option value='en'>en</option>

				{locales.map(locale => (
					<option key={locale} value={locale}>
						{locale}
					</option>
				))}
			</select>

			<LocaleContext.Provider value={locale}>
				<Address />
				<Animal />
				<Color />
				<Commerce />
				<Company />
				<Database />
				<Datatype />
				<Date />
				<Finance />
				<Git />
				<Hacker />
				<Image />
				<Internet />
				<Lorem />
				<Music />
				<Name />
				<Phone />
				<Random />
				<System />
				<Vehicle />
			</LocaleContext.Provider>
		</div>
	);
};
