import React from 'react';
import {createRoot} from 'react-dom/client.js';
import Menu from './components/navigate-menu';

const container = document.querySelector('#root');

if (container) {
	const root = createRoot(container);
	root.render(
		<React.StrictMode>
			<Menu />
		</React.StrictMode>,
	);
}
