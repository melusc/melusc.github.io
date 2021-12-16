import React from 'react';
import ReactDOM from 'react-dom';

import {Header} from './components/header';

import {Projects} from './components/projects';

const App = () => (
	<>
		<Header />
		<main>
			<Projects />
		</main>
	</>
);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.body,
);
