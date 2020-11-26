const webpack = require('webpack');

module.exports = {
    entry: "./js/Index",
    output: {
        filename: "./bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    // Чтобы в каждом файле import не писать
    plugins: [
        // process.env.NODE_ENV === 'production' ? ["transform-remove-console"] : []


        // new webpack.ProvidePlugin({
            // React: 'react',
            // ReactDOM: 'react-dom'
            // $: 'jquery',
            // jQuery: 'jquery'
        // })
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    }
};