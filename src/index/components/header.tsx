import {ReactComponent as Github} from '../icons/github.svg';

import '../styles/header.scss';

export const Header: React.FC = () => (
	<header>
		<div className='header-start'>
			<a href='/'>melusc.github.io</a>
		</div>
		<div className='header-end'>
			<a href='https://github.com/melusc' rel='noreferrer noopener'>
				<Github />
			</a>
		</div>
	</header>
);
