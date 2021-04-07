// eslint-disable-next-line no-global-assign, @typescript-eslint/no-var-requires
require = require( 'esm' )( module );

import { assert } from 'chai';

import { Sudoku } from '../../src/sudoku/sudoku';
import type { SudokuInterface } from '../../src/sudoku';

import { nakedPairs } from '../../src/sudoku/plugins/naked-pairs';

const _ = undefined;

type ComparableCell = {
  possible: Set<string>;
  content: string | undefined;
};

const getComparableCells = ( sudoku: SudokuInterface ): Array<Array<ComparableCell>> => {
  const result = [];

  for ( const row of sudoku._cells ) {
    const row_: Array<ComparableCell> = [];

    result.push( row_ );

    for ( const { possible, content } of row.content ) {
      row_.push( {
        possible,
        content,
      } );
    }
  }

  return result;
};

describe(
  'naked-pairs.ts',
  () => {
    let emptySudoku = new Sudoku();

    beforeEach( () => {
      emptySudoku = new Sudoku();
    } );

    describe(
      'nakedPairs()',
      () => {
        it(
          'should correctly find the pairs of "1" and "6".',
          () => {
            const possibles: Array<string | Array<string>> = [

              '4',
              [ '1', '6' ],
              [ '1', '6' ],
              [ '7', '8' ],
              '3',
              '2',
              [ '1', '7', '8' ],
              '9',
              '5',

            ];

            const block = emptySudoku.getBlock( 0 );

            for ( const [ index, possible ] of possibles.entries() ) {
              if ( typeof possible === 'string' ) {
                block[ index ].setContent( possible );
              }
              else {
                block[ index ].possible = new Set( possible );
              }
            }

            nakedPairs( emptySudoku );

            assert.deepStrictEqual(
              [ ...emptySudoku.getCell(
                2,
                0
              ).possible ],
              [ '7', '8' ]
            );
          }
        );
      }
    );
  }
);
