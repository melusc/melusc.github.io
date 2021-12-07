import {h} from 'preact';

import './render-error.scss';

export const RenderError = ({error}: {error: Error}) => (
	<div class="error">
		<pre>{error.message}</pre>
	</div>
);
