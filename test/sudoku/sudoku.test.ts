// eslint-disable-next-line no-global-assign, @typescript-eslint/no-var-requires
require = require( 'esm' )( module );

import { assert } from 'chai';

import {
  Sudoku,
  Cell,
  validCellIndex
} from '../../src/sudoku/sudoku';

import type { SudokuInterface } from '../../src/sudoku/index';

describe(
  'sudoku.js',
  () => {
    describe(
      'Cell',
      () => {
        let emptyCell = new Cell();

        beforeEach( () => {
          emptyCell = new Cell();
        } );

        it(
          'Cell should be a function',
          () => {
            assert.isFunction( Cell );
          }
        );

        it(
          'Cell should return an object',
          () => {
            assert.isObject( new Cell() );
          }
        );

        it(
          'Cell should return the correct object',
          () => {
            const result = new Cell();

            assert.isUndefined( result.content );

            assert.deepStrictEqual(
              result.possible,
              new Set( [ '1', '2', '3', '4', '5', '6', '7', '8', '9' ] )
            );
          }
        );

        describe(
          '#setContent()',
          () => {
            it(
              '"1" should mutate #content and #possible',
              () => {
                const originalContent = emptyCell.content;
                const originalPossibleSize = emptyCell.possible.size;

                emptyCell.setContent( '1' );

                assert.notStrictEqual(
                  originalContent,
                  emptyCell.content
                );
                assert.notStrictEqual(
                  originalPossibleSize,
                  emptyCell.possible.size
                );

                assert.strictEqual(
                  emptyCell.content,
                  '1'
                );
                assert.strictEqual(
                  emptyCell.possible.size,
                  0
                );
              }
            );
          }
        );

        describe(
          '#setValidity()',
          () => {
            it(
              'setting the content to "0" should set #valid to false',
              () => {
                assert.isFalse( emptyCell.setContent( '0' ).valid );
              }
            );

            it(
              'setting the content to "1" should set #valid to true',
              () => {
                assert.isTrue( emptyCell.setContent( '1' ).valid );
              }
            );
          }
        );

        describe(
          '#clear()',
          () => {
            it(
              'should properly clear a previously non-empty, invalid cell',
              () => {
                emptyCell.setContent( 'https://bit.ly/3u6XnPl' ).clear();

                assert.isUndefined( emptyCell.content );

                assert.strictEqual(
                  emptyCell.possible.size,
                  9
                );
                assert.isTrue( emptyCell.valid );
              }
            );

            it(
              'should properly clear a previously non-empty, valid cell',
              () => {
                emptyCell.setContent( '1' ).clear();

                assert.isUndefined( emptyCell.content );

                assert.strictEqual(
                  emptyCell.possible.size,
                  9
                );
                assert.isTrue( emptyCell.valid );
              }
            );
          }
        );
      }
    );

    describe(
      'Sudoku',
      () => {
        it(
          'should be a class',
          () => {
            assert.isFunction( Sudoku );

            assert.instanceOf(
              new Sudoku(),
              Sudoku
            );
          }
        );

        let emptySudoku = new Sudoku();

        beforeEach( () => {
          emptySudoku = new Sudoku();
        } );

        describe(
          '#setContent()',
          () => {
            it(
              'should mutate the correct cell',
              () => {
                emptySudoku.setContent(
                  0,
                  0,
                  '4'
                );

                assert.strictEqual(
                  emptySudoku.getContent(
                    0,
                    0
                  ),
                  '4'
                );
              }
            );
          }
        );

        describe(
          '#getContent()',
          () => {
            it(
              '8, 8 should return undefined',
              () => {
                assert.isUndefined( emptySudoku.getContent(
                  8,
                  8
                ) );
              }
            );

            it(
              '8, 8 should return 4 after setting that cell to 4',
              () => {
                assert.strictEqual(
                  emptySudoku.setContent(
                    8,
                    8,
                    '4'
                  ).getContent(
                    8,
                    8
                  ),
                  '4'
                );
              }
            );
          }
        );

        describe(
          '#getCells',
          () => {
            it(
              'should return the unmodified cells',
              () => {
                const cells = emptySudoku.getCells();

                assert.lengthOf(
                  cells,
                  9
                );

                for ( const row of cells ) {
                  assert.isObject( row );

                  assert.isString( row.key );

                  assert.lengthOf(
                    row.content,
                    9
                  );

                  for ( const cell of row.content ) {
                    assert.isUndefined( cell.content );

                    assert.isString( cell.key );
                  }
                }
              }
            );

            it(
              'should return the modified cells',
              () => {
                const cells = emptySudoku
                  .setContent(
                    0,
                    0,
                    '2'
                  )
                  .setContent(
                    1,
                    1,
                    '4'
                  )
                  .setContent(
                    5,
                    7,
                    '2'
                  )
                  .getCells();

                assert.strictEqual(
                  cells[ 0 ].content[ 0 ].content,
                  '2'
                );
                assert.strictEqual(
                  cells[ 1 ].content[ 1 ].content,
                  '4'
                );
                assert.strictEqual(
                  cells[ 5 ].content[ 7 ].content,
                  '2'
                );
              }
            );
          }
        );

        describe(
          '#clearCell()',
          () => {
            it(
              'should clear a previously non-empty cell',
              () => {
                assert.isUndefined( emptySudoku.setContent(
                  6,
                  6,
                  '4'
                ).clearCell(
                  6,
                  6
                )
                  .getContent(
                    6,
                    6
                  ) );
              }
            );
          }
        );

        describe(
          '#clearAllCells()',
          () => {
            it(
              'should clear a non-empty sudoku',
              () => {
                emptySudoku.setContent(
                  6,
                  6,
                  '4'
                ).setContent(
                  1,
                  1,
                  '5'
                )
                  .setContent(
                    2,
                    4,
                    '3'
                  );

                assert.strictEqual(
                  emptySudoku.getContent(
                    6,
                    6
                  ),
                  '4'
                );
                assert.strictEqual(
                  emptySudoku.getContent(
                    1,
                    1
                  ),
                  '5'
                );
                assert.strictEqual(
                  emptySudoku.getContent(
                    2,
                    4
                  ),
                  '3'
                );

                emptySudoku.clearAllCells();

                assert.isUndefined( emptySudoku.getContent(
                  6,
                  6
                ) );
                assert.isUndefined( emptySudoku.getContent(
                  1,
                  1
                ) );
                assert.isUndefined( emptySudoku.getContent(
                  2,
                  4
                ) );
              }
            );
          }
        );

        describe(
          '#subscribe()',
          () => {
            it(
              'the subscribed function should be dispatched on updates',
              () => {
                let hasDispatched = false;

                const callback = ( sudoku: SudokuInterface ) => {
                  const cells = sudoku.getCells();

                  assert.strictEqual(
                    cells[ 3 ].content[ 2 ].content,
                    '2'
                  );
                  assert.strictEqual(
                    cells[ 4 ].content[ 1 ].content,
                    '4'
                  );
                  hasDispatched = true;
                };

                emptySudoku.setContent(
                  3,
                  2,
                  '2'
                );
                assert.isFalse( hasDispatched );

                emptySudoku.subscribe( callback );

                emptySudoku.setContent(
                  4,
                  1,
                  '4'
                );
                assert.isTrue( hasDispatched );
              }
            );
          }
        );

        describe(
          '#unsubscribe()',
          () => {
            it(
              'the subscribed function should be dispatched on updates but not after unsubscribing',
              () => {
                let hasDispatched = false;

                const callback = ( sudoku: SudokuInterface ) => {
                  const cells = sudoku.getCells();

                  assert.strictEqual(
                    cells[ 3 ].content[ 2 ].content,
                    '2'
                  );
                  assert.strictEqual(
                    cells[ 4 ].content[ 1 ].content,
                    '4'
                  );
                  hasDispatched = true;
                };

                emptySudoku.setContent(
                  3,
                  2,
                  '2'
                );
                assert.isFalse( hasDispatched );

                emptySudoku.subscribe( callback );

                emptySudoku.setContent(
                  4,
                  1,
                  '4'
                );
                assert.isTrue( hasDispatched );

                emptySudoku.unsubscribe( callback );
                hasDispatched = false;

                emptySudoku.setContent(
                  1,
                  7,
                  '2'
                );
                assert.isFalse( hasDispatched );
              }
            );
          }
        );

        describe(
          '#setValidity()',
          () => {
            it(
              'should return true on an empty sudoku',
              () => {
                assert.isTrue( emptySudoku.setValidity() );
              }
            );

            it(
              'should return false when setting an invalid cell',
              () => {
                assert.isFalse( emptySudoku.setContent(
                  0,
                  2,
                  'Hello there'
                ).setValidity() );
              }
            );

            it(
              'should return true when overwriting an invalid cell',
              () => {
                assert.isTrue( emptySudoku
                  .setContent(
                    0,
                    2,
                    'A'
                  )
                  .setContent(
                    0,
                    2,
                    '2'
                  )
                  .setValidity() );
              }
            );

            it(
              'a row with duplicates should return false',
              () => {
                assert.isFalse( emptySudoku.setContent(
                  0,
                  2,
                  '3'
                ).setContent(
                  0,
                  3,
                  '3'
                )
                  .setValidity() );
              }
            );

            it(
              'a row with duplicates should return true after fixing them',
              () => {
                assert.isTrue( emptySudoku
                  .setContent(
                    0,
                    2,
                    '3'
                  )
                  .setContent(
                    0,
                    3,
                    '3'
                  )
                  .clearCell(
                    0,
                    3
                  )
                  .setValidity() );

                assert.isTrue( emptySudoku
                  .setContent(
                    0,
                    2,
                    '3'
                  )
                  .setContent(
                    0,
                    3,
                    '3'
                  )
                  .setContent(
                    0,
                    3,
                    '4'
                  )
                  .setValidity() );
              }
            );
          }
        );

        describe(
          '#getBlock()',
          () => {
            it(
              'should return a array of length 9',
              () => {
                const result = emptySudoku.getBlock( 0 );

                assert.isArray( result );
                assert.lengthOf(
                  result,
                  9
                );
              }
            );

            it(
              'should return the correct cells',
              () => {
                for ( let row = 0; row < 3; ++row ) {
                  for ( let col = 0; col < 3; ++col ) {
                    emptySudoku.setContent(
                      row,
                      col,
                      `${ ( row * 3 ) + col + 1 }`
                    );
                  }
                }

                const result = emptySudoku.getBlock( 0 );

                for ( let index = 0; index < 9; ++index ) {
                  assert.strictEqual(
                    result[ index ].content,
                    `${ index + 1 }`
                  );
                }
              }
            );
          }
        );
      }
    );

    describe(
      'validCellIndex',
      () => {
        it(
          '-1 should throw',
          () => {
            assert.throws(
              () => {
                validCellIndex(
                  -1,
                  '-1'
                );
              },
              '-1 ∉ [0, 8].'
            );
          }
        );

        it(
          '9 should throw',
          () => {
            assert.throws(
              () => {
                validCellIndex(
                  9,
                  '9'
                );
              },
              '9 ∉ [0, 8].'
            );
          }
        );

        it(
          '5.5 should throw',
          () => {
            assert.throws(
              () => {
                validCellIndex(
                  5.5,
                  '5.5'
                );
              },
              '5.5 was not an integer.'
            );
          }
        );

        it(
          '4 should not throw',
          () => {
            assert.doesNotThrow( () => {
              validCellIndex(
                4,
                '4'
              );
            } );

            assert.isTrue( validCellIndex(
              4,
              '4'
            ) );
          }
        );
      }
    );
  }
);
