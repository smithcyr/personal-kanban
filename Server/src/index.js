require('babel-core/register');
require('babel-polyfill');
require('babel-register')({
  presets: ['es2015', 'stage-0'],
});

const start = require('./server').default;
start(4000);
