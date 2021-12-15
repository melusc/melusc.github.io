import {h} from 'preact';
import {IndexedError} from '../lib/indexed-error';

import './render-error.scss';

export const RenderError = ({error, input}: {error: Error; input: string}) => {
	console.error(error);

	if (error instanceof IndexedError) {
		return (
			<div class="error">
				<div class="error-message">Malformed input</div>
				<div class="error-input">
					{input.slice(0, error.from)}
					<span class="error-input-incorrect">
						{input.slice(error.from, error.to)}
					</span>
					{input.slice(error.to)}
				</div>
			</div>
		);
	}

	return (
		<div class="error">
			<div class="error-message">{error.message}</div>
		</div>
	);
};
