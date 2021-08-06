const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const entry = require('webpack-glob-entry');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = environment => ({
	devtool: 'source-map',
	resolve: {
		alias: {
			react: 'preact/compat',
			'react-dom': 'preact/compat',
			lodash: 'lodash-es',
		},
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	mode: environment.production ? 'production' : 'development',
	entry: entry(
		entry.basePath('src'),
		path.resolve(__dirname, 'src/*/script.{js,ts}*(x)'),
	),
	plugins: [
		new CopyPlugin({patterns: [{from: 'public', to: '.'}]}),
		...(environment.production ? [new CleanWebpackPlugin()] : []),
	],
	output: {
		path: path.resolve(__dirname, 'docs'),
		filename: '[name].js',
	},
	cache: {
		type: 'filesystem',
		cacheDirectory: path.resolve(__dirname, '.cache'),
		buildDependencies: {
			config: [__filename],
		},
	},
	optimization: {
		usedExports: true,
		minimize: environment.production === true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: {
						keep_fargs: false,
						global_defs: {
							DEBUG: false,
						},
						passes: 3,
					},
					mangle: true,
					ecma: 2021,
				},
			}),
		],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							plugins: [
								'@babel/plugin-transform-runtime',
								[
									'@babel/plugin-transform-react-jsx',
									{
										pragma: 'h',
										pragmaFrag: 'Fragment',
									},
								],
							],
						},
					},
				],
			},
			{
				test: /\.tsx?$/,
				use: ['ts-loader'],
			},
		],
	},
});
