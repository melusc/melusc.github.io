declare module 'jsx:*' {
	import React from 'react';

	const SvgComponent: (props: React.SVGProps<SVGElement>) => JSX.Element;
	export default SvgComponent;
}
