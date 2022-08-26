import React from 'react';
import styled from 'styled-components';

import type {MenuResult} from '../api';

const Day: React.FC<{index: number; menu: string[][]}> = ({index, menu}) => {
	const day = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'][
		index
	];
	if (!day) {
		throw new Error(`Unexpected index ${index}`);
	}

	return (
		<div className='table-row'>
			<div className='menu-day cell'>{day}</div>
			{menu.map(singleMenu => (
				<div key={JSON.stringify(singleMenu)} className='cell'>
					{singleMenu.map(line => (
						<div key={line}>{line}</div>
					))}
				</div>
			))}
		</div>
	);
};

// Use div with grid instead of table
// because this way the columns can have the same width
const StyledMenu = styled.div`
	overflow-x: auto;
	width: 100%;
	display: grid;
	place-items: center;

	.table {
		min-width: 70%;
		width: max-content;

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(5, 1fr);
	}

	.menu-day {
		font-weight: bold;
	}

	.cell {
		--margin: 0.5em;
		margin-right: var(--margin);
		margin-bottom: var(--margin);

		&:nth-child(n - 4) {
			margin-top: var(--margin);
		}
	}

	.table-row {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(4, 1fr);

		border-bottom: 1px solid currentColor;

		&:first-of-type {
			border-top: 1px solid currentColor;
		}
	}

	.unsupported {
		font-size: 1.4em;
	}
`;

const Menu: React.FC<{menu: MenuResult}> = ({menu}) => (
	<StyledMenu>
		{menu.version === 1 ? (
			<div className='table'>
				{menu.menu.map((day, index) => (
					<Day key={JSON.stringify(day)} menu={day} index={index} />
				))}
			</div>
		) : (
			<div className='unsupported'>
				New menu layout is not supported yet. Check back later.
			</div>
		)}
	</StyledMenu>
);

export default Menu;
