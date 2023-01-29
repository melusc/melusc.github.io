import type {ParsedTable} from '@lusc/truth-table';
import clsx from 'clsx';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type React from 'react';
import styled from 'styled-components/macro';

const StyledTable = styled.table`
	table-layout: fixed;
	width: max-content;

	tr {
		border-bottom: var(--table-border);
	}

	td {
		&.cell_false {
			color: var(--red);
		}
		&.cell_true {
			color: var(--green);
		}
	}

	th,
	td {
		padding: 4px 1em;

		border-left: var(--table-border);
		&:first-child {
			border-left: none;
		}
	}
`;

export const Table: React.FC<{table: ParsedTable}> = ({table}) => (
	<StyledTable>
		<thead>
			<tr>
				{table.columns.map(col => (
					<th key={col}>{col}</th>
				))}
			</tr>
		</thead>
		<tbody>
			{table.rows.map(row => (
				<tr key={row.join('-')}>
					{row.map((cell, index) => (
						<td
							key={cell ? index : -index}
							className={clsx({
								cell_true: cell,
								cell_false: !cell,
							})}
						>
							{String(cell)}
						</td>
					))}
				</tr>
			))}
		</tbody>
	</StyledTable>
);
