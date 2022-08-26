declare module 'jsx:*' {
	import type React from 'react';

	const SvgComponent: React.FC<React.SVGProps<SVGElement>>;
	export default SvgComponent;
}
