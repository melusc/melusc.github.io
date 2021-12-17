import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import {ParsedTable} from '../lib/generate-table';

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

export const Table = ({table}: {table: ParsedTable}) => (
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
