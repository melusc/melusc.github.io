import { assert } from 'chai';

import { Sudoku } from '../../../src/sudoku/sudoku';
import { nakedPairs } from '../../../src/sudoku/plugins/naked-pairs';

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

            assert.isTrue( nakedPairs( emptySudoku ) );

            assert.deepStrictEqual(
              [ ...emptySudoku.getCell(
                2,
                0
              ).possible ],
              [ '7', '8' ]
            );
          }
        );

        it(
          'should not change anything upon finding ("1", "2", "5") across two cells',
          () => {
            const possibles = [
              [ '1', '2', '5' ], // #1
              [ '6', '7', '8' ],
              [ '1', '4', '6' ],
              [ '1', '2', '5' ], // #2
              [ '1', '2', '5', '6' ],
              [ '4', '5', '9' ],
              [ '1', '5', '7', '8' ],
              [ '3', '5', '7' ],
              [ '1', '4', '8' ],
            ];

            const row = emptySudoku.getRow( 3 );

            for ( let index = 0; index < 9; ++index ) {
              row[ index ].possible = new Set( possibles[ index ] );
            }

            assert.isFalse( nakedPairs( emptySudoku ) );

            for ( let index = 0; index < 9; ++index ) {
              assert.deepStrictEqual(
                [ ...row[ index ].possible ],
                possibles[ index ]
              );
            }
          }
        );
      }
    );
  }
);
