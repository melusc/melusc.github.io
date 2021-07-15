import {assert} from 'chai';
import {Cell} from '../../src/sudoku/cell';

describe('cell.ts', () => {
	describe('Cell', () => {
		let emptyCell = new Cell();

		beforeEach(() => {
			emptyCell = new Cell();
		});

		it('Cell should be a function.', () => {
			assert.isFunction(Cell);
		});

		it('Cell should return an object.', () => {
			assert.isObject(new Cell());
		});

		it('Cell should return the correct object.', () => {
			const result = new Cell();

			assert.isUndefined(result.content);

			assert.deepStrictEqual(
				result.possible,
				new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9']),
			);
		});

		describe('#setContent()', () => {
			it('"1" should mutate #content and #possible.', () => {
				const originalContent = emptyCell.content;
				const originalPossibleSize = emptyCell.possible.size;

				emptyCell.setContent('1');

				assert.notStrictEqual(originalContent, emptyCell.content);
				assert.notStrictEqual(originalPossibleSize, emptyCell.possible.size);

				assert.strictEqual(emptyCell.content, '1');
				assert.strictEqual(emptyCell.possible.size, 0);
			});
		});

		describe('#setValidity()', () => {
			it('setting the content to "0" should set #valid to false.', () => {
				assert.isFalse(emptyCell.setContent('0').valid);
			});

			it('setting the content to "1" should set #valid to true.', () => {
				assert.isTrue(emptyCell.setContent('1').valid);
			});
		});

		describe('#clear()', () => {
			it('should properly clear a previously non-empty, invalid cell.', () => {
				emptyCell.setContent('https://bit.ly/3u6XnPl').clear();

				assert.isUndefined(emptyCell.content);

				assert.strictEqual(emptyCell.possible.size, 9);
				assert.isTrue(emptyCell.valid);
			});

			it('should properly clear a previously non-empty, valid cell.', () => {
				emptyCell.setContent('1').clear();

				assert.isUndefined(emptyCell.content);

				assert.strictEqual(emptyCell.possible.size, 9);
				assert.isTrue(emptyCell.valid);
			});
		});
	});
});
