/*
 * See https://web.archive.org/web/20210331174704/https://bestofsudoku.com/sudoku-strategy
 */

import type { CellInterface, SudokuInterface } from '../index';

const genericNakedPairsSolver = (
  sudoku: SudokuInterface,
  getterFunctionName: 'getCol' | 'getRow' | 'getBlock',
  n: number
): boolean => {
  let anyChanged = false;

  for ( let index = 0; index < 9; ++index ) {
    const structure = sudoku[ getterFunctionName ]( index );

    const rightLength = [];

    for ( const cell of structure ) {
      if ( cell.content === undefined && cell.possible.size <= n ) {
        rightLength.push( cell );
      }
    }

    for ( const mainCell of rightLength ) {
      if ( mainCell.possible.size < n ) {
        continue;
      }

      const cellsWithRightPossibles: Set<CellInterface> = new Set();

      for ( const cellToCompare of rightLength ) {
        let matchingPossibles = true;

        for ( const number of cellToCompare.possible ) {
          if ( !mainCell.possible.has( number ) ) {
            matchingPossibles = false;
            break;
          }
        }

        if ( matchingPossibles ) {
          cellsWithRightPossibles.add( cellToCompare );
        }
      }

      if ( cellsWithRightPossibles.size === n ) {
        console.log( [ ...cellsWithRightPossibles ].map( cell => [ ...cell.possible ] ) );

        for ( const cell of structure ) {
          if ( cellsWithRightPossibles.has( cell ) ) {
            continue;
          }

          for ( const number of mainCell.possible ) {
            if ( cell.possible.has( number ) ) {
              anyChanged = !false;

              cell.possible.delete( number );
            }
          }
        }
      }
    }
  }

  return anyChanged;
};

const keys: Array<'getCol' | 'getRow' | 'getBlock'> = [
  'getBlock',
  'getRow',
  'getCol',
];

export const nakedPairs = ( sudoku: SudokuInterface ): boolean => {
  let anyChanged = false;

  for ( let index = 4; index > 1; --index ) {
    for ( const key of keys ) {
      anyChanged = genericNakedPairsSolver(
        sudoku,
        key,
        index
      ) || anyChanged;
    }
  }

  return anyChanged;
};
