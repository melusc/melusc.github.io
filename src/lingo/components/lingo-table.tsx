import {uniqueId} from 'lodash-es';
import React, {useState} from 'react';
import styled from 'styled-components';
import {LingoRow, LingoRowDone} from './lingo-row';

const StyledTable = styled.div``;

const generateEmptyTable = (
	word: string,
): Array<{hints: string[]; characters: string; key: string}> =>
	Array.from({length: word.length}, () => ({
		hints: [word.charAt(0)],
		characters: '',
		key: uniqueId(),
	}));

export const LingoTable: React.FC<{
	word: string;
}> = ({word}) => {
	const [table, setTable] = useState(() => generateEmptyTable(word));
	const [offset, setOffset] = useState(0);

	const incrementOffset = (word: string): void => {
		table[offset]!.characters = word;
		setTable(table);
		setOffset(offset + 1);
	};

	return (
		<StyledTable>
			{table.map(({hints, characters, key}, index) =>
				index === offset ? (
					<LingoRow
						key={key}
						length={word.length}
						hints={hints}
						onDone={incrementOffset}
					/>
				) : (
					<LingoRowDone key={key} input={characters} solution={word} />
				),
			)}
		</StyledTable>
	);
};
