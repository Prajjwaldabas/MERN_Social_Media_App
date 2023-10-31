const path = require('path');

module.exports = {
  entry: './src/index.js', // The entry point of your application
  output: {
    filename: 'bundle.js', // The name of the output bundle
    path: path.resolve(__dirname, 'dist'), // The output directory
  },
  // Other configuration options...
  resolve: {
    fallback: {
      "path": false,
      "http": false, // Disable http polyfill
    }
  },
};
