/**
 * WebPack Config
 */

var path = require("path");
var webpack = require("webpack");
var fs = require('fs');

module.exports = {
    entry: './src/popup.ts',
    //devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    node: {
        fs: 'empty',
        console: true,
        net: 'empty',
        tls: 'empty'
    },
    output: {
        library: 'POPUP',
        path: path.resolve(__dirname, 'dest'),
        filename: "popupjs.js"
    },
    target: 'node',
    optimization: {
        //minify settings
        minimize: true,
    },
    // change the mod to production : when export : to dev : development
    mode: "production",
    //live compile
    watch: true
};