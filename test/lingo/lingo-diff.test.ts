import test from 'ava';

import {
	LingoCorrectness,
	LingoDiff,
	lingoDiff,
} from '../../src/lingo/lingo-diff';

const makeTest = (
	input: string,
	solution: string,
	expected: Array<Omit<LingoDiff, 'key'>>,
): void => {
	test(`lingoDiff(${JSON.stringify(input)}, ${JSON.stringify(
		solution,
	)})`, t => {
		const actual = lingoDiff(input, solution);

		t.is(actual.length, expected.length);
		for (const [i, element] of actual.entries()) {
			t.like(element, expected[i]!);
		}
	});
};

makeTest('abc', 'abc', [
	{correctness: LingoCorrectness.correctLocation, character: 'a'},
	{correctness: LingoCorrectness.correctLocation, character: 'b'},
	{correctness: LingoCorrectness.correctLocation, character: 'c'},
]);

makeTest('abc', 'abd', [
	{correctness: LingoCorrectness.correctLocation, character: 'a'},
	{correctness: LingoCorrectness.correctLocation, character: 'b'},
	{correctness: LingoCorrectness.nonExistant, character: 'c'},
]);

makeTest('abc', 'acb', [
	{correctness: LingoCorrectness.correctLocation, character: 'a'},
	{correctness: LingoCorrectness.wrongLocation, character: 'b'},
	{correctness: LingoCorrectness.wrongLocation, character: 'c'},
]);

makeTest('dcba', 'abcd', [
	{correctness: LingoCorrectness.wrongLocation, character: 'd'},
	{correctness: LingoCorrectness.wrongLocation, character: 'c'},
	{correctness: LingoCorrectness.wrongLocation, character: 'b'},
	{correctness: LingoCorrectness.wrongLocation, character: 'a'},
]);

makeTest('play', 'poly', [
	{correctness: LingoCorrectness.correctLocation, character: 'p'},
	{correctness: LingoCorrectness.wrongLocation, character: 'l'},
	{correctness: LingoCorrectness.nonExistant, character: 'a'},
	{correctness: LingoCorrectness.correctLocation, character: 'y'},
]);

makeTest('abab', 'aabb', [
	{correctness: LingoCorrectness.correctLocation, character: 'a'},
	{correctness: LingoCorrectness.wrongLocation, character: 'b'},
	{correctness: LingoCorrectness.wrongLocation, character: 'a'},
	{correctness: LingoCorrectness.correctLocation, character: 'b'},
]);

makeTest('aaa', 'abb', [
	{correctness: LingoCorrectness.correctLocation, character: 'a'},
	{correctness: LingoCorrectness.nonExistant, character: 'a'},
	{correctness: LingoCorrectness.nonExistant, character: 'a'},
]);

makeTest('aaa', 'bab', [
	{correctness: LingoCorrectness.nonExistant, character: 'a'},
	{correctness: LingoCorrectness.correctLocation, character: 'a'},
	{correctness: LingoCorrectness.nonExistant, character: 'a'},
]);

makeTest('', 'abc', [
	{correctness: LingoCorrectness.nonExistant, character: ''},
	{correctness: LingoCorrectness.nonExistant, character: ''},
	{correctness: LingoCorrectness.nonExistant, character: ''},
]);
