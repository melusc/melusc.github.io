import {h} from 'preact';

import {Github} from './icons';

export const Header = () => (
	<header>
		<a href="/">melusc.github.io</a>
		<a href="https://github.com/melusc" rel="noreferrer noopener">
			<Github />
		</a>
	</header>
);
