const process = require('node:process');

const {src, dest, watch, parallel, series} = require('gulp');
const csso = require('gulp-csso');
const svgmin = require('gulp-svgmin');
const sass = require('gulp-dart-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const lazypipe = require('lazypipe');
const jsonminify = require('gulp-jsonminify');

const PATHS = {
	DEST: './docs',
	FAVICONS: [
		'./src/**/favicon.min.svg',
		'./src/**/favicon.ico',
		'./src/**/favicon.png',
	],
	HTML: ['./src/**/*.html'],
	JS: ['./src/**/*.js'],
	SCSS: ['./src/**/*.scss'],
	JSON: ['./src/**/*.json'],
	SOURCEMAPS_DEST: './',
	SVG: ['./src/**/*.svg', '!./src/**/*.min.svg'],
	SVG_DEST: './src',
};

const setEnv = env => done => {
	process.env.GULP_ENV = env;

	done();
};

const postCSSTask = lazypipe().pipe(csso).pipe(postcss, [autoprefixer()]);

const compSCSS = () =>
	src(PATHS.SCSS)
		.pipe(sourcemaps.init())

		.pipe(sass())
		.pipe(gulpif(process.env.GULP_ENV === 'production', postCSSTask()))
		.pipe(sourcemaps.write(PATHS.SOURCEMAPS_DEST))
		.pipe(dest(PATHS.DEST));

const minSvg = () => {
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

	return src(PATHS.FAVICONS)
		.pipe(
			rename(path => {
				if (path.basename.endsWith('.min')) {
					path.basename = path.basename.slice(0, -4);
				}
			}),
		)
		.pipe(dest(PATHS.DEST));
};

const minJson = () => src(PATHS.JSON).pipe(jsonminify()).pipe(dest(PATHS.DEST));

const build = series(setEnv('production'), parallel(minSvg, compSCSS, minJson));

const watchFunction = () => {
	watch(PATHS.SCSS, compSCSS);
	watch(PATHS.SVG, minSvg);
	watch(PATHS.JSON, minJson);
};

const start = series(build, setEnv('development'), watchFunction);

exports.default = build;
exports.build = build;
exports.minSvg = minSvg;
exports.compSCSS = compSCSS;
exports.start = start;
