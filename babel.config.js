/*
  globals
  module: false
*/

module.exports = {
  plugins: [
    '@babel/plugin-syntax-class-properties',
    'babel-plugin-htm',
    [ '@babel/plugin-transform-react-jsx', {
      pragma: 'h',
      pragmaFrag: 'Fragment',
    } ],
  ],
  /* generatorOpts: {
    minified: true,
  }, */
};
