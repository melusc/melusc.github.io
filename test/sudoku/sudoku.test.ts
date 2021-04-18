import { assert } from 'chai';

import { Sudoku, Cell, validCellIndex } from '../../src/sudoku/sudoku';

import type { SudokuInterface } from '../../src/sudoku/index';

describe(
  'sudoku.ts',
  () => {
    describe(
      'Cell',
      () => {
        let emptyCell = new Cell();

        beforeEach( () => {
          emptyCell = new Cell();
        } );

        it(
          'Cell should be a function.',
          () => {
            assert.isFunction( Cell );
          }
        );

        it(
          'Cell should return an object.',
          () => {
            assert.isObject( new Cell() );
          }
        );

        it(
          'Cell should return the correct object.',
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
              '"1" should mutate #content and #possible.',
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
              'setting the content to "0" should set #valid to false.',
              () => {
                assert.isFalse( emptyCell.setContent( '0' ).valid );
              }
            );

            it(
              'setting the content to "1" should set #valid to true.',
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
              'should properly clear a previously non-empty, invalid cell.',
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
              'should properly clear a previously non-empty, valid cell.',
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
          'should be a class.',
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
              'should mutate the correct cell.',
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
              '8, 8 should return undefined.',
              () => {
                assert.isUndefined( emptySudoku.getContent(
                  8,
                  8
                ) );
              }
            );

            it(
              '8, 8 should return 4 after setting that cell to 4.',
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
          '#clearCell()',
          () => {
            it(
              'should clear a previously non-empty cell.',
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
              'should clear a non-empty sudoku.',
              () => {
                emptySudoku
                  .setContent(
                    6,
                    6,
                    '4'
                  )
                  .setContent(
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
          '#getCol()',
          () => {
            it(
              'should return the correct column and content.',
              () => {
                emptySudoku.setContent(
                  2,
                  8,
                  '2'
                ).setContent(
                  5,
                  8,
                  '4'
                );

                const col = emptySudoku.getCol( 8 );

                assert.deepStrictEqual(
                  col.map( cell => cell.content ),
                  [
                    undefined,
                    undefined,
                    '2',
                    undefined,
                    undefined,
                    '4',
                    undefined,
                    undefined,
                    undefined,
                  ]
                );
              }
            );
          }
        );

        describe(
          '#getRow()',
          () => {
            it(
              'should return the correct row and content.',
              () => {
                emptySudoku
                  .setContent(
                    8,
                    8,
                    '3'
                  )
                  .setContent(
                    8,
                    2,
                    '4'
                  )
                  .setContent(
                    8,
                    7,
                    '7'
                  );

                const row = emptySudoku.getRow( 8 );

                assert.deepStrictEqual(
                  row.map( cell => cell.content ),
                  [
                    undefined,
                    undefined,
                    '4',
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    '7',
                    '3',
                  ]
                );
              }
            );
          }
        );

        describe(
          '#getCell',
          () => {
            it(
              'should return the correct cell at (0, 0).',
              () => {
                assert.deepStrictEqual(
                  emptySudoku.getCell(
                    0,
                    0
                  ),
                  emptySudoku.getBlock( 0 )[ 0 ]
                );
              }
            );

            it(
              'should return the correct cell at (4, 6).',
              () => {
                assert.deepStrictEqual(
                  emptySudoku.getCell(
                    4,
                    6
                  ),
                  emptySudoku._cells[ 4 ].content[ 6 ] // This is what it does, but there's not a lot to test here anyway.
                );
              }
            );
          }
        );

        describe(
          '#getCells',
          () => {
            it(
              'should return the unmodified cells.',
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
              'should return the modified cells.',
              () => {
                const sudoku = emptySudoku
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
                  );

                assert.strictEqual(
                  sudoku.getCell(
                    0,
                    0
                  ).content,
                  '2'
                );
                assert.strictEqual(
                  sudoku.getCell(
                    1,
                    1
                  ).content,
                  '4'
                );
                assert.strictEqual(
                  sudoku.getCell(
                    5,
                    7
                  ).content,
                  '2'
                );
              }
            );
          }
        );

        describe(
          '#getBlock()',
          () => {
            it(
              'should return a array of length 9.',
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
              'should return the correct cells.',
              () => {
                for ( let row = 0; row < 3; ++row ) {
                  for ( let col = 0; col < 3; ++col ) {
                    // Because prettier keeps on removing brackets and eslint complains about mixed operations
                    const number = row * 3;
                    emptySudoku.setContent(
                      row,
                      col,
                      `${ number + col + 1 }`
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

        describe(
          '#solve()',
          () => {
            it(
              'should correctly solve an easy sudoku.',
              () => {
                const _ = undefined;
                const sudoku = new Sudoku( [
                  [ _, 1, _, 3, 8, _, _, 5, 2 ],
                  [ _, 6, 5, _, _, _, _, 8, 9 ],
                  [ _, _, _, 5, _, 9 ],
                  [ _, _, _, 4, 1, _, 8 ],
                  [ 2, 3, _, _, _, _, _, 4, 6 ],
                  [ _, _, 8, _, 3, 7 ],
                  [ _, _, _, 1, _, 8 ],
                  [ 6, 5, _, _, _, _, 2, 3 ],
                  [ 7, 8, _, _, 5, 3, _, 1 ],
                ] );

                sudoku.solve();

                assert.deepStrictEqual(
                  sudoku.getCells().map( row => row.content.map( cell => cell.content ) ),
                  [
                    [ '9', '1', '4', '3', '8', '6', '7', '5', '2' ],
                    [ '3', '6', '5', '7', '2', '1', '4', '8', '9' ],
                    [ '8', '7', '2', '5', '4', '9', '3', '6', '1' ],
                    [ '5', '9', '6', '4', '1', '2', '8', '7', '3' ],
                    [ '2', '3', '7', '8', '9', '5', '1', '4', '6' ],
                    [ '1', '4', '8', '6', '3', '7', '9', '2', '5' ],
                    [ '4', '2', '3', '1', '6', '8', '5', '9', '7' ],
                    [ '6', '5', '1', '9', '7', '4', '2', '3', '8' ],
                    [ '7', '8', '9', '2', '5', '3', '6', '1', '4' ],
                  ]
                );

                assert.isTrue( sudoku.isSolved() );
              }
            );

            it(
              'should correctly solve an evil sudoku.',
              () => {
                const _ = undefined;

                const sudoku = new Sudoku( [
                  [ 6, _, 4, _, _, _, _, _, 3 ],
                  [ _, _, _, _, 3, 7, 8 ],
                  [ _, _, _, 5, _, _, 7 ],
                  [ 8, 9, _, 1 ],
                  [ 3, _, _, _, _, _, _, _, 2 ],
                  [ _, _, _, _, _, 3, _, 1, 9 ],
                  [ _, _, 5, _, _, 9 ],
                  [ _, _, 1, 8, 6 ],
                  [ 9, _, _, _, _, _, 4, _, 8 ],
                ] );

                sudoku.solve();

                assert.deepStrictEqual(
                  sudoku.getCells().map( row => row.content.map( cell => cell.content ) ),
                  [
                    [ '6', '7', '4', '9', '2', '8', '1', '5', '3' ],
                    [ '1', '5', '9', '6', '3', '7', '8', '2', '4' ],
                    [ '2', '3', '8', '5', '4', '1', '7', '9', '6' ],
                    [ '8', '9', '6', '1', '5', '2', '3', '4', '7' ],
                    [ '3', '1', '7', '4', '9', '6', '5', '8', '2' ],
                    [ '5', '4', '2', '7', '8', '3', '6', '1', '9' ],
                    [ '4', '8', '5', '3', '7', '9', '2', '6', '1' ],
                    [ '7', '2', '1', '8', '6', '4', '9', '3', '5' ],
                    [ '9', '6', '3', '2', '1', '5', '4', '7', '8' ],
                  ]
                );
              }
            );

            it(
              'should correctly solve an expert sudoku.',
              () => {
                const _ = undefined;

                const sudoku = new Sudoku( [
                  [ _, _, _, _, _, 4, _, _, 2 ],
                  [ _, 6, _, 2, _, _, _, 3 ],
                  [ _, 8, _, _, _, 3, 5, _, 9 ],
                  [ _, 4, _, _, _, _, 1 ],
                  [ 1, _, _, 7, _, 5 ],
                  [ 5, _, 3 ],
                  [ _, 9, _, 3 ],
                  [ _, _, 4, _, 6, 1 ],
                  [ _, _, 5, _, _, _, 7 ],
                ] );

                sudoku.solve();

                assert.deepStrictEqual(
                  sudoku.getCells().map( row => row.content.map( cell => cell.content ) ),
                  [
                    [ '3', '5', '1', '9', '8', '4', '6', '7', '2' ],
                    [ '4', '6', '9', '2', '5', '7', '8', '3', '1' ],
                    [ '2', '8', '7', '6', '1', '3', '5', '4', '9' ],
                    [ '9', '4', '6', '8', '3', '2', '1', '5', '7' ],
                    [ '1', '2', '8', '7', '4', '5', '3', '9', '6' ],
                    [ '5', '7', '3', '1', '9', '6', '2', '8', '4' ],
                    [ '6', '9', '2', '3', '7', '8', '4', '1', '5' ],
                    [ '7', '3', '4', '5', '6', '1', '9', '2', '8' ],
                    [ '8', '1', '5', '4', '2', '9', '7', '6', '3' ],
                  ]
                );
              }
            );
          }
        );

        describe(
          '#subscribe()',
          () => {
            it(
              'the subscribed function should be dispatched on updates.',
              () => {
                let hasDispatched = false;

                const callback = ( sudoku: SudokuInterface ) => {
                  assert.strictEqual(
                    sudoku.getCell(
                      3,
                      2
                    ).content,
                    '2'
                  );
                  assert.strictEqual(
                    sudoku.getCell(
                      4,
                      1
                    ).content,
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
              'the subscribed function should be dispatched on updates but not after unsubscribing.',
              () => {
                let hasDispatched = false;

                const callback = ( sudoku: SudokuInterface ) => {
                  assert.strictEqual(
                    sudoku.getCell(
                      3,
                      2
                    ).content,
                    '2'
                  );
                  assert.strictEqual(
                    sudoku.getCell(
                      4,
                      1
                    ).content,
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
          '#updateCellValidities()',
          () => {
            it(
              'should return true on an empty sudoku.',
              () => {
                assert.isTrue( emptySudoku.updateCellValidities() );
              }
            );

            it(
              'should return false when setting an invalid cell.',
              () => {
                assert.isFalse( emptySudoku.setContent(
                  0,
                  2,
                  'Hello there'
                ).updateCellValidities() );
              }
            );

            it(
              'should return true when overwriting an invalid cell.',
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
                  .updateCellValidities() );
              }
            );

            it(
              'a row with duplicates should return false.',
              () => {
                assert.isFalse( emptySudoku
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
                  .updateCellValidities() );
              }
            );

            it(
              'a row with duplicates should return true after fixing them.',
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
                  .updateCellValidities() );

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
                  .updateCellValidities() );
              }
            );
          }
        );

        describe(
          '#isSolved()',
          () => {
            it(
              'should return false when the sudoku is empty.',
              () => {
                assert.isFalse( emptySudoku.isSolved() );
              }
            );

            it(
              'should return false when the sudoku is partially empty.',
              () => {
                emptySudoku.setContent(
                  0,
                  3,
                  '2'
                ).setContent(
                  2,
                  4,
                  '4'
                );

                assert.isFalse( emptySudoku.isSolved() );
              }
            );

            it(
              'should return false when the sudoku has an immediate, obvious mistake even if filled entirely.',
              () => {
                const sudoku = new Sudoku( Array.from(
                  { length: 9 },
                  () => Array.from(
                    { length: 9 },
                    () => 2
                  )
                ) );

                assert.isFalse( sudoku.isSolved() );
              }
            );
          }
        );

        describe(
          '#entries',
          () => {
            it(
              'should return all cells in the right order',
              () => {
                const firstRow: Array<number> = Array.from(
                  { length: 9 },
                  (
                    _v, index
                  ) => index + 1
                );

                const sudoku = new Sudoku( [ firstRow ] );

                const entries = [ ...sudoku.entries() ];

                assert.deepStrictEqual(
                  entries.map( cell => cell.content ).slice(
                    0,
                    9
                  ),
                  firstRow.map( content => String( content ) )
                );
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
          '-1 should throw.',
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
          '9 should throw.',
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
          '5.5 should throw.',
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
          '4 should not throw.',
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
