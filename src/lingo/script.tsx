import React from 'react';
import ReactDOM from 'react-dom';
import {Lingo} from './components/lingo';

const root = document.querySelector<HTMLDivElement>('#root');
if (root) {
	ReactDOM.render(
		<React.StrictMode>
			<Lingo />
		</React.StrictMode>,
		root,
	);
}
