import {svelte} from '@sveltejs/vite-plugin-svelte';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import svgr from 'vite-plugin-svgr';
import macrosPlugin from 'vite-plugin-babel-macros';

import glob from 'fast-glob';

const entryPoints = await glob('**/*.html', {
	cwd: 'src',
});

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte({
			configFile: '../svelte.config.js',
		}),
		react(),
		svgr(),
		macrosPlugin(),
	],
	root: 'src',
	build: {
		outDir: '../dist/www',
		emptyOutDir: true,
		rollupOptions: {
			input: Object.fromEntries(entryPoints.map(path => [path, `src/${path}`])),
		},
	},
});
