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
      const { content, possible } = structure[ index ];

      if ( content === undefined ) {
        for ( const number of possible ) {
          summary.set(
            number,
            ( summary.get( number ) ?? 0 ) | ( 2 ** index )
          );
        }
      }
      else {
        /*
          This part fixes a bug:
          [
            {1,2,3}, // these are possibles
            {1,2},
            3, // this is filled in that cell
            ...
          ]
          Webpack doesn't keep the same order as is exported from plugins.ts
          (and the plugins shouldn't rely on it).
          When remove-duplicates doesn't run first, the scenarios above can occur
          where hidden-pairs finds the only cell that has 3 in #possible and then removes all others
          (here cell at index 0), incorrectly resulting in two cells with 3
        */

        summary.set(
          content,
          ( summary.get( content ) ?? 0 ) | ( 2 ** index )
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

    for ( const [ key, numbers ] of equalIndexes ) {
      if ( bitCount( key ) !== numbers.length ) {
        continue;
      }

      for ( let index = 0; index <= Math.log2( key ); ++index ) {
        if ( ( key & ( 2 ** index ) ) === 0 ) {
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

  return anyChanged;
};

export const hiddenPairs = ( sudoku: SudokuInterface ): boolean => {
  let anyChanged = false;

  for ( const key of getterFunctionNames ) {
    anyChanged = genericHiddenPairsSolver(
      sudoku,
      key
    ) || anyChanged;
  }

  return anyChanged;
};
