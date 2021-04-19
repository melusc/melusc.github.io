/*
 * See https://web.archive.org/web/20210331174704/https://bestofsudoku.com/sudoku-strategy
 */

import type { SudokuInterface } from '../index';
import { bitCount, getterFunctionNames } from './shared';

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
    const summary: Map<string, number> = new Map();

    for ( let index = 0; index < 9; ++index ) {
      const cell = structure[ index ];

      if ( cell.content !== undefined ) {
        continue;
      }

      for ( const number of cell.possible ) {
        summary.set(
          number,
          ( summary.get( number ) ?? 0 ) | ( 2 ** index )
        );
      }
    }

    const equalIndexes: Map<number, Array<string>> = new Map();

    for ( const [ number, key ] of summary ) {
      if ( bitCount( key ) > 8 ) {
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

      for ( let index = 0; index <= Math.log2( indexes ); ++index ) {
        if ( ( ( 2 ** index ) & indexes ) === 0 ) {
          continue;
        }

        const cell = structure[ index ];

        if ( cell.possible.size > numbers.length ) {
          anyChanged = true;

          cell.possible = new Set( numbers );
        }
      }
    }
  }

  console.log(
    getterFunctionName,
    anyChanged
  );

  return anyChanged;
};

export const hiddenPairs = ( sudoku: SudokuInterface ): boolean => {
  let anyChanged = false;

  console.group( 'hidden-pairs' );
  for ( const key of getterFunctionNames ) {
    anyChanged = genericHiddenPairsSolver(
      sudoku,
      key
    ) || anyChanged;
  }

  console.log( anyChanged );

  console.groupEnd();

  return anyChanged;
};
