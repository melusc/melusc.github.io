import React from 'react';
import {createRoot} from 'react-dom/client.js';

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
