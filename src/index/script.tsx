import {Fragment, h, render} from 'preact';
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

render(<App />, document.body);
