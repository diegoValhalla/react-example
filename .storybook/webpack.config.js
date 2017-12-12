const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  node: {
    __dirname: true, // to enable dirname of the input file
  },
  module: {
    rules: [ // storybook does not accept 'loaders' keyword
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // emits the required/imported object as file and returns its public URL
        test: /\.(eot|ttf|woff|svg|otf|gif|png|jpe?g)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
    ],
  },
};
