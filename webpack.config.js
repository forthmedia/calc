const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist'
    },
    module: {
      rules:[
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, 'src')
    }  
};