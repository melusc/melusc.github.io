declare module 'jsx:*' {
	import React from 'react';

	const SvgComponent: React.FC<React.SVGProps<SVGElement>>;
	export default SvgComponent;
}
