import React from 'react';
import '../styles/navbar.scss';

import {AngleLeft, DotsVertical} from './icons';

const Navbar = (): JSX.Element => (
	<div className="navbar">
		<AngleLeft />
		<span>Running</span>
		<DotsVertical />
	</div>
);

export default Navbar;
