import {faker} from '@faker-js/faker';
import React from 'react';
import {createRoot} from 'react-dom/client.js';

import {App} from './components/app';

// @ts-expect-error It is not a defined as a global
window.faker = faker;

createRoot(document.querySelector('#root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
