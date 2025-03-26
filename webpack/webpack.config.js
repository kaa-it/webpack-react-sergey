const path = require('path');
const HTMLWebpackPlugins = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
        entry: path.resolve(__dirname, './src/index.ts'),
        output: {
                path: path.resolve(__dirname, './dist'),
                filename: 'main.js',
                clean: true,
        },

        module: {
                rules: [
                        //подключение других лоадеров
                        {
                                test: /\.(sa|sc|c)ss$/,
                                use: [
                                        MiniCssExtractPlugin.loader,
                                        //'style-loader',
                                        {
                                                loader: 'css-loader',
                                                options: {
                                                       modules: {
                                                                mode: 'local',
                                                                localIdentName: '[name]__[local]__[hash:base64:5]',
                                                                auto: /\.module\.\w+$/i,
                                                                namedExport: false,
                                                       },
                                                        importLoaders: 2, //Значение 2 говорит о том, что некоторые трансформации PostCSS нужно применить до css-loader.
                                               },
                                       },
                                        'postcss-loader',
                                        {
                                                loader: 'sass-loader',
                                                options: {
                                                        sourceMap: true,
                                                },
                                        },
                                ],
                        },
                ],
        },
        resolve: {
                extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
        },

        plugins: [
                new HTMLWebpackPlugins({
                        template: path.resolve(__dirname, 'public/index.html'),
                }),
                new MiniCssExtractPlugin({
                        filename: 'static/styles/index.css',
                }),
        ],
};