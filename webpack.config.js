const path = require("path")

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "psgc.min.js",
        // library: "PSGC",
        library: {
            name: 'PSGC',
            type: 'umd',
            export: 'default',
        },
        globalObject: 'this',
        publicPath: 'https://cdn.jsdelivr.net/npm/@ageesea/psgc-js@1.x.x/dist/',
        chunkFilename: 'chunk-[id].js',
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    },
    mode: "production",
}