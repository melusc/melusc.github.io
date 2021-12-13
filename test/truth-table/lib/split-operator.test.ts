import test from 'ava';

import {splitOperators} from '../../../src/truth-table/lib/split-operators';
import {
	CharacterTypes,
	fromString,
} from '../../../src/truth-table/lib/string-with-indices';

const doSplit = (input: string) => splitOperators(fromString(input));

const t1 = 'a && !!!b';
test(t1, t => {
	t.deepEqual(doSplit(t1), [
		{
			characters: 'a',
			type: CharacterTypes.variable,
			from: 0,
			to: 1,
		},
		{
			characters: ' ',
			type: CharacterTypes.space,
			from: 1,
			to: 2,
		},
		{
			characters: '&&',
			type: CharacterTypes.operator,
			originalCharacters: '&&',
			from: 2,
			to: 4,
		},
		{
			characters: ' ',
			type: CharacterTypes.space,
			from: 4,
			to: 5,
		},
		{
			characters: '!',
			type: CharacterTypes.operator,
			originalCharacters: '!',
			from: 5,
			to: 6,
		},
		{
			characters: '!',
			type: CharacterTypes.operator,
			originalCharacters: '!',
			from: 6,
			to: 7,
		},
		{
			characters: '!',
			type: CharacterTypes.operator,
			originalCharacters: '!',
			from: 7,
			to: 8,
		},
		{
			characters: 'b',
			type: CharacterTypes.variable,
			from: 8,
			to: 9,
		},
	]);
});

const t2 = 'a && !!==b';
test(t2, t => {
	t.deepEqual(doSplit(t2), [
		{
			characters: 'a',
			type: CharacterTypes.variable,
			from: 0,
			to: 1,
		},
		{
			characters: ' ',
			type: CharacterTypes.space,
			from: 1,
			to: 2,
		},
		{
			characters: '&&',
			type: CharacterTypes.operator,
			originalCharacters: '&&',
			from: 2,
			to: 4,
		},
		{
			characters: ' ',
			type: CharacterTypes.space,
			from: 4,
			to: 5,
		},
		{
			characters: '!',
			type: CharacterTypes.operator,
			originalCharacters: '!',
			from: 5,
			to: 6,
		},
		{
			characters: '!==',
			type: CharacterTypes.operator,
			originalCharacters: '!==',
			from: 6,
			to: 9,
		},
		{
			characters: 'b',
			type: CharacterTypes.variable,
			from: 9,
			to: 10,
		},
	]);
});

const t3 = 'a && !!==!==b';
test(t3, t => {
	t.deepEqual(doSplit(t3), [
		{
			characters: 'a',
			type: CharacterTypes.variable,
			from: 0,
			to: 1,
		},
		{
			characters: ' ',
			type: CharacterTypes.space,
			from: 1,
			to: 2,
		},
		{
			characters: '&&',
			type: CharacterTypes.operator,
			originalCharacters: '&&',
			from: 2,
			to: 4,
		},
		{
			characters: ' ',
			type: CharacterTypes.space,
			from: 4,
			to: 5,
		},
		{
			characters: '!',
			type: CharacterTypes.operator,
			originalCharacters: '!',
			from: 5,
			to: 6,
		},
		{
			characters: '!==!==',
			type: CharacterTypes.operator,
			originalCharacters: '!==!==',
			from: 6,
			to: 12,
		},
		{
			characters: 'b',
			type: CharacterTypes.variable,
			from: 12,
			to: 13,
		},
	]);
});
