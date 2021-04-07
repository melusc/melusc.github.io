// eslint-disable-next-line no-global-assign, @typescript-eslint/no-var-requires
require = require( 'esm' )( module );

import { assert } from 'chai';

import { Sudoku } from '../../src/sudoku/sudoku';
import type { SudokuInterface } from '../../src/sudoku';

import {
  removeDuplicatesByBlock,
  removeDuplicatesByCol,
  removeDuplicatesByRow
} from '../../src/sudoku/plugins/remove-duplicates';

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
  'remove-duplicates.ts',
  () => {
    describe(
      'removeDuplicatesByBlock()',
      () => {
        it(
          'should solve [[1, 2, 3], [4, 5, 6], [_, 8, 9] correctly.',
          () => {
            const sudoku = new Sudoku( [
              [ 1, 2, 3 ],
              [ 4, 5, 6 ],
              [ _, 8, 9 ],
            ] );

            removeDuplicatesByBlock( sudoku );

            const cell = sudoku.getCell(
              2,
              0
            );

            assert.strictEqual(
              cell.possible.size,
              1
            );

            assert.strictEqual(
              cell.possible.values().next().value,
              '7'
            );
          }
        );

        it(
          'should nearly solve [[1, 2, 3], [_, _, 6], [7, 8, 9]].',
          () => {
            const sudoku = new Sudoku( [
              [ 1, 2, 3 ],
              [ _, _, 6 ],
              [ 7, 8, 9 ],
            ] );

            removeDuplicatesByBlock( sudoku );

            const cell1 = sudoku.getCell(
              1,
              0
            );
            const cell2 = sudoku.getCell(
              1,
              1
            );

            assert.deepStrictEqual(
              cell1.possible,
              new Set( [ '4', '5' ] )
            );

            assert.deepStrictEqual(
              cell2.possible,
              new Set( [ '4', '5' ] )
            );
          }
        );

        it(
          'should not change an empty sudoku.',
          () => {
            const originalSudoku = new Sudoku();
            const modifiedSudoku = new Sudoku();

            const anyChanged = removeDuplicatesByBlock( modifiedSudoku );
            assert.isFalse( anyChanged );

            assert.deepStrictEqual(
              getComparableCells( modifiedSudoku ),
              getComparableCells( originalSudoku )
            );
          }
        );
      }
    );

    describe(
      'removeDuplicatesByCol()',
      () => {
        it(
          'should solve [_, 2, 5, 3, 8, 9, 4, 7, 6] correctly.',
          () => {
            const sudoku = new Sudoku( [ _, 2, 5, 3, 8, 9, 4, 7, 6 ].map( item => [ item ] ) );

            removeDuplicatesByCol( sudoku );

            const cell = sudoku.getCell(
              0,
              0
            );

            assert.strictEqual(
              cell.possible.size,
              1
            );

            assert.strictEqual(
              cell.possible.values().next().value,
              '1'
            );
          }
        );

        it(
          'should nearly solve [_, 5, 4, 3, 2, 7, 1, 8, _].',
          () => {
            const sudoku = new Sudoku( [ _, 5, 4, 3, 2, 7, 1, 8, _ ].map( item => [ item ] ) );

            removeDuplicatesByCol( sudoku );

            const cell1 = sudoku.getCell(
              0,
              0
            );
            const cell2 = sudoku.getCell(
              8,
              0
            );

            assert.deepStrictEqual(
              cell1.possible,
              new Set( [ '6', '9' ] )
            );

            assert.deepStrictEqual(
              cell2.possible,
              new Set( [ '6', '9' ] )
            );
          }
        );

        it(
          'should not change an empty sudoku.',
          () => {
            const originalSudoku = new Sudoku();
            const modifiedSudoku = new Sudoku();

            const anyChanged = removeDuplicatesByCol( modifiedSudoku );
            assert.isFalse( anyChanged );

            assert.deepStrictEqual(
              getComparableCells( modifiedSudoku ),
              getComparableCells( originalSudoku )
            );
          }
        );
      }
    );

    describe(
      'removeDuplicatesByRow()',
      () => {
        it(
          'should solve [1, 2, 3, _, 5, 6, 7, 8, 9] correctly.',
          () => {
            const sudoku = new Sudoku( [ [ 1, 2, 3, _, 5, 6, 7, 8, 9 ] ] );

            removeDuplicatesByRow( sudoku );

            const cell = sudoku.getCell(
              0,
              3
            );

            assert.strictEqual(
              cell.possible.size,
              1
            );

            assert.deepStrictEqual(
              cell.possible,
              new Set( [ '4' ] )
            );
          }
        );

        it(
          'should nearly solve [5, 7, 8, 1, 2, _, 3, _, 6].',
          () => {
            const sudoku = new Sudoku( [ [ 5, 7, 8, 1, 2, _, 3, _, 6 ] ] );

            removeDuplicatesByRow( sudoku );

            const cell1 = sudoku.getCell(
              0,
              5
            );
            const cell2 = sudoku.getCell(
              0,
              7
            );

            assert.deepStrictEqual(
              cell1.possible,
              new Set( [ '4', '9' ] )
            );

            assert.deepStrictEqual(
              cell2.possible,
              new Set( [ '4', '9' ] )
            );
          }
        );
      }
    );
  }
);
