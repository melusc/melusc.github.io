import {h} from 'preact';
import '../styles/navbar.scss';

import {AngleLeft, DotsVertical} from './icons';

export const Navbar = (): h.JSX.Element => (
	<div class="navbar">
		<AngleLeft />
		<span>Running</span>
		<DotsVertical />
	</div>
);
