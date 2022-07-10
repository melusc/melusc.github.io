import styled from 'styled-components';

const Loader = styled.div`
	animation: spin 2s infinite linear;
	margin-bottom: 10%;

	border: solid 3px;
	border-radius: 50%;
	width: 100px;
	height: 100px;
	border-color: currentColor transparent;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

export default Loader;
