/* eslint-disable no-use-before-define */
export = Sudoku;
export as namespace Sudoku;

declare namespace Sudoku {
  type NumberOnlySudoku = Array<Array<number | undefined>>;

  type DispatchTypes = 'change' | 'error' | 'finish';
  type SubscriptionCallback = (
    sudoku: SudokuInterface,
    type: DispatchTypes
  ) => void;

  type IterateCallback = ( cell: CellInterface, breakEarly: () => void ) => void;

  interface CellInterface {
    setValidity: () => this;
    content: string | undefined;
    valid: boolean;
    key: string;
    possible: Set<string>;
    setContent: ( content: string ) => this;
    clear: () => this;
  }

  interface Row {
    key: string;
    content: Array<CellInterface>;
  }
  type Cells = Array<Row>;

  interface SudokuInterface {
    _cells: Cells;

    setContent: ( row: number, col: number, content: string ) => this;

    getContent: ( row: number, col: number ) => string | number | undefined;

    clearCell: ( row: number, col: number ) => this;

    clearAllCells: () => this;

    getCol: ( col: number ) => Array<CellInterface>;

    getRow: ( row: number ) => Array<CellInterface>;

    getCell: ( row: number, col: number ) => CellInterface;

    getCells: () => Cells;

    /* Describing the sudoku layout like this [
      [ 1, 2, 3, .. ],
      [ 10, 11, 12, .. ],
      ..
    ], getBlock returns [ 1, 2, 3, 10, 11, 12, 19, 20, 21 ] */
    getBlock: ( index: number ) => Array<CellInterface>;

    solve: () => this;

    subscribe: ( callback: SubscriptionCallback ) => this;

    unsubscribe: ( callback: SubscriptionCallback ) => this;

    updateCellValidities: () => boolean;

    _validateByStructure: ( rowCol: Array<CellInterface> ) => this;

    isSolved: () => boolean;

    entries: () => Iterable<CellInterface>;
  }
}
