import {IndexedError} from '@lusc/truth-table';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type React from 'react';
import styled from 'styled-components/macro';

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

export const RenderError: React.FC<{
	error: Error;
	input: string;
}> = ({error, input}) => {
	console.error(error.message);

	if (error instanceof IndexedError) {
		return (
			<StyledError>
				<div className='error-message'>Malformed input: {error.message}</div>
				<div className='error-input'>
					{input.slice(0, error.from)}
					<span className='error-input-incorrect'>
						{input.slice(error.from, error.to)}
					</span>
					{input.slice(error.to)}
				</div>
			</StyledError>
		);
	}

	return (
		<StyledError>
			<div className='error-message'>{error.message}</div>
		</StyledError>
	);
};
