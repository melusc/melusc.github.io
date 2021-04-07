// eslint-disable-next-line no-global-assign, @typescript-eslint/no-var-requires
require = require( 'esm' )( module );

import { assert } from 'chai';

import { Sudoku } from '../../src/sudoku/sudoku';
import type { SudokuInterface } from '../../src/sudoku';

import {
  findUniquePossiblesByBlock,
  findUniquePossiblesByCol,
  findUniquePossiblesByRow
} from '../../src/sudoku/plugins/find-unique-possibles';

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
  'find-unique-possibles.ts',
  () => {
    let emptySudoku = new Sudoku();

    beforeEach( () => {
      emptySudoku = new Sudoku();
    } );

    describe(
      'findUniquePossiblesByBlock()',
      () => {
        it(
          'should find the only cell that can have "1".',
          () => {
            const possibles = [
              [ '2', '3', '5', '7', '9' ],
              [ '3', '5', '6', '8' ],
              [ '3', '4' ],
              [ '1', '4', '2' ], // Only cell that can have a "1"
              [ '3', '4', '6', '7', '9' ],
              [ '2', '4', '5', '6', '9' ],
              [ '4', '5', '8', '9' ],
              [ '2', '5', '7', '9' ],
              [ '2', '6', '8', '9' ],
            ];

            const block = emptySudoku.getBlock( 0 );

            for ( const [ index, possible ] of possibles.entries() ) {
              block[ index ].possible = new Set( possible );
            }

            findUniquePossiblesByBlock( emptySudoku );

            assert.deepStrictEqual(
              emptySudoku.getCell(
                1,
                0
              ).possible,
              new Set( [ '1' ] )
            );
          }
        );

        it(
          'should not modify any cells if no cell has a unique possible number.',
          () => {
            const unmodifiedSudoku = new Sudoku();

            // Two cells can have a "1"
            const possibles = [
              [ '2', '3', '5', '7', '9' ],
              [ '3', '5', '6', '8' ],
              [ '1', '3', '4' ],
              [ '1', '4', '2' ],
              [ '3', '4', '6', '7', '9' ],
              [ '2', '4', '5', '6', '9' ],
              [ '4', '5', '8', '9' ],
              [ '2', '5', '7', '9' ],
              [ '2', '6', '8', '9' ],
            ];

            const block1 = emptySudoku.getBlock( 0 );
            const block2 = unmodifiedSudoku.getBlock( 0 );

            for ( const [ index, possible ] of possibles.entries() ) {
              block1[ index ].possible = new Set( possible );
              block2[ index ].possible = new Set( possible );
            }

            findUniquePossiblesByBlock( emptySudoku );

            assert.deepStrictEqual(
              getComparableCells( emptySudoku ),
              getComparableCells( unmodifiedSudoku )
            );
          }
        );
      }
    );

    describe(
      'findUniquePossiblesByCol()',
      () => {
        it(
          'should find the only cell that can have "8".',
          () => {
            const possibles = [
              [ '1', '5', '7', '9' ],
              [ '2', '4', '6' ],
              [ '2', '3', '5', '7' ],
              [ '1', '2', '3', '4' ],
              [ '5', '6', '7', '9' ],
              [ '3', '6', '8' ], // Only cell that can have "8"
              [ '5', '9' ],
              [ '1', '3', '7' ],
              [ '4', '5', '9' ],
            ];

            const col = emptySudoku.getCol( 5 );

            for ( const [ index, possible ] of possibles.entries() ) {
              col[ index ].possible = new Set( possible );
            }

            findUniquePossiblesByCol( emptySudoku );

            assert.deepStrictEqual(
              emptySudoku.getCell(
                5,
                5
              ).possible,
              new Set( [ '8' ] )
            );
          }
        );

        it(
          'should not modify any cells if no cell has a unique possible number.',
          () => {
            const unmodifiedSudoku = new Sudoku();

            // Two cells can have "8"
            const possibles = [
              [ '1', '5', '7', '9' ],
              [ '2', '4', '6' ],
              [ '2', '3', '5', '7' ],
              [ '1', '2', '3', '4' ],
              [ '5', '6', '7', '9' ],
              [ '3', '6', '8' ],
              [ '5', '9' ],
              [ '1', '3', '8', '7' ],
              [ '4', '5', '9' ],
            ];

            const col1 = emptySudoku.getCol( 5 );
            const col2 = unmodifiedSudoku.getCol( 5 );

            for ( const [ index, possible ] of possibles.entries() ) {
              col1[ index ].possible = new Set( possible );
              col2[ index ].possible = new Set( possible );
            }

            findUniquePossiblesByCol( emptySudoku );

            assert.deepStrictEqual(
              getComparableCells( emptySudoku ),
              getComparableCells( unmodifiedSudoku )
            );
          }
        );
      }
    );

    describe(
      'findUniquePossiblesByRow()',
      () => {
        it(
          'should find the only cell that can have "2".',
          () => {
            const possibles = [
              [ '5', '7', '8' ],
              [ '2', '4', '9' ], // Only cell that can have "2"
              [ '1', '3', '8' ],
              [ '6', '7', '8', '9' ],
              [ '1', '5', '7' ],
              [ '6', '8' ],
              [ '1', '3', '9' ],
              [ '3', '7', '9' ],
              [ '4', '6', '7' ],
            ];

            const col = emptySudoku.getRow( 8 );

            for ( const [ index, possible ] of possibles.entries() ) {
              col[ index ].possible = new Set( possible );
            }

            findUniquePossiblesByRow( emptySudoku );

            assert.deepStrictEqual(
              emptySudoku.getCell(
                8,
                1
              ).possible,
              new Set( [ '2' ] )
            );
          }
        );

        it(
          'should not modify any cells if no cell has a unique possible number.',
          () => {
            const unmodifiedSudoku = new Sudoku();

            // Two cells can have "2"
            const possibles = [
              [ '5', '7', '8' ],
              [ '2', '4', '9' ],
              [ '1', '3', '8' ],
              [ '6', '7', '8', '9' ],
              [ '1', '5', '7' ],
              [ '6', '8' ],
              [ '2', '3', '9' ],
              [ '3', '7', '9' ],
              [ '4', '6', '7' ],
            ];

            const col1 = emptySudoku.getRow( 8 );
            const col2 = unmodifiedSudoku.getRow( 8 );

            for ( const [ index, possible ] of possibles.entries() ) {
              col1[ index ].possible = new Set( possible );
              col2[ index ].possible = new Set( possible );
            }

            findUniquePossiblesByRow( emptySudoku );

            assert.deepStrictEqual(
              getComparableCells( emptySudoku ),
              getComparableCells( unmodifiedSudoku )
            );
          }
        );
      }
    );
  }
);
