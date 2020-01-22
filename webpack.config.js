const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'), // publicPath below supersedes this path when making a bundle held in memory
    filename: 'bundle.js', // file name also represents a part of the address to the bundle held in memory
  },
  devServer: {
    // publicPath represents a part of the address to the bundle held in memory
    publicPath: '/build/',
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  mode: process.env.NODE_ENV,
};
