import React, {useEffect, useState, useTransition} from 'react';
import styled from 'styled-components';

import {getMenuFiles, getMenus} from '../api';

import ErrorBoundary from './error-boundary';
import Loader from './loader';
import Menu from './menu';

const StyledNavigateMenu = styled.div`
	nav {
		display: flex;
		flex-direction: row;
		gap: 2em;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding-top: 1em;
		margin-bottom: 2em;
	}

	.title {
		min-width: 50ch;
	}

	button {
		cursor: pointer;
		padding: 0.5em 1.5em;
		font-weight: bold;
		background: #3182ce;
		color: white;
		outline: none;
		border: none;
		border-radius: 5px;

		&:hover {
			background: #2b6cb0;
		}
	}

	align-self: flex-start;

	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	justify-content: center;
`;

const NavigateMenu: React.FC = () => {
	const menuMetas = getMenuFiles.get();
	const {length} = menuMetas;
	const getIndexFromHash = (): number =>
		menuMetas.findIndex(
			({path}) => path.slice(0, -5) === location.hash.slice(1),
		);

	const setIndexFromHash = (): void => {
		const position = getIndexFromHash();

		if (position !== -1) {
			setIndex(position);
		}
	};

	const [index, setIndex] = useState(() => {
		const hashIndex = getIndexFromHash();
		return hashIndex === -1 ? length - 1 : hashIndex;
	});

	const menuMeta = menuMetas[index]!;
	const menu = getMenus.get(menuMeta.url);

	const [isPending, startTransition] = useTransition();

	const calcIndex = (index: number, offset: number): number =>
		(index + offset + length) % length;

	// Make it feel nicer by preloading previous and next
	// allowing for faster navigation
	getMenus.prefetch(menuMetas[calcIndex(index, 1)]!.url);
	getMenus.prefetch(menuMetas[calcIndex(index, -1)]!.url);

	useEffect(() => {
		addEventListener('hashchange', setIndexFromHash);
		return () => {
			removeEventListener('hashchange', setIndexFromHash);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(setIndexFromHash, [menuMetas]);

	useEffect(() => {
		/*
		 Slight hack:
		 StrictMode renders twice https://stackoverflow.com/a/60619061
		 What happens when StrictMode runs twice (and a hash exists)
		 	The previous useEffect runs, sees hash updates index
		 	This useEffect runs, sets to `length - 1`
		 Second run:
		 	The previous useEffect sees the hash for `length - 1`
		 	and updates index to that, and the original index is lost

		 Also it looks nice when quickly clicking through and it only updates once
		*/
		const deferred = setTimeout(() => {
			location.hash = menuMeta.path.slice(0, -5);
		}, 200);

		return () => {
			clearTimeout(deferred);
		};
	}, [menuMeta]);

	const navigate
		= (offset: number): React.MouseEventHandler<HTMLButtonElement> =>
		(event): void => {
			if (event.currentTarget.disabled) {
				return;
			}

			startTransition(() => {
				setIndex(index => calcIndex(index, offset));
			});
		};

	return (
		<StyledNavigateMenu>
			<nav>
				<button type='button' disabled={isPending} onClick={navigate(-1)}>
					&lt;
				</button>
				<span className='title'>{menu.title}</span>
				<button type='button' disabled={isPending} onClick={navigate(1)}>
					&gt;
				</button>
			</nav>
			<Menu menu={menu} />
		</StyledNavigateMenu>
	);
};

const Menu_: React.FC = () => (
	// <Loader /> ||
	<React.Suspense fallback={<Loader />}>
		<ErrorBoundary>
			<NavigateMenu />
		</ErrorBoundary>
	</React.Suspense>
);

export default Menu_;
