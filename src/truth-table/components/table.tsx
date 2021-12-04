import clsx from 'clsx';
import {h} from 'preact';

import {ParsedTable} from '../lib/generate-table';

import './table.scss';

export const Table = ({table}: {table: ParsedTable}) => (
	<div class="table-border">
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
					<tr key={row}>
						{row.map((cell, index) => (
							<td
								key={cell ? index : -index}
								class={clsx({
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
