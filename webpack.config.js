const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    mode: "development",

    devtool: "eval-source-map",

    entry: "./src/index.js",

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },

    devServer: {
        static: "./dist",
        open: true,
        watchFiles: ["./src/index.html"],
    },


    module: {

        rules: [
            {

                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],    
    
    },

    plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
            }),
        ],
};