<script lang="ts">
	import type {ParsedTable} from '@lusc/truth-table';

	const {table}: {table: ParsedTable} = $props();
</script>

<table>
	<thead>
		<tr>
			{#each table.columns as col (col)}
				<th>{col}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each table.rows as row (row.join('-'))}
			<tr>
				{#each row as cell, index (cell ? index : -index)}
					<td class:cell_true={cell} class:cell_false={!cell}>
						{cell}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		table-layout: fixed;
		width: max-content;
	}

	tr {
		border-bottom: var(--table-border);
	}

	td.cell_false {
		color: var(--red);
	}
	td.cell_true {
		color: var(--green);
	}

	th,
	td {
		padding: 4px 1em;

		border-left: var(--table-border);
	}
	th:first-child,
	td:first-child {
		border-left: none;
	}
</style>
