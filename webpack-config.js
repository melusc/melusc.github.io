// webpack-config.js because xo seems to import it by accident

const path = require( 'path' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const entry = require( 'webpack-glob-entry' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

const babelConfig = {
  loader: 'babel-loader',
  options: {
    plugins: [
      '@babel/plugin-proposal-class-properties',
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
};

module.exports = environment => ( {
  devtool: 'source-map',
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  mode: environment.production
    ? 'production'
    : 'development',
  entry: {
    ...entry(
      entry.basePath( 'src' ),
      path.resolve(
        __dirname,
        'src/**/*.js'
      )
    ),
  },
  plugins: environment.production
    ? [ new CleanWebpackPlugin() ]
    : [],
  output: {
    path: path.resolve(
      __dirname,
      'docs',
      'webpack'
    ),
    filename: '[name].js',
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(
      __dirname,
      '.cache'
    ),
    buildDependencies: {
      config: [ __filename ],
    },
  },
  optimization: {
    usedExports: true,
    minimize: environment.production === true,
    minimizer: [
      new TerserPlugin( {
        terserOptions: {
          compress: {
            drop_console: true,
            keep_fargs: false,
            global_defs: {
              DEBUG: false,
            },
            passes: 3,
            pure_funcs: [ '__webpack_require__' ],
          },
          ecma: 2020,
        },
      } ),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [ path.resolve(
          __dirname,
          'src'
        ) ],
        exclude: /node_modules/,
        use: [ babelConfig ],
      },
      {
        test: /\.scss$/,
        type: 'asset/source',
        use: [ 'csso-loader', 'sass-loader' ],
      },
      {
        test: /\.css$/,
        type: 'asset/source',
        use: [ 'csso-loader' ],
      },
    ],
  },
} );
