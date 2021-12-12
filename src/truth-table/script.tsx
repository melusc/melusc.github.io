import {h, render} from 'preact';
import {useEffect, useState} from 'preact/hooks';

import {Table} from './components/table';
import {Input} from './components/input';
import {RenderError} from './components/render-error';

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
			location.hash = operationToString(parsed.table.ast).replace(
				/^\((.+)\)$/,
				'$1',
			);
		}
	}, [parsed]);

	return (
		<div>
			<Input input={input} setInput={setInput} />{' '}
			{parsed.valid ? (
				<Table table={generateTable(input)} />
			) : (
				<RenderError error={parsed.error} />
			)}
		</div>
	);
};

render(<Main />, document.body);
