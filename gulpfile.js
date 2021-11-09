const {src, dest, watch, series} = require('gulp');
const svgmin = require('gulp-svgmin');
const rename = require('gulp-rename');

const PATHS = {
	DEST: './docs',
	SVG: ['./src/**/*.svg', '!./src/**/*.min.svg'],
	SVG_DEST: './src',
};

const minSvg = () =>
	src(PATHS.SVG)
		.pipe(
			svgmin({
				multipass: true,
				plugins: [
					'sortAttrs',
					'removeScriptElement',
					'removeDimensions',
					{name: 'removeAttrs', params: {attrs: ['class']}},
					{name: 'mergePaths', active: false},
				],
				precision: 3,
			}),
		)
		.pipe(
			rename(path => {
				path.extname = '.min.svg';
			}),
		)
		.pipe(dest(PATHS.SVG_DEST));

const build = minSvg;

const watchFunction = () => {
	watch(PATHS.SVG, minSvg);
};

const start = series(minSvg, watchFunction);

exports.default = minSvg;
exports.build = build;
exports.minSvg = minSvg;
exports.start = start;
