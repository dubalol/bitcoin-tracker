const path = require('path');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'), // publicPath below supersedes this path when making a bundle held in memory
    filename: 'bundle.js', // file name also represents a part of the address to the bundle held in memory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        // css-loader converts css file to parsable string
        // style-loader loads into style tag in HTML
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    // publicPath represents a part of the address to the bundle held in memory
    publicPath: '/build/',
    proxy: {
      // EVERY request that starts with 'KEY' gets routed to 3000, can be just '/' as well
      '/api': 'http://localhost:3000',
    },
  },
  mode: process.env.NODE_ENV,
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 1024000,
  },
};
