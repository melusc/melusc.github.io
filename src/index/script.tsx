import React from 'react';
import ReactDOM from 'react-dom';

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

const root = document.querySelector<HTMLDivElement>('#root');

if (root) {
	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
		root,
	);
}
