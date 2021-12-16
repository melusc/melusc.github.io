import React from 'react';
import {IndexedError} from '../lib/indexed-error';

import './render-error.scss';

export const RenderError = ({error, input}: {error: Error; input: string}) => {
	console.error(error);

	if (error instanceof IndexedError) {
		return (
			<div className="error">
				<div className="error-message">Malformed input</div>
				<div className="error-input">
					{input.slice(0, error.from)}
					<span className="error-input-incorrect">
						{input.slice(error.from, error.to)}
					</span>
					{input.slice(error.to)}
				</div>
			</div>
		);
	}

	return (
		<div className="error">
			<div className="error-message">{error.message}</div>
		</div>
	);
};
