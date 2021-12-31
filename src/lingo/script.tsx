import React from 'react';
import ReactDOM from 'react-dom';
import {Lingo} from './components/lingo';
import './style.scss';

const Main: React.FC = () => <Lingo />;

const root = document.querySelector<HTMLDivElement>('#root');
if (root) {
	ReactDOM.render(
		<React.StrictMode>
			<Main />
		</React.StrictMode>,
		root,
	);
}
