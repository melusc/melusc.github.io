import { SudokuInterface } from '../index';

/*
 * This plugin finds cells that are the only in the structure
 * that can hold a specific number, which means that cell has be the one
 * with that specific number
 */

const genericSolver = ( getterFunctionName: 'getRow' | 'getCol' | 'getBlock' ) => ( sudoku: SudokuInterface ) => {
  let anyChanged = false;

  for ( let index = 0; index < 9; ++index ) {
    const structure = sudoku[ getterFunctionName ]( index );

    const amountPossible: Map<string, number> = new Map();

    for ( const cell of structure ) {
      for ( const number of cell.possible ) {
        amountPossible.set(
          number,
          ( amountPossible.get( number ) ?? 0 ) + 1
        );
      }
    }

    for ( const [ key, amount ] of amountPossible ) {
      if ( amount > 1 ) {
        continue;
      }

      for ( const { possible } of structure ) {
        if ( possible.has( key ) ) {
          anyChanged = true;

          possible.clear();
          possible.add( key );

          break;
        }
      }
    }
  }

  return anyChanged;
};

export const findUniquePossiblesByRow = genericSolver( 'getRow' );

export const findUniquePossiblesByCol = genericSolver( 'getCol' );

export const findUniquePossiblesByBlock = genericSolver( 'getBlock' );
