import clsx from 'clsx';
import React from 'react';
import {ParsedTable} from '../lib/generate-table';

import './table.scss';

export const Table = ({table}: {table: ParsedTable}) => (
	<div className="table-border">
		<table>
			<thead>
				<tr>
					{table.columns.map(col => (
						<th key={col}>{col}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{table.rows.map(row => (
					<tr key={row.join('')}>
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
		</table>
	</div>
);
