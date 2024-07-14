import {readdir, writeFile} from 'node:fs/promises';

const buildDirectoryPath = new URL('../build/', import.meta.url);

const sitemapLines = [
	'<?xml version="1.0" encoding="UTF-8"?>',
	'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
];

for (const file of await readdir(buildDirectoryPath, {
	withFileTypes: true,
})) {
	if (!file.isFile() || !file.name.endsWith('.html')) {
		continue;
	}

	const name = file.name.replace(/\.html$/, '');
	const url = new URL(`${name === 'index' ? '' : name}`, 'https://lusc.ch');

	sitemapLines.push(
		'\t<url>',
		`\t\t<loc>${url.href}</loc>`,
		'\t\t<changefreq>monthly</changefreq>',
		'\t</url>',
	);
}

sitemapLines.push('</urlset>');

await writeFile(
	new URL('../build/sitemap.xml', import.meta.url),
	sitemapLines.join('\n'),
);
