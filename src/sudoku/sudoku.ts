import type {
  Cells,
  CellInterface,
  SudokuInterface,
  Row,
  IterateCallback,
  SubscriptionCallback,
  DispatchTypes,
  NumberOnlySudoku
} from './index';

import * as plugins from './plugins/plugins';

let counter = 0;
const uniqueId = ( prefix = '' ) => `${ prefix }${ counter++ }`;

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
  declare content: string | undefined;

  possible = emptyCellPossibles();

  key = uniqueId();

  valid = true;

  setValidity = (): this => {
    this.valid = typeof this.content === 'undefined'
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
  declare _cells: Cells;

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

    this.setValidity();

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

    this.setValidity();

    return this.#dispatch( 'change' );
  };

  clearAllCells = (): this => {
    this.iterate( cell => cell.clear() );

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

    return this._cells[ row ].content;
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

  getBlock = ( index: number ): Array<CellInterface> => {
    validCellIndex(
      index,
      'index'
    );

    const row = Math.floor( index / 3 );
    const col = index % 3;

    const result = [];

    const lowerRowBoundary = row * 3;
    const lowerColBoundary = col * 3;
    for (
      let currentRow = lowerRowBoundary;
      currentRow < lowerRowBoundary + 3;
      ++currentRow
    ) {
      for (
        let currentCol = lowerColBoundary;
        currentCol < lowerColBoundary + 3;
        ++currentCol
      ) {
        result.push( this._cells[ currentRow ].content[ currentCol ] );
      }
    }

    return result;
  };

  iterate = ( callback: IterateCallback ): this => {
    for ( const row of this._cells ) {
      for ( const cell of row.content ) {
        let breakEarly = false;
        callback(
          cell,
          () => {
            breakEarly = true;
          }
        );

        if ( breakEarly ) {
          return this;
        }
      }
    }

    return this;
  };

  solve = (): this => {
    if ( this.setValidity() ) {
      let anyChanged = false;
      let sudokuInvalid = false;

      do {
        anyChanged = false;

        for ( const plugin of Object.values( plugins ) ) {
          const pluginHasModified = plugin( this );
          anyChanged = anyChanged || pluginHasModified;
        }

        this.iterate( (
          cell, breakEarly
        ) => {
          if ( cell.content === undefined ) {
            if ( cell.possible.size === 1 ) {
              cell.content = [ ...cell.possible.values() ][ 0 ];
              cell.possible.clear();
            }
            else if ( cell.possible.size === 0 ) {
              sudokuInvalid = true;

              breakEarly();
            }
          }
        } );
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

  setValidity = (): boolean => {
    this.iterate( cell => cell.setValidity() );

    for ( let index = 0; index < 9; ++index ) {
      this._validateByStructure( this.getCol( index ) )
        ._validateByStructure( this.getRow( index ) )
        ._validateByStructure( this.getBlock( index ) );
    }

    let allIndividuallyValid = true;
    this.iterate( (
      cell, breakEarly
    ) => {
      if ( !cell.valid ) {
        allIndividuallyValid = false;
        breakEarly();
      }
    } );

    return allIndividuallyValid;
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
        // Less nesting
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
    if ( !this.setValidity() ) {
      return false;
    }

    let allSolved = true;
    this.iterate( (
      cell, breakEarly
    ) => {
      if ( cell.content === undefined ) {
        allSolved = false;

        breakEarly();
      }
    } );

    return allSolved;
  };
}

export { Sudoku, Cell, validCellIndex };
