import '../styles/navbar.scss';

import {DotsVertical, AngleLeft} from './icons';

const Navbar: React.FC = () => (
	<div className='navbar'>
		<AngleLeft className='navbar-angle-left' />
		<span>Running</span>
		<DotsVertical className='navbar-dots-vertical' />
	</div>
);

export default Navbar;
