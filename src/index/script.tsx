import React from 'react';
// eslint-disable-next-line n/file-extension-in-import
import {createRoot} from 'react-dom/client';

import {Header} from './components/header';
import {Projects} from './components/projects';

const App: React.FC = () => (
	<>
		<Header />
		<main>
			<Projects />
		</main>
	</>
);

const container = document.querySelector('#root');

if (container) {
	const root = createRoot(container);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
}
