import type {
  Cells,
  CellInterface,
  SudokuInterface,
  SubscriptionCallback,
  DispatchTypes,
  NumberOnlySudoku
} from './index';

import { Cell } from './cell';
import * as plugins from './plugins/plugins';

/*
  Lodash-es throws when testing for whatever reason
  so testing with lodash, but using "resolve" in webpack conf
  to resolve lodash to lodash-es and allow tree shaking
*/

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

const validCellIndex = inRangeIncl(
  0,
  80
);

class Sudoku implements SudokuInterface {
  _cells: Cells;

  #subscriptions: Set<SubscriptionCallback> = new Set();

  #plugins = Object.values( plugins );

  constructor( array?: NumberOnlySudoku ) {
    this._cells = Array.from(
      { length: 81 },
      () => new Cell()
    );

    if ( array ) {
      for ( const [ rowIndex, row ] of array.entries() ) {
        for ( const [ colIndex, cell ] of row.entries() ) {
          if ( typeof cell === 'number' ) {
            this.setContent(
              ( rowIndex * 9 ) + colIndex,
              `${ cell }`
            );
          }
        }
      }
    }
  }

  setContent = (
    index: number, content: string
  ): this => {
    validCellIndex(
      index,
      'index'
    );
    const cell = this._cells[ index ];

    cell.setContent( content );

    this.updateCellValidities();

    return this.#dispatch( 'change' );
  };

  getContent = ( index: number ): string | undefined => {
    validCellIndex(
      index,
      'index'
    );

    return this._cells[ index ].content;
  };

  clearCell = ( index: number ): this => {
    validCellIndex(
      index,
      'index'
    );

    const cell = this._cells[ index ];

    cell.clear();

    this.updateCellValidities();

    return this.#dispatch( 'change' );
  };

  clearAllCells = (): this => {
    for ( const cell of this._cells.values() ) {
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

    for ( let index = col; index < 81; index += 9 ) {
      result.push( this._cells[ index ] );
    }

    return result;
  };

  getRow = ( row: number ): Array<CellInterface> => {
    validCellIndex(
      row,
      'row'
    );

    return this._cells.slice(
      row * 9,
      ( row * 9 ) + 9
    );
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

      result.push( this.getCell( ( row * 9 ) + col ) );
    }

    return result;
  };

  getCell = ( index: number ): CellInterface => {
    validCellIndex(
      index,
      'index'
    );

    return this._cells[ index ];
  };

  getCells = (): Cells => [ ...this._cells ];

  solve = (): this => {
    if ( this.updateCellValidities() ) {
      for ( const cell of this._cells ) {
        if ( cell.content === undefined ) {
          cell.clear(); // Reset possibles
        }
      }

      let anyChanged = false;
      let sudokuInvalid = false;

      do {
        anyChanged = false;

        for ( const plugin of this.#plugins ) {
          console.log( [
            ...this._cells.find( cell => cell.key === 'cell-5' )?.possible
              ?? [],
          ] );

          const changed = plugin( this );

          console.log( [
            ...this._cells.find( cell => cell.key === 'cell-5' )?.possible
              ?? [],
          ] );
          anyChanged = changed || anyChanged;
        }

        for ( const cell of this._cells.values() ) {
          if ( cell.content === undefined ) {
            if ( cell.possible.size === 1 ) {
              // We know that the set has one item
              cell.setContent( cell.possible.values().next().value as string );
            }
            else if ( cell.possible.size === 0 ) {
              sudokuInvalid = false;

              break;
            }
          }
        }

        console.log(
          'anyChanged',
          anyChanged,
          'sudokuInvalid',
          sudokuInvalid
        );
      } while ( anyChanged && !sudokuInvalid );

      console.log( this._cells );

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
    for ( const cell of this._cells.values() ) {
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

    for ( const cell of this._cells.values() ) {
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

  isSolved = (): boolean => {
    if ( !this.updateCellValidities() ) {
      return false;
    }

    for ( const cell of this._cells.values() ) {
      if ( cell.content === undefined ) {
        return false;
      }
    }

    return true;
  };
}

export { Sudoku, validCellIndex };
