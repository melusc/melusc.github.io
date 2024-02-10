/* eslint-disable no-await-in-loop */

import {cp, mkdir, readdir} from 'node:fs/promises';
import {exit} from 'node:process';

// Urls like /truth-table already work because .html is optional
// I would like a trailing slash to also be allowed, e.g. /truth-table/
// * This solves that issue by copying *.html to */index.html
// Removing the original file would probably work (I haven't tested it),
// but this is safer anyway

const buildDirectoryPath = new URL('../build/', import.meta.url);

for (const file of await readdir(buildDirectoryPath, {
	withFileTypes: true,
})) {
	if (!file.isFile() || !file.name.endsWith('.html')) {
		continue;
	}

	const name = file.name.slice(0, -5 /* '.html'.length */);
	const newDirectoryPath = new URL(`${name}/`, buildDirectoryPath);

	try {
		await mkdir(newDirectoryPath);
	} catch {
		console.error('Directory build/%s already exists', name);
		exit(1);
	}

	await cp(
		new URL(file.name, buildDirectoryPath),
		new URL('index.html', newDirectoryPath),
	);
}
