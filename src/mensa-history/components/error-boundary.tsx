import React from 'react';

type State = {
	error: undefined | Error;
};

export default class ErrorBoundary extends React.Component<
	React.PropsWithChildren,
	State
> {
	static getDerivedStateFromError(error: Error): State {
		return {error};
	}

	override state: State = {
		error: undefined,
	};

	override componentDidCatch(error: Error): void {
		this.setState({
			error,
		});
	}

	override render(): React.ReactNode {
		const {error} = this.state;
		if (error) {
			return <div>Unexpected Error: {error.message}</div>;
		}

		return this.props.children;
	}
}
