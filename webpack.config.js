const path = require("path")
const pjson = require('./package.json');
// TODO remove this config if done migrating to vite
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
        publicPath: 'https://cdn.jsdelivr.net/npm/@ageesea/psgc-js@' + pjson.version + '/dist/',
        chunkFilename: 'chunk-[id]-[contenthash].js',
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