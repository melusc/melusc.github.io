import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client.js';
import {
	generateTable,
	type ParsedTable,
	operationToString,
	LogicalSymbolFromName,
} from '@lusc/truth-table';

import {Table} from './components/table';
import {Input} from './components/input';
import {RenderError} from './components/render-error';

const getHash = (): string => decodeURIComponent(location.hash.slice(1));

const tryGenerateTable = (
	input: string,
): {valid: true; table: ParsedTable} | {valid: false; error: Error} => {
	try {
		return {
			valid: true,
			table: generateTable(input),
		};
	} catch (error: unknown) {
		return {
			valid: false,
			error: error as Error,
		};
	}
};

const Main: React.FC = () => {
	const [input, setInput] = useState(`a ${LogicalSymbolFromName.and} b`);
	const lastWasValid = useRef<boolean>(true);

	const parsed = useMemo(() => tryGenerateTable(input), [input]);

	useEffect(() => {
		if (location.hash) {
			setInput(getHash());
		}
	}, []);

	useEffect(() => {
		const cb = (): void => {
			const newHash = getHash();

			if (newHash !== input) {
				setInput(newHash);
			}
		};

		addEventListener('hashchange', cb);

		return (): void => {
			removeEventListener('hashchange', cb);
		};
	}, [input]);

	useEffect(() => {
		const newURL = new URL(location.href);

		let newHash: string;
		let shouldPush = true;

		if (parsed.valid) {
			newHash = operationToString(parsed.table.ast).replace(/^\((.+)\)$/, '$1');

			// already `shouldPush = true`
		} else {
			newHash = input;

			// If last was valid don't override it, i.e. pushState
			// if last was invalid, it's not very valuable: replaceState
			shouldPush = lastWasValid.current;
		}

		newHash = newHash.trim();
		const oldHash = getHash();

		if (newHash !== oldHash) {
			newURL.hash = newHash;

			history[shouldPush ? 'pushState' : 'replaceState']({}, '', newURL);
		}

		lastWasValid.current = parsed.valid;
	}, [input, parsed]);

	return (
		<>
			<Input input={input} setInput={setInput} />{' '}
			{parsed.valid ? (
				<Table table={generateTable(input)} />
			) : (
				<RenderError input={input} error={parsed.error} />
			)}
		</>
	);
};

const container = document.querySelector('#root');

if (container) {
	const root = createRoot(container);
	root.render(
		<React.StrictMode>
			<Main />
		</React.StrictMode>,
	);
}
