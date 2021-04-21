import type { SudokuInterface } from '../index';
import { getterFunctionNames } from './shared';

/*
 * This plugin removes numbers from #possible that are already
 * present in any other cell in the same structure
 */

const genericSolver = (
  getterFunctionName: 'getRow' | 'getCol' | 'getBlock',
  sudoku: SudokuInterface
): boolean => {
  let anyChanged = false;
  for ( let index = 0; index < 9; ++index ) {
    const structure = sudoku[ getterFunctionName ]( index );

    const found: Set<string> = new Set();
    for ( const { content } of structure ) {
      if ( content !== undefined ) {
        found.add( content );
      }
    }

    for ( const cell of structure ) {
      if ( cell.content !== undefined ) {
        continue;
      }

      for ( const number of found ) {
        if ( cell.possible.has( number ) ) {
          anyChanged = true;

          cell.possible.delete( number );
        }
      }
    }
  }

  return anyChanged;
};

export const removeDuplicates = ( sudoku: SudokuInterface ): boolean => {
  let anyChanged = false;

  for ( const getterFunctionName of getterFunctionNames ) {
    anyChanged = genericSolver(
      getterFunctionName,
      sudoku
    ) || anyChanged;
  }

  return anyChanged;
};
