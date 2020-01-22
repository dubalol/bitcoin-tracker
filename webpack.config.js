const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devServer: {
    publicPath: '/build/',
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  mode: process.env.NODE_ENV,
};
