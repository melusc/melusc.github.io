import {h} from 'preact';

import {Github} from './icons';

import '../styles/header.scss';

export const Header = () => (
	<header>
		<div class="header-start">
			<a href="/">melusc.github.io</a>
		</div>
		<div class="header-end">
			<a href="https://github.com/melusc" rel="noreferrer noopener">
				<Github />
			</a>
		</div>
	</header>
);
