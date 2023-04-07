declare module '*.svg' {
	import type React from 'react';

	export const ReactComponent: React.FC<React.SVGProps<SVGElement>>;
}

declare module '*.svg?url' {
	export default string;
}
