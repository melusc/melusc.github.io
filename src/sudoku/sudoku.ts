import type {
  Cells,
  CellInterface,
  SudokuInterface,
  Row,
  SubscriptionCallback,
  DispatchTypes,
  NumberOnlySudoku
} from './index';

import * as plugins_ from './plugins/plugins';
const plugins = Object.values( plugins_ );

/*
  Lodash-es throws when testing for whatever reason
  so testing with lodash, but using "resolve" in webpack conf
  to resolve lodash to lodash-es and allow tree shaking
*/
import { uniqueId } from 'lodash';

const inRangeIncl = (
  low: number, high: number
) => (
  n: number,
  variableName: string,
  noThrow = false
) => {
  if ( !Number.isInteger( n ) ) {
    if ( noThrow ) {
      return false;
    }

    throw new TypeError( `${ variableName } was not an integer.` );
  }

  if ( n < low || n > high ) {
    if ( noThrow ) {
      return false;
    }

    throw new RangeError( `${ variableName } ∉ [${ low }, ${ high }].` );
  }

  return true;
};

const emptyCellPossibles = (): Set<string> => new Set( Array.from(
  { length: 9 },
  (
    _v, index
  ) => `${ index + 1 }`
) );

const validCellIndex = inRangeIncl(
  0,
  8
);

class Cell implements CellInterface {
  content: string | undefined;

  possible = emptyCellPossibles();

  key = uniqueId();

  valid = true;

  setValidity = (): this => {
    this.valid
      = typeof this.content === 'undefined'
        ? this.possible.size !== 0
        : ( /^[1-9]$/ ).test( this.content );

    return this;
  };

  setContent = ( content: string ): this => {
    this.content = content.trim();
    this.possible.clear();

    return this.setValidity();
  };

  clear = (): this => {
    this.content = undefined;

    this.possible = emptyCellPossibles();

    this.valid = true;

    return this;
  };
}

class Sudoku implements SudokuInterface {
  _cells: Cells;

  #subscriptions: Set<SubscriptionCallback> = new Set();

  constructor( array?: NumberOnlySudoku ) {
    this._cells = Array.from(
      { length: 9 },
      () => ( {
        key: uniqueId(),
        content: Array.from(
          { length: 9 },
          () => new Cell()
        ),
      } )
    );

    if ( array ) {
      for ( const [ rowIndex, row ] of array.entries() ) {
        for ( const [ colIndex, cell ] of row.entries() ) {
          if ( typeof cell === 'number' ) {
            this.setContent(
              rowIndex,
              colIndex,
              `${ cell }`
            );
          }
        }
      }
    }
  }

  setContent = (
    row: number, col: number, content: string
  ): this => {
    validCellIndex(
      row,
      'row'
    );
    validCellIndex(
      col,
      'col'
    );
    const cell = this._cells[ row ].content[ col ];

    cell.setContent( content );

    this.updateCellValidities();

    return this.#dispatch( 'change' );
  };

  getContent = (
    row: number, col: number
  ): string | undefined => {
    validCellIndex(
      row,
      'row'
    );
    validCellIndex(
      col,
      'col'
    );

    return this._cells[ row ].content[ col ].content;
  };

  clearCell = (
    row: number, col: number
  ): this => {
    validCellIndex(
      row,
      'row'
    );
    validCellIndex(
      col,
      'col'
    );

    const cell = this._cells[ row ].content[ col ];

    cell.clear();

    this.updateCellValidities();

    return this.#dispatch( 'change' );
  };

  clearAllCells = (): this => {
    for ( const cell of this.entries() ) {
      cell.clear();
    }

    return this.#dispatch( 'change' );
  };

  getCol = ( col: number ): Array<CellInterface> => {
    validCellIndex(
      col,
      'col'
    );

    const result = [];

    for ( const row of this._cells ) {
      result.push( row.content[ col ] );
    }

    return result;
  };

  getRow = ( row: number ): Array<CellInterface> => {
    validCellIndex(
      row,
      'row'
    );

    return [ ...this._cells[ row ].content ];
  };

  getBlock = ( index: number ): Array<CellInterface> => {
    validCellIndex(
      index,
      'index'
    );

    const colOffset = ( index % 3 ) * 3;
    const rowOffset = Math.floor( index / 3 ) * 3;

    const result = [];

    for ( let index_ = 0; index_ < 9; ++index_ ) {
      const row = rowOffset + Math.floor( index_ / 3 );
      const col = colOffset + ( index_ % 3 );

      result.push( this.getCell(
        row,
        col
      ) );
    }

    return result;
  };

  getCell = (
    row: number, col: number
  ): CellInterface => {
    validCellIndex(
      row,
      'row'
    );
    validCellIndex(
      col,
      'col'
    );

    return this._cells[ row ].content[ col ];
  };

  getCells = (): Cells => {
    const result: Cells = [];

    for ( const row of this._cells ) {
      const newRow: Row = {
        key: row.key,
        content: [],
      };

      for ( const cell of row.content ) {
        newRow.content.push( cell );
      }

      result.push( newRow );
    }

    return result;
  };

  solve = (): this => {
    if ( this.updateCellValidities() ) {
      let anyChanged = false;
      let sudokuInvalid = false;

      do {
        anyChanged = false;

        for ( const plugin of plugins ) {
          anyChanged = plugin( this ) || anyChanged;
        }

        for ( const cell of this.entries() ) {
          if ( cell.content === undefined ) {
            if ( cell.possible.size === 1 ) {
              cell.setContent( cell.possible.values().next().value );
            }
            else if ( cell.possible.size === 0 ) {
              sudokuInvalid = false;

              break;
            }
          }
        }
      } while ( anyChanged && !sudokuInvalid );

      if ( sudokuInvalid ) {
        this.#dispatch( 'error' );
      }
      else {
        this.#dispatch( 'finish' );
      }
    }

    return this;
  };

  subscribe = ( callback: SubscriptionCallback ): this => {
    this.#subscriptions.add( callback );

    return this;
  };

  unsubscribe = ( callback: SubscriptionCallback ): this => {
    this.#subscriptions.delete( callback );

    return this;
  };

  #dispatch = ( type: DispatchTypes ): this => {
    for ( const callback of this.#subscriptions ) {
      callback(
        this,
        type
      );
    }

    return this;
  };

  updateCellValidities = (): boolean => {
    for ( const cell of this.entries() ) {
      cell.setValidity();
    }

    for ( let index = 0; index < 9; ++index ) {
      for ( const structure of [
        this.getCol( index ),
        this.getRow( index ),
        this.getBlock( index ),
      ] ) {
        this._validateByStructure( structure );
      }
    }

    for ( const cell of this.entries() ) {
      if ( !cell.valid ) {
        return false;
      }
    }

    return true;
  };

  _validateByStructure = ( structure: Array<Cell> ): this => {
    const found: Map<string, number> = new Map();
    for ( const { content } of structure ) {
      if ( typeof content === 'string' ) {
        found.set(
          content,
          ( found.get( content ) ?? 0 ) + 1
        );
      }
    }

    for ( const [ key, amount ] of found ) {
      if ( amount === 1 ) {
        continue;
      }

      for ( const cell of structure ) {
        if ( cell.content === key ) {
          cell.valid = false;
        }
      }
    }

    return this;
  };

  * entries(): Iterable<CellInterface> {
    for ( const row of this._cells ) {
      for ( const cell of row.content ) {
        yield cell;
      }
    }
  }

  isSolved = (): boolean => {
    if ( !this.updateCellValidities() ) {
      return false;
    }

    for ( const cell of this.entries() ) {
      if ( cell.content === undefined ) {
        return false;
      }
    }

    return true;
  };
}

export { Sudoku, Cell, validCellIndex };
