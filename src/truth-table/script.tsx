import {h, render} from 'preact';
import {useEffect, useState} from 'preact/hooks';

import {Table} from './components/table';
import {generateTable, ParsedTable} from './lib/generate-table';
import {operationToString} from './lib/operation-to-string';

const getHash = () => decodeURIComponent(location.hash.slice(1));

const tryGenerateTable = (
	input: string,
): {valid: true; table: ParsedTable} | {valid: false; error: Error} => {
	try {
		return {
			valid: true,
			table: generateTable(input),
		};
	} catch (error: unknown) {
		return {valid: false, error: error as Error};
	}
};

const Main = () => {
	const [input, setInput] = useState('a AND b');

	const parsed = tryGenerateTable(input);

	useEffect(() => {
		if (location.hash) {
			setInput(getHash());
		}
	}, []);

	useEffect(() => {
		if (parsed.valid) {
			location.hash = operationToString(parsed.table.ast);
		}
	}, [parsed]);

	return (
		<div>
			<input
				value={input}
				onInput={ev => {
					setInput(ev.currentTarget.value);
				}}
			/>
			{parsed.valid ? (
				<Table table={generateTable(input)} />
			) : (
				parsed.error?.message
			)}
		</div>
	);
};

render(<Main />, document.body);
