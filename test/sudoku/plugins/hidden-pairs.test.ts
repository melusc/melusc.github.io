import { assert } from 'chai';

import { Sudoku } from '../../../src/sudoku/sudoku';
import { hiddenPairs } from '../../../src/sudoku/plugins/hidden-pairs';

import type { SudokuInterface } from '../../../src/sudoku/sudoku.d';

type ComparableCell = {
  possible: Set<string>;
  content: string | undefined;
};

const getComparableCells = ( sudoku: SudokuInterface ): Array<ComparableCell> => sudoku
  .getCells()
  .map( cell => ( { content: cell.content, possible: cell.possible } ) );

describe(
  'hidden-pairs.ts',
  () => {
    let emptySudoku = new Sudoku();

    beforeEach( () => {
      emptySudoku = new Sudoku();
    } );

    describe(
      'hiddenPairs()',
      () => {
        it(
          'should find the hidden pairs ("3", "4", "9").',
          () => {
            const possibles: Array<Array<string>> = [
              [ '3', '4', '6', '8', '9' ], // #1
              [ '1', '5', '7', '8' ],
              [ '1', '2', '5', '7' ],
              [ '1', '3', '4', '5', '7', '8', '9' ], // #2
              [ '5', '7', '8' ],
              [ '2', '3', '4', '5', '6', '9' ], // #3
              [ '1', '6', '7', '8' ],
              [ '1', '6', '7', '8' ],
              [ '2', '5', '6', '8' ],
            ];

            for ( const [ index, possible ] of possibles.entries() ) {
              emptySudoku.getCell( 4 * 9 + index ).possible = new Set( possible );
            }

            hiddenPairs( emptySudoku );

            const wantedSet = [ '3', '4', '9' ];

            assert.deepStrictEqual(
              [ ...emptySudoku.getCell( 4 * 9 ).possible ],
              wantedSet
            );

            assert.deepStrictEqual(
              [ ...emptySudoku.getCell( 4 * 9 + 3 ).possible ],
              wantedSet
            );

            assert.deepStrictEqual(
              [ ...emptySudoku.getCell( 4 * 9 + 5 ).possible ],
              wantedSet
            );
          }
        );

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

            hiddenPairs( emptySudoku );

            assert.deepStrictEqual(
              emptySudoku.getCell( 1 * 9 ).possible,
              new Set( [ '1' ] )
            );
          }
        );

        it(
          "should not modify any cells if there aren't any hidden pairs.",
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

            hiddenPairs( emptySudoku );

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
