import words from './wordlist/words.json';

const groupedWordsByLength = new Map<number, string[]>();

for (const word of words) {
	if (!groupedWordsByLength.has(word.length)) {
		groupedWordsByLength.set(word.length, []);
	}

	groupedWordsByLength.get(word.length)!.push(word);
}

export {groupedWordsByLength};
