import {svelte} from '@sveltejs/vite-plugin-svelte';
import {defineConfig} from 'vite';
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
	],
	root: 'src',
	build: {
		outDir: '../dist',
		emptyOutDir: true,
		rollupOptions: {
			input: Object.fromEntries(entryPoints.map(path => [path, `src/${path}`])),
		},
	},
});
