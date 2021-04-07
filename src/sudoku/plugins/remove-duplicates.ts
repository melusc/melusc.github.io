import type { SudokuInterface } from '../index';

/*
 * This plugin removes numbers from #possible that are already
 * present in any other cell in the same structure
 */

const genericSolver = ( getterFunctionName: 'getRow' | 'getCol' | 'getBlock' ) => ( sudoku: SudokuInterface ) => {
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

const removeDuplicatesByRow = genericSolver( 'getRow' );
const removeDuplicatesByCol = genericSolver( 'getCol' );
const removeDuplicatesByBlock = genericSolver( 'getBlock' );

export {
  removeDuplicatesByBlock,
  removeDuplicatesByCol,
  removeDuplicatesByRow
};
