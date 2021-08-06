type NumberOnlySudoku = Array<Array<number | undefined>>;

type DispatchTypes = 'change' | 'error' | 'finish';
type SubscriptionCallback = (
	sudoku: SudokuInterface,
	type: DispatchTypes,
) => void;

interface CellInterface {
	setValidity: () => this;
	content: string | undefined;
	valid: boolean;
	key: string;
	possible: Set<string>;
	setContent: (content: string) => this;
	clear: () => this;
}

type Cells = CellInterface[];

interface SudokuInterface {
	_cells: Cells;

	setContent: (index: number, content: string) => this;

	getContent: (index: number) => string | undefined;

	clearCell: (index: number) => this;

	clearAllCells: () => this;

	getCol: (col: number) => CellInterface[];

	getRow: (row: number) => CellInterface[];

	getCell: (index: number) => CellInterface;

	getCells: () => Cells;

	/* Describing the sudoku layout like this [
      [ 1, 2, 3, .. ],
      [ 10, 11, 12, .. ],
      ..
    ], getBlock returns [ 1, 2, 3, 10, 11, 12, 19, 20, 21 ] */
	getBlock: (index: number) => CellInterface[];

	solve: () => this;

	subscribe: (callback: SubscriptionCallback) => this;

	unsubscribe: (callback: SubscriptionCallback) => this;

	cellsIndividuallyValidByStructure: () => boolean;

	isValid: () => boolean;

	_validateByStructure: (rowCol: CellInterface[]) => this;

	isSolved: () => boolean;
}

export {
	SudokuInterface,
	Cells,
	CellInterface,
	SubscriptionCallback,
	DispatchTypes,
	NumberOnlySudoku,
};
