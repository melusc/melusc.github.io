const _ = undefined;

export const sudokuEasy = [
	[5, _, 3, _, 9, 4],
	[_, 9, _, _, 3, 6, 2, 5, 8],
	[_, _, _, _, _, _, 3],
	[_, _, 8, 9, 5, _, 6, 7],
	[],
	[_, 7, 2, _, 6, 1, 4],
	[_, _, 4],
	[6, 5, 9, 8, 2, _, _, 1],
	[_, _, _, 1, 4, _, 5, _, 6],
] as const;

export const sudokuEvil = [
	[6, _, 4, _, _, _, _, _, 3],
	[_, _, _, _, 3, 7, 8],
	[_, _, _, 5, _, _, 7],
	[8, 9, _, 1],
	[3, _, _, _, _, _, _, _, 2],
	[_, _, _, _, _, 3, _, 1, 9],
	[_, _, 5, _, _, 9],
	[_, _, 1, 8, 6],
	[9, _, _, _, _, _, 4, _, 8],
] as const;

export const sudokuExpert = [
	[_, _, _, _, _, 4, _, _, 2],
	[_, 6, _, 2, _, _, _, 3],
	[_, 8, _, _, _, 3, 5, _, 9],
	[_, 4, _, _, _, _, 1],
	[1, _, _, 7, _, 5],
	[5, _, 3],
	[_, 9, _, 3],
	[_, _, 4, _, 6, 1],
	[_, _, 5, _, _, _, 7],
] as const;

export const sudokuInvalid1 = [
	// Here both 5 and 6 would have to be in the middle/middle cell
	// which is not possible, since only one number can be in each cell
	[],
	[_, _, _, 6],
	[_, _, _, 5],
	[_, _, _, _, _, _, 5, 6],
	[],
	[_, 6, 5],
	[_, _, _, _, _, 5],
	[_, _, _, _, _, 6],
] as const;

export const sudokuInvalid2 = [
	// Here 1,2,3 have to be in the third column of the middle/middle block
	// And 4,5,6 have to be in the first row of the middle/middle block
	// Since those two overlap this is an invalid sudoku
	[_, _, _, _, 1],
	[_, _, _, _, 2],
	[_, _, _, _, 3],
	[],
	[4, 5, 6],
	[_, _, _, _, _, _, 4, 5, 6],
	[_, _, _, 1],
	[_, _, _, 2],
	[_, _, _, 3],
] as const;
