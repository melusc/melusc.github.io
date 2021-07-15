import {assert} from 'chai';
import {bitCount, bitIndex} from '../../../src/sudoku/plugins/shared';

describe('plugins/shared.ts', () => {
	describe('bitCount()', () => {
		it('8 should return 1.', () => {
			assert.strictEqual(bitCount(8), 1);
		});

		it('7 should return 3.', () => {
			assert.strictEqual(bitCount(7), 3);
		});
	});

	describe('bitIndex()', () => {
		it('2 should return 1.', () => {
			assert.strictEqual(bitIndex(2), 1);
		});

		it('3 should throw', () => {
			assert.throws(() => {
				bitIndex(3);
			});
		});
	});
});
