import fs from 'node:fs/promises';
import https from 'node:https';
import {Buffer} from 'node:buffer';
import path from 'node:path';

const filenames = ['jargon', 'science-terms', 'wordlist'];

const get = async (url: URL): Promise<string> =>
	new Promise((resolve, reject) => {
		console.log('Fetching', url.href);

		https
			.get(url, response => {
				const result: Buffer[] = [];

				response
					.on('data', chunk => {
						result.push(chunk);
					})
					.on('end', () => {
						resolve(Buffer.concat(result).toString());
					})
					.on('error', reject);
			})
			.on('error', reject);
	});

const base
	= 'https://bitbucket.org/jvdl/correcthorsebatterystaple/raw/master/data/';

void (async (): Promise<void> => {
	const words = new Set<string>();

	for (const filename of filenames) {
		const url = new URL(`./${filename}.txt`, base);

		// eslint-disable-next-line no-await-in-loop
		const rawWords = await get(url);

		const splitWords = rawWords.split(',');

		for (const word of splitWords) {
			const sanitized = word.trim().toLowerCase();

			if (/^[a-z]{4,10}$/i.test(sanitized)) {
				words.add(sanitized);
			}
		}
	}

	const collator = new Intl.Collator('en-US');
	const sortedWords = [...words].sort(collator.compare);

	// This runs in #/dist/scripts/get-lingo-words.js
	const fileUrl = path.resolve(
		// eslint-disable-next-line unicorn/prefer-module
		__dirname,
		'../../src/lingo/wordlist/words.json',
	);
	await fs.writeFile(fileUrl, JSON.stringify(sortedWords));
})();
