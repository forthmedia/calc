var path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
      filename: 'bundle.js'
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