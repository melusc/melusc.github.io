/*
 * See https://web.archive.org/web/20210331174704/https://bestofsudoku.com/sudoku-strategy
 */

import type { SudokuInterface } from '../index';
import { bitCount } from './shared';

const genericHiddenPairsSolver = (
  sudoku: SudokuInterface,
  getterFunctionName: 'getCol' | 'getRow' | 'getBlock'
): boolean => {
  let anyChanged = false;

  for ( let structureIndex = 0; structureIndex < 9; ++structureIndex ) {
    const structure = sudoku[ getterFunctionName ]( structureIndex );

    // Getting all the indexes of a number
    // works like this:
    // If 7 is in cells (0, 4, 6)
    // the resulting value will be "1010001"
    //                                    ^ for 0
    //                                ^ for 4
    //                              ^ for 6
    // Iterating through each cell and
    // doing `currentValue | 2 ** index`
    // This is a lot better than comparing arrays of indexes
    const summary: Map<string, [number, number]> = new Map();

    for ( let index = 0; index < 9; ++index ) {
      const cell = structure[ index ];

      if ( cell.content !== undefined ) {
        continue;
      }

      for ( const number of cell.possible ) {
        let array = summary.get( number );

        if ( !array ) {
          array = [ 0, 0 ];

          summary.set(
            number,
            array
          );
        }

        ++array[ 0 ];
        array[ 1 ] |= 2 ** index;
      }
    }

    const equalIndexes: Map<number, Array<string>> = new Map();

    for ( const [ number, [ amount, key ] ] of summary ) {
      if ( amount > 8 ) {
        continue;
      }

      let equalIndex = equalIndexes.get( key );

      if ( !equalIndex ) {
        equalIndex = [];
        equalIndexes.set(
          key,
          equalIndex
        );
      }

      equalIndex.push( number );
    }

    for ( const [ indexes, numbers ] of equalIndexes ) {
      if ( bitCount( indexes ) !== numbers.length ) {
        continue;
      }

      let mutatingIndex = indexes;
      for ( let index = 8; index >= 0; --index ) {
        if ( ( ( 2 ** index ) & mutatingIndex ) === 0 ) {
          continue;
        }

        mutatingIndex &= ~( 2 ** index );

        const cell = structure[ index ];

        if ( cell.possible.size !== numbers.length ) {
          cell.possible = new Set( numbers );

          anyChanged = true;
        }
      }
    }
  }

  return anyChanged;
};

const keys = [
  'getBlock',
  'getRow',
  'getCol',
] as const;

export const hiddenPairs = ( sudoku: SudokuInterface ): boolean => {
  let anyChanged = false;

  // For ( let index = 5; index > 0; --index ) {
  for ( const key of keys ) {
    anyChanged = genericHiddenPairsSolver(
      sudoku,
      key
    ) || anyChanged;
  }
  // }

  return anyChanged;
};
