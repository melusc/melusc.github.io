import React from 'react';
import styled from 'styled-components';

import {IndexedError} from '../lib/indexed-error';

const StyledError = styled.div`
	display: flex;
	flex-direction: column;

	.error-message {
		font-family: 'JetBrains Mono', monospace;
		font-weight: 300;
	}

	.error-input-incorrect {
		font-weight: bolder;
	}

	.error-message,
	.error-input-incorrect {
		color: var(--red);
	}
`;

export const RenderError = ({error, input}: {error: Error; input: string}) => {
	console.error(error);

	if (error instanceof IndexedError) {
		return (
			<StyledError>
				<div className="error-message">Malformed input</div>
				<div className="error-input">
					{input.slice(0, error.from)}
					<span className="error-input-incorrect">
						{input.slice(error.from, error.to)}
					</span>
					{input.slice(error.to)}
				</div>
			</StyledError>
		);
	}

	return (
		<StyledError>
			<div className="error-message">{error.message}</div>
		</StyledError>
	);
};
