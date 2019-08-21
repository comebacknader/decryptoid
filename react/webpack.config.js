const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['babel-polyfill','./react/App.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
       rules: [
           {test: /\.(js)$/, use: ['babel-loader']},
           {test: /\.css$/, use: ['style-loader', 'css-loader']},
           {test: /\.(png|jpg|jpeg)$/, use: ['url-loader']}
       ] 
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin(
            { template: './react/home.html'}
        )
    ]  
}

