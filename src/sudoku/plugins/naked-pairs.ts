/*
 * See https://web.archive.org/web/20210331174704/https://bestofsudoku.com/sudoku-strategy
 */

import type { SudokuInterface } from '../index';
import { bitCount } from './shared';

const genericNakedPairsSolver = (
  sudoku: SudokuInterface,
  getterFunctionName: 'getCol' | 'getRow' | 'getBlock'
): boolean => {
  let anyChanged = false;

  for ( let structureIndex = 0; structureIndex < 9; ++structureIndex ) {
    const structure = sudoku[ getterFunctionName ]( structureIndex );

    const summary: Map<number, number> = new Map();

    for ( const [ index, cell ] of structure.entries() ) {
      if ( cell.content !== undefined ) {
        continue;
      }

      for ( const number of cell.possible ) {
        summary.set(
          index,
          ( summary.get( index ) ?? 0 ) | ( 2 ** ( +number - 1 ) )
        );
      }
    }

    const equalKeys: Map<number, Array<number>> = new Map();
    for ( const [ index, key ] of summary ) {
      let array = equalKeys.get( key );

      if ( !array ) {
        array = [];
        equalKeys.set(
          key,
          array
        );
      }

      array.push( index );
    }

    for ( const [ key, numbers ] of equalKeys ) {
      if ( bitCount( key ) !== numbers.length || numbers.length > 8 ) {
        continue;
      }

      let mutatingKey = key;

      for ( let number = 8; number >= 0; --number ) {
        if ( ( ( 2 ** number ) & mutatingKey ) === 0 ) {
          continue;
        }

        mutatingKey &= ~( 2 ** number );

        for ( const [ index, cell ] of structure.entries() ) {
          const stringNumber = `${ number + 1 }`;
          if ( !numbers.includes( index ) && cell.possible.has( stringNumber ) ) {
            anyChanged = true;
            cell.possible.delete( `${ stringNumber }` );
          }
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

export const nakedPairs = ( sudoku: SudokuInterface ): boolean => {
  let anyChanged = false;

  for ( const key of keys ) {
    anyChanged = genericNakedPairsSolver(
      sudoku,
      key

    ) || anyChanged;
  }

  return anyChanged;
};
